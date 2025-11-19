# Railway Deployment Guide

This guide explains how to deploy the Sell The Pen AI project to Railway.

## Architecture

The project consists of two services:
1. **Frontend** - React + Vite app (root directory)
2. **Backend** - FastAPI server (backend/ directory)
3. **Database** - PostgreSQL (Railway managed)

## Prerequisites

1. [Railway account](https://railway.app) (free tier available)
2. Railway CLI installed: `npm i -g @railway/cli`
3. Git repository pushed to GitHub/GitLab

## Deployment Steps

### 1. Create a New Railway Project

```bash
# Login to Railway
railway login

# Initialize a new project
railway init
```

Or use the Railway web interface:
- Go to [railway.app/new](https://railway.app/new)
- Click "Deploy from GitHub repo"
- Select your repository

### 2. Add PostgreSQL Database

In the Railway dashboard:
1. Click "New" → "Database" → "Add PostgreSQL"
2. Railway will automatically provision a Postgres instance
3. Note the connection string (available in Variables tab)

### 3. Deploy Backend Service

In Railway dashboard:
1. Click "New" → "GitHub Repo" → Select your repo
2. Configure the service:
   - **Name**: `backend`
   - **Root Directory**: `/backend`
   - **Builder**: Dockerfile (auto-detected)
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

#### Backend Environment Variables

Add these in the Backend service's Variables tab:

```bash
# OpenAI API
OPENAI_API_KEY=sk-proj-your-key-here

# Vapi Configuration
VAPI_API_KEY=your-vapi-key
VAPI_PHONE_NUMBER_ID=your-phone-number-id
VAPI_ASSISTANT_ID=lead-gen-assistant

# Database (Railway auto-injects this, but you can reference it)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Optional: Deepgram (if using)
DEEPGRAM_API_KEY=your-deepgram-key

# Server Config
PORT=3000
ENVIRONMENT=production

# CORS Origins (will update with frontend URL)
CORS_ORIGINS=https://your-frontend.railway.app
```

### 4. Deploy Frontend Service

In Railway dashboard:
1. Click "New" → "GitHub Repo" → Select same repo
2. Configure the service:
   - **Name**: `frontend`
   - **Root Directory**: `/` (root)
   - **Builder**: Nixpacks
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`

#### Frontend Environment Variables

Add these in the Frontend service's Variables tab:

```bash
# Backend API URL (get this from backend service's public URL)
VITE_API_URL=https://your-backend.railway.app

# Vapi Public Key (for frontend widget)
VITE_VAPI_PUBLIC_KEY=your-vapi-public-key
```

### 5. Configure Custom Domains (Optional)

For each service:
1. Go to service Settings → Networking
2. Click "Generate Domain" or add custom domain
3. Update CORS_ORIGINS in backend with frontend domain
4. Update VITE_API_URL in frontend with backend domain

### 6. Enable Service Networking

To allow frontend to call backend using private networking:
1. In backend service → Settings → Networking
2. Enable "Private Networking"
3. Copy the private URL (e.g., `backend.railway.internal:3000`)
4. You can use this in frontend's `VITE_API_URL` for faster internal requests

## Environment Variables Summary

### Backend Service

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for LLM analysis | Yes |
| `VAPI_API_KEY` | Vapi API key for voice agent | Yes |
| `VAPI_PHONE_NUMBER_ID` | Vapi phone number ID | Yes |
| `VAPI_ASSISTANT_ID` | Vapi assistant ID | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes (auto) |
| `DEEPGRAM_API_KEY` | Deepgram API key (if using) | No |
| `PORT` | Server port | No (Railway sets) |
| `CORS_ORIGINS` | Allowed CORS origins | Yes |

### Frontend Service

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_VAPI_PUBLIC_KEY` | Vapi public key | Yes |

## Post-Deployment

### 1. Verify Deployments

```bash
# Check backend health
curl https://your-backend.railway.app/health

# Check frontend
curl https://your-frontend.railway.app
```

### 2. Run Database Migrations

Once backend is deployed:

```bash
# Connect to backend service
railway run --service backend

# Run migrations (if you have migration scripts)
# Example:
# python -m alembic upgrade head
```

### 3. Monitor Logs

```bash
# View backend logs
railway logs --service backend

# View frontend logs
railway logs --service frontend
```

## Troubleshooting

### Build Failures

**Frontend fails to build:**
- Check Node version compatibility
- Ensure all dependencies are in package.json
- Check build command in railway.json

**Backend fails to build:**
- Verify Python version (3.12 required)
- Check Dockerfile syntax
- Ensure all dependencies in pyproject.toml

### Runtime Issues

**CORS errors:**
- Update CORS_ORIGINS in backend to include frontend URL
- Ensure backend main.py has correct CORS middleware

**Database connection errors:**
- Verify DATABASE_URL is set correctly
- Check PostgreSQL service is running
- Ensure database connection code handles Railway's DATABASE_URL format

**Port binding errors:**
- Use Railway's $PORT environment variable
- Backend should bind to 0.0.0.0, not localhost

### API Key Issues

**OpenAI/Vapi errors:**
- Verify API keys are correct in Variables tab
- Check keys have appropriate permissions/credits
- Ensure keys don't have extra spaces or newlines

## Railway CLI Commands

```bash
# Deploy from local
railway up

# View logs
railway logs

# Open service in browser
railway open

# Run commands in Railway environment
railway run <command>

# Link to existing project
railway link

# View environment variables
railway variables

# Add environment variable
railway variables set KEY=value
```

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] CORS origins updated with production URLs
- [ ] Custom domains configured (if needed)
- [ ] SSL certificates active (auto by Railway)
- [ ] Health check endpoints working
- [ ] Monitoring/alerts set up
- [ ] API rate limits configured
- [ ] Error tracking enabled (e.g., Sentry)
- [ ] Backup strategy for database

## Cost Optimization

Railway free tier includes:
- $5 credit per month
- Up to 512 MB RAM per service
- 1 GB disk per service

To optimize costs:
1. Use Railway's sleep mode for non-production environments
2. Configure auto-scaling based on traffic
3. Use caching to reduce database queries
4. Optimize Docker image sizes

## Resources

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Nixpacks Documentation](https://nixpacks.com)
- [Railway Templates](https://railway.app/templates)

## Alternative: Single Click Deploy

Create a `railway.json` at root with service definitions:

```json
{
  "services": [
    {
      "name": "backend",
      "root": "/backend",
      "builder": "DOCKERFILE"
    },
    {
      "name": "frontend",
      "root": "/",
      "builder": "NIXPACKS"
    }
  ]
}
```

Then use Railway's "Deploy from GitHub" button.

---

**Need help?** Open an issue or contact Railway support.
