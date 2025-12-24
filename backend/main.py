import os
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from typing import List, Dict, Any
import cohere
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.models import PointStruct
import logging
from urllib.parse import urljoin, urlparse
import time
import uuid
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables - try parent directory first (local), then fallback (Vercel)
env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()  # Will use Vercel env vars or local .env

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DocusaurusEmbeddingPipeline:
    def __init__(self):
        # Initialize Cohere
        cohere_api_key = os.getenv("COHERE_API_KEY")
        if not cohere_api_key:
            raise ValueError("COHERE_API_KEY not found in environment variables")
        self.cohere_client = cohere.Client(cohere_api_key)

        # Initialize Qdrant client
        qdrant_url = os.getenv("QDRANT_URL")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")

        if qdrant_api_key:
            self.qdrant_client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
        else:
            self.qdrant_client = QdrantClient(url=qdrant_url)

        # Target URL for the Docusaurus site
        self.target_url = "https://humamoid-robotic-book-2-eyem-c8ket75kc.vercel.app/"
        # Updated collection name for Cohere embeddings
        self.collection_name = "rag_embedding_cohere"

    def get_all_urls(self, source: str) -> List[str]:
        """
        Extract all content sources.
        If source is a local directory, return list of file paths.
        If source is a URL, crawl it (legacy/fallback).
        """
        urls = []
        
        # Check if source is a local directory
        if os.path.exists(source) and os.path.isdir(source):
            logger.info(f"Scanning local directory: {source}")
            for root, dirs, files in os.walk(source):
                for file in files:
                    if file.endswith(".html"):
                        urls.append(os.path.join(root, file))
            return urls

        # Otherwise treat as web URL (legacy code)
        try:
            base_url = source
            # Try to get URLs from sitemap first
            sitemap_url = urljoin(base_url, "sitemap.xml")
            response = requests.get(sitemap_url)

            if response.status_code == 200:
                root = ET.fromstring(response.content)

                # Handle both sitemap index and regular sitemap
                if root.tag.endswith('sitemapindex'):
                    # If it's a sitemap index, get individual sitemaps
                    for sitemap in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                        sitemap_response = requests.get(sitemap.text)
                        if sitemap_response.status_code == 200:
                            sitemap_root = ET.fromstring(sitemap_response.content)
                            for url_elem in sitemap_root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                                urls.append(url_elem.text)
                else:
                    # Regular sitemap
                    for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                        urls.append(url_elem.text)
            else:
                # Fallback: try to crawl the site by looking for links
                # logger.info(f"Sitemap not found at {sitemap_url}, attempting to crawl...")
                pass # Skip crawling for now as it was problematic

        except Exception as e:
            logger.error(f"Error getting URLs from {source}: {e}")

        return urls

    def extract_text_from_url(self, source: str) -> str:
        """
        Extract and clean text from a single source (URL or file path)
        """
        try:
            content_html = ""
            
            # Check if source is a local file
            if os.path.exists(source) and os.path.isfile(source):
                with open(source, 'r', encoding='utf-8') as f:
                    content_html = f.read()
            else:
                # Assume URL
                response = requests.get(source)
                response.raise_for_status()
                content_html = response.content

            soup = BeautifulSoup(content_html, 'html.parser')

            # Remove script and style elements
            for script in soup(["script", "style", "nav", "footer"]):
                script.decompose()

            # Look for main content containers typically used in Docusaurus
            content_selectors = [
                'article',  # Main article content
                '.markdown',  # Docusaurus markdown content
                '.theme-doc-markdown',  # Docusaurus theme markdown
                '.main-wrapper',  # Main content wrapper
                'main',  # Main content area
            ]

            content = ""
            for selector in content_selectors:
                elements = soup.select(selector)
                if elements:
                    for element in elements:
                        # Get text but try to preserve some structure
                        text = element.get_text(separator=' ', strip=True)
                        if len(text) > len(content):
                            content = text
                    break

            # If no specific content found, try body but exclude nav/footer (already removed above)
            if not content:
                body = soup.find('body')
                if body:
                    content = body.get_text(separator=' ', strip=True)

            # Clean up the text
            lines = (line.strip() for line in content.splitlines())
            chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
            content = ' '.join(chunk for chunk in chunks if chunk)

            return content

        except Exception as e:
            logger.error(f"Error extracting text from {source}: {e}")
            return ""

    def chunk_text(self, text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
        """
        Split text into chunks with overlap to preserve context
        """
        if len(text) <= chunk_size:
            return [text]

        chunks = []
        start = 0

        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)

            # Move start position by chunk_size - overlap
            start = end - overlap

            # If remaining text is less than chunk_size, add it as final chunk
            if len(text) - start < chunk_size:
                if start < len(text):
                    final_chunk = text[start:]
                    if final_chunk not in chunks:  # Avoid duplicate chunks
                        chunks.append(final_chunk)
                break

        return chunks

    def embed(self, text: str) -> List[float]:
        """
        Generate embedding for text using Cohere
        """
        try:
            response = self.cohere_client.embed(
                texts=[text],
                model="embed-english-v3.0",
                input_type="search_document"
            )
            return response.embeddings[0]
        except Exception as e:
            logger.error(f"Error generating embedding for text: {e}")
            return []

    def create_collection(self):
        """
        Create a Qdrant collection for storing embeddings
        """
        try:
            # Check if collection already exists
            collections = self.qdrant_client.get_collections()
            collection_names = [col.name for col in collections.collections]

            if self.collection_name in collection_names:
                logger.info(f"Collection {self.collection_name} already exists")
                return

            # Create collection with appropriate vector size (1024 for Cohere embed-english-v3.0)
            self.qdrant_client.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(size=1024, distance=models.Distance.COSINE)
            )

            logger.info(f"Created collection {self.collection_name} with 1024-dimension vectors")

        except Exception as e:
            logger.error(f"Error creating collection {self.collection_name}: {e}")
            raise

    def save_chunk_to_qdrant(self, content: str, url: str, embedding: List[float], position: int):
        """
        Save a text chunk with its embedding to Qdrant
        """
        try:
            # Generate a unique ID for the point
            point_id = str(uuid.uuid4())

            # Prepare the payload with metadata
            payload = {
                "content": content,
                "url": url,
                "position": position,
                "created_at": time.time()
            }

            # Create and upload the point to Qdrant
            points = [PointStruct(
                id=point_id,
                vector=embedding,
                payload=payload
            )]

            self.qdrant_client.upsert(
                collection_name=self.collection_name,
                points=points
            )

            logger.info(f"Saved chunk to Qdrant: {url} (position {position})")
            return True

        except Exception as e:
            logger.error(f"Error saving chunk to Qdrant: {e}")
            return False

def main():
    """
    Main function to execute the complete pipeline
    """
    logger.info("Starting Docusaurus Embedding Pipeline with Cohere...")

    # Initialize the pipeline
    pipeline = DocusaurusEmbeddingPipeline()

    try:
        # Step 1: Create the Qdrant collection
        logger.info("Creating Qdrant collection...")
        pipeline.create_collection()

        # Step 2: Get all sources
        # Try local build directory first
        local_build_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../ai-book/build"))
        
        target_source = pipeline.target_url
        if os.path.exists(local_build_path):
             logger.info(f"Found local build at {local_build_path}. Using local files.")
             target_source = local_build_path
        else:
             logger.info(f"Local build not found. Using remote URL: {target_source}")

        logger.info(f"Extracting content from {target_source}...")
        urls = pipeline.get_all_urls(target_source)

        if not urls:
            logger.warning(f"No content found at {target_source}")
            return

        logger.info(f"Found {len(urls)} items to process")

        # Step 3: Process each item
        total_chunks = 0
        for i, url in enumerate(urls):
            logger.info(f"Processing {i+1}/{len(urls)}: {url}")

            # Extract text
            text_content = pipeline.extract_text_from_url(url)

            if not text_content:
                logger.warning(f"No content extracted from {url}")
                continue

            logger.info(f"Extracted {len(text_content)} characters")

            # Convert file path to virtual URL for metadata if local
            display_url = url
            if target_source == local_build_path:
                # Convert C:\...\ai-book\build\docs\intro\index.html -> https://.../docs/intro/
                rel_path = os.path.relpath(url, local_build_path)
                # Normalize slashes
                rel_path = rel_path.replace("\\", "/")
                display_url = urljoin(pipeline.target_url, rel_path)

            # Chunk the text
            chunks = pipeline.chunk_text(text_content)
            logger.info(f"Created {len(chunks)} chunks")

            # Process each chunk
            for j, chunk in enumerate(chunks):
                if not chunk.strip():
                    continue

                # Generate embedding
                embedding = pipeline.embed(chunk)

                if not embedding:
                    logger.error(f"Failed to generate embedding for chunk {j}")
                    continue

                # Save to Qdrant
                success = pipeline.save_chunk_to_qdrant(
                    content=chunk,
                    url=display_url, # Save the virtual URL, not the file path
                    embedding=embedding,
                    position=j
                )

                if success:
                    total_chunks += 1
                    logger.info(f"Saved chunk {j}")
                    # time.sleep(0.1) # Fast local processing


        logger.info(f"Pipeline completed successfully! Total chunks saved: {total_chunks}")

    except Exception as e:
        logger.error(f"Pipeline failed with error: {e}")
        # raise # Don't crash main thread if possible

if __name__ == "__main__":
    main()
