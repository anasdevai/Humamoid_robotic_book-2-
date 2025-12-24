#!/bin/bash

echo "========================================"
echo "RAG Backend - Embedding Setup Script"
echo "========================================"
echo ""

echo "[1/4] Checking Qdrant connection..."
if ! curl -s http://localhost:6333/collections > /dev/null 2>&1; then
    echo "[ERROR] Qdrant is not running!"
    echo ""
    echo "Please start Qdrant first:"
    echo "  docker run -d -p 6333:6333 qdrant/qdrant"
    echo ""
    echo "Or if you have Qdrant installed locally:"
    echo "  qdrant"
    echo ""
    exit 1
fi
echo "[OK] Qdrant is running at http://localhost:6333"
echo ""

echo "[2/4] Checking environment variables..."
if [ ! -f "../.env" ]; then
    echo "[ERROR] .env file not found!"
    exit 1
fi
echo "[OK] .env file found"
echo ""

echo "[3/4] Installing dependencies..."
uv sync
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install dependencies"
    exit 1
fi
echo "[OK] Dependencies installed"
echo ""

echo "[4/4] Starting embedding process..."
echo "This will embed all documentation from ai-book/build/"
echo "This may take several minutes depending on the amount of content."
echo ""
read -p "Press Enter to continue..."

echo ""
echo "Running embedding..."
uv run python main.py

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "[SUCCESS] Embedding completed!"
    echo "========================================"
    echo ""
    echo "Next steps:"
    echo "1. Test retrieval: uv run python retrieving.py"
    echo "2. Start API server: uv run python api.py"
    echo ""
else
    echo ""
    echo "========================================"
    echo "[ERROR] Embedding failed!"
    echo "========================================"
    echo "Please check the error messages above."
    echo ""
fi
