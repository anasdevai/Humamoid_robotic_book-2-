import os
import json
import logging
from typing import Dict, List, Any
from dotenv import load_dotenv
import google.generativeai as genai
import time
from retrieving import RAGRetriever

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RAGAgent:
    def __init__(self):
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # Use gemini-2.5-flash for speed/cost, or gemini-2.5-pro for reasoning
        # "gemini-2.5-flash"
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self.retriever = RAGRetriever()
        logger.info("RAG Agent initialized with Google Gemini")

    def retrieve_context(self, query: str) -> Dict:
        """
        Retrieve relevant context
        """
        try:
            json_response = self.retriever.retrieve(query_text=query, top_k=5, threshold=0.3)
            return json.loads(json_response)
        except Exception as e:
            logger.error(f"Error retrieving context: {e}")
            return {"results": []}

    def query_agent(self, query_text: str) -> Dict:
        """
        Process a query through the RAG agent and return structured response
        """
        start_time = time.time()
        logger.info(f"Processing query: '{query_text[:50]}...'")

        try:
            # 1. Retrieve Context
            context_data = self.retrieve_context(query_text)
            results = context_data.get('results', [])
            
            # Format context for prompt
            context_str = ""
            matched_chunks = []
            sources = set()

            for i, res in enumerate(results, 1):
                context_str += f"Source {i}:\n{res.get('content')}\nURL: {res.get('url')}\n\n"
                matched_chunks.append(res)
                if res.get('url'):
                    sources.add(res.get('url'))

            # 2. Construct Prompt
            system_instruction = "You are a helpful assistant for a robotics textbook. Answer the question based ONLY on the provided context. If the answer is not in the context, say so. Cite your sources."
            
            prompt = f"""{system_instruction}

Context:
{context_str}

Question: {query_text}

Answer:"""

            # 3. Generate Response
            response = self.model.generate_content(prompt)
            answer_text = response.text

            query_time_ms = (time.time() - start_time) * 1000

            return {
                "answer": answer_text,
                "sources": list(sources),
                "matched_chunks": matched_chunks,
                "query_time_ms": query_time_ms,
                "confidence": self._calculate_confidence(matched_chunks)
            }

        except Exception as e:
            logger.error(f"Error processing query: {e}")
            return {
                "answer": "Sorry, I encountered an error processing your request.",
                "sources": [],
                "matched_chunks": [],
                "error": str(e),
                "query_time_ms": (time.time() - start_time) * 1000
            }

    def _calculate_confidence(self, matched_chunks: List[Dict]) -> str:
        if not matched_chunks:
            return "low"
        avg_score = sum(chunk.get('similarity_score', 0.0) for chunk in matched_chunks) / len(matched_chunks)
        if avg_score >= 0.7:
            return "high"
        elif avg_score >= 0.4:
            return "medium"
        else:
            return "low"

def main():
    """
    Main function to demonstrate the RAG agent functionality
    """
    logger.info("Initializing RAG Agent...")
    agent = RAGAgent()

    test_queries = [
        "What is ROS2?",
        "Explain humanoid design principles",
    ]

    print("RAG Agent - Testing Queries")
    for i, query in enumerate(test_queries, 1):
        print(f"\nQuery {i}: {query}")
        response = agent.query_agent(query)
        print(f"Answer: {response['answer']}")
        print(f"Sources: {response['sources']}")

if __name__ == "__main__":
    main()
