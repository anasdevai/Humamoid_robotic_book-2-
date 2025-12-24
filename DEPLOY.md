# Vercel Deployment Guide

## Quick Start

### 1. Deploy Backend

```bash
cd backend
vercel
```

Follow the prompts and accept defaults.

### 2. Add Environment Variables

Go to your Vercel dashboard → Your project → Settings → Environment Variables

Add these:
```
COHERE_API_KEY=5DnNVNHgNs5U1UOT4uatztnCIL3WKrnGbaMDJoJK
GEMINI_API_KEY=AIzaSyDVAl3wnXpfAyQSe7aiz-wzb91vmF3M7oA
QDRANT_URL=https://2575c3f8-2302-4eab-b50f-d6342b6bc1ef.europe-west3-0.gcp.cloud.qdrant.io
QDRANT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.JcuCne5BmlVQwVFrSu7ANsQumUaEXQbBMDfxSLYDpCY
```

### 3. Test Backend

```bash
curl https://your-backend.vercel.app/health
```

### 4. Update Frontend

Your backend API URL will be something like:
`https://humamoid-robotic-book-backend.vercel.app`

You'll need to update the ChatBot component to use this URL.

### 5. Redeploy Frontend

```bash
cd ai-book
vercel --prod
```

## Troubleshooting

- **Module not found**: Redeploy after adding env vars
- **CORS errors**: Make sure frontend domain is in CORS list
- **Timeout**: Optimize queries or upgrade Vercel plan
