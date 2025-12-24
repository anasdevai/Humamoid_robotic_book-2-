"""
Test script to verify environment variables are loading correctly
"""
import os
import sys
from pathlib import Path

# Try to load .env from parent directory
from dotenv import load_dotenv

# Get the project root (parent of backend)
backend_dir = Path(__file__).parent
project_root = backend_dir.parent
env_path = project_root / ".env"

print(f"Backend dir: {backend_dir}")
print(f"Project root: {project_root}")
print(f".env path: {env_path}")
print(f".env exists: {env_path.exists()}")

# Load from specific path
load_dotenv(dotenv_path=env_path)

# Check which vars are loaded
print("\nEnvironment variables:")
print(f"COHERE_API_KEY: {'✓ SET' if os.getenv('COHERE_API_KEY') else '✗ NOT SET'}")
print(f"GEMINI_API_KEY: {'✓ SET' if os.getenv('GEMINI_API_KEY') else '✗ NOT SET'}")
print(f"QDRANT_URL: {os.getenv('QDRANT_URL')}")
print(f"QDRANT_API_KEY: {'✓ SET' if os.getenv('QDRANT_API_KEY') else '✗ NOT SET'}")

if os.getenv('COHERE_API_KEY'):
    print("\n✓ Environment loaded successfully!")
else:
    print("\n✗ Failed to load COHERE_API_KEY")
    sys.exit(1)
