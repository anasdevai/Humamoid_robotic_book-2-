"""
Quick setup script to check if Gemini API key is set before running embedding
"""
import os
from dotenv import load_dotenv

load_dotenv()

gemini_key = os.getenv("GEMINI_API_KEY")
if not gemini_key or gemini_key == "YOUR_GEMINI_API_KEY_HERE":
    print("⚠️  WARNING: GEMINI_API_KEY not set in .env file")
    print("This key is needed for answer generation (not for embedding)")
    print("Please add your Gemini API key to the.env file")
    print("\nYou can continue with embedding, but answer generation will fail.")
    user_input = input("\nContinue with embedding anyway? (y/n): ")
    if user_input.lower() != 'y':
        exit(0)

cohere_key = os.getenv("COHERE_API_KEY")
if not cohere_key:
    print("❌ ERROR: COHERE_API_KEY not found in .env file")
    print("Cannot proceed without Cohere API key")
    exit(1)

print("✓ Cohere API key found")
if gemini_key and gemini_key != "YOUR_GEMINI_API_KEY_HERE":
    print("✓ Gemini API key found")
else:
    print("⚠️  Gemini API key not set (needed later for answer generation)")

print("\nProceeding with embedding process...")
