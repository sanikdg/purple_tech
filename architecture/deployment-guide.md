# Deployment Guide

## Prerequisites

- **Docker** v20+ and **Docker Compose** v2+
- **Node.js** v20+ (for local development)
- **Python** 3.11+ (for AI service local development)
- **MongoDB** 7+ (or use Docker)

## Quick Start (Docker)

```bash
# 1. Clone the repository
git clone <repository-url>
cd store-intelligence-system

# 2. Create environment files
cp .env.example .env

# 3. Start all services
docker-compose up -d

# 4. Verify services
curl http://localhost:5000/api/health    # Backend
curl http://localhost:8000/health        # AI Service
open http://localhost:5173               # Frontend
open http://localhost:8081               # Mongo Express
```

## Service Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend API | 5000 | http://localhost:5000/api |
| AI Service | 8000 | http://localhost:8000 |
| MongoDB | 27017 | mongodb://localhost:27017 |
| Mongo Express | 8081 | http://localhost:8081 |

## Local Development

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### AI Service

```bash
cd ai-service
cp .env.example .env
python -m venv venv
# Windows: .\venv\Scripts\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Health Check Verification

After deployment, verify all services are healthy:

```bash
# Backend health
curl -s http://localhost:5000/api/health | jq .

# AI Service health
curl -s http://localhost:8000/health | jq .
```

Expected responses:

```json
{ "success": true, "service": "backend", "status": "healthy" }
{ "success": true, "service": "ai-service", "status": "healthy" }
```

## Environment Variables

See `.env.example` in the project root and each service directory for required configuration.

## Production Considerations

- Change `JWT_SECRET` to a strong random value
- Set `NODE_ENV=production`
- Configure MongoDB authentication
- Use HTTPS with reverse proxy (nginx)
- Set appropriate CORS origins
- Enable rate limiting
- Configure log rotation
- Set up monitoring and alerting
