# Quick Start Guide: RAG Backend with Cohere

## Problem
Qdrant (vector database) is not running, so the embedding process cannot store data.

## Solution

### Step 1: Start Qdrant

**Option A: Using Docker (Recommended)**
```powershell
docker run -d -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

**Option B: Using Docker with persistent storage**
```powershell
docker run -d -p 6333:6333 -p 6334:6334 -v ${PWD}/qdrant_storage:/qdrant/storage qdrant/qdrant
```

**Verify Qdrant is running:**
```powershell
curl http://localhost:6333/collections
```

Or open in browser: http://localhost:6333/dashboard

### Step 2: Run Embedding Process

**Option A: Using the provided script**
```powershell
cd backend
.\run_embedding.bat
```

**Option B: Manual command**
```powershell
cd backend
uv run python main.py
```

### Step 3: Verify Data Was Loaded

```powershell
uv run python retrieving.py
```

This should show retrieved results (not 0 results).

Or check Qdrant dashboard:
- Open: http://localhost:6333/dashboard  
- Look for collection: `rag_embedding_cohere`
- Check point count (should be > 0)

### Step 4: Start API Server (Already Running)

Your API server is already running! Test it:

```powershell
curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" -d "{\"query\": \"What is ROS2?\"}"
```

## Common Issues

### Issue: "Connection refused" when running main.py
**Solution:** Qdrant is not running. Follow Step 1.

### Issue: "GEMINI_API_KEY" error
**Solution:** Add your Gemini API key to `.env` file

### Issue: 0 results from retrieval
**Solution:** Re-run embedding process after Qdrant is running

## Quick Commands

```powershell
# Start Qdrant
docker run -d -p 6333:6333 qdrant/qdrant

# Embed documentation
cd backend
uv run python main.py

# Test retrieval  
uv run python retrieving.py

# Test API
curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" -d "{\"query\": \"What is ROS2?\"}"
```

## What Gets Embedded

The script processes all HTML files in:
```
ai-book/build/
├── docs/
│   ├── getting-started/
│   ├── module-1-ros2/
│   ├── module-2-digital-twin/
│   ├── module-3-isaac/
│   ├── module-4-vla/
│   ├── capstone/
│   └── resources/
└── (other pages)
```

Each page is:
1. Text extracted
2. Chunked into 1000-char pieces (100-char overlap)
3. Embedded with Cohere embed-english-v3.0 (1024-dim)
4. Stored in Qdrant with metadata (URL, position, etc.)
