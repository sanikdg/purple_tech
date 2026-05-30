# AI-Powered Store Intelligence System

An enterprise-grade, AI-powered analytics platform that processes CCTV footage to detect customers, track movement across store zones, generate business events, detect anomalies, and display real-time intelligence on a dashboard.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [System Architecture](#system-architecture)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Overview](#api-overview)
- [Database Design](#database-design)
- [Event Schema](#event-schema)
- [Real-Time Events](#real-time-events)
- [Heatmap Architecture](#heatmap-architecture)
- [AI Pipeline](#ai-pipeline)
- [Architecture Decision Records](#architecture-decision-records)
- [Future Roadmap](#future-roadmap)
- [Deployment Guide](#deployment-guide)
- [Assumptions](#assumptions)
- [Engineering Decisions](#engineering-decisions)

---

## Project Overview

The Store Intelligence System is a distributed application composed of three microservices:

1. **Frontend** — React dashboard for real-time visualization
2. **Backend** — Node.js API server with WebSocket support
3. **AI Service** — Python-based detection and tracking pipeline

These services work together to transform raw CCTV footage into actionable business intelligence including visitor counts, zone analytics, dwell time metrics, movement heatmaps, and anomaly alerts.

---

## Problem Statement

Retail stores lack visibility into customer behavior within physical spaces. Traditional foot counters provide only entry/exit numbers. Store managers need:

- **Spatial awareness**: Which store sections attract the most traffic?
- **Temporal patterns**: What are peak hours and how does traffic flow?
- **Dwell analysis**: How long do customers spend in each section?
- **Anomaly detection**: Are there loitering incidents or crowd buildups?
- **Real-time monitoring**: Live dashboard with instant alerts

This system solves these problems by applying computer vision (YOLOv8 detection + ByteTrack tracking) to CCTV feeds and presenting insights through a real-time web dashboard.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER CLIENT                          │
│                   React + Tailwind CSS + Recharts               │
└──────────────┬─────────────────────────┬────────────────────────┘
               │ REST API (Axios)        │ WebSocket (Socket.IO)
               ▼                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVICE                          │
│                   Node.js + Express + Mongoose                  │
│              JWT Auth │ REST API │ Socket.IO Server              │
└──────────────┬─────────────────────────┬────────────────────────┘
               │ Mongoose                │ HTTP
               ▼                         ▼
┌──────────────────────┐   ┌──────────────────────────────────────┐
│       MongoDB        │   │          AI SERVICE                  │
│                      │   │     Python + FastAPI + YOLOv8        │
│  7 Collections:      │   │  Detection → Tracking → Events      │
│  users, events,      │   └──────────────────────────────────────┘
│  cameras, analytics, │
│  zones, heatmaps,    │
│  tracks              │
└──────────────────────┘
```

For detailed architecture, see: [`architecture/system-design.md`](architecture/system-design.md)

---

## Folder Structure

```
store-intelligence-system/
│
├── frontend/                          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── pages/                     # Dashboard, Analytics, Cameras, Zones, Events, Login
│   │   ├── components/                # Sidebar, Header, StatsCard
│   │   ├── layouts/                   # DashboardLayout, AuthLayout
│   │   ├── contexts/                  # AuthContext, SocketContext
│   │   ├── services/                  # Axios API, Socket.IO client
│   │   ├── hooks/                     # useSocket
│   │   ├── routes/                    # AppRoutes
│   │   └── utils/                     # constants, helpers
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/                    # env, db, cors
│   │   ├── controllers/              # auth, event, camera, analytics, zone
│   │   ├── routes/                    # auth, event, camera, analytics, zone, health
│   │   ├── middleware/                # auth, error, validation
│   │   ├── services/                  # auth, event, camera, analytics, zone
│   │   ├── models/                    # User, Event, Camera, Analytics, Zone, Heatmap, Track
│   │   ├── sockets/                   # Socket.IO initialization
│   │   ├── utils/                     # logger, response, eventTypes
│   │   ├── validations/              # auth, event, camera, zone
│   │   ├── app.js                     # Express app
│   │   └── server.js                  # HTTP server + Socket.IO
│   ├── Dockerfile
│   └── package.json
│
├── ai-service/                        # Python + FastAPI + YOLOv8
│   ├── app/
│   │   ├── api/                       # routes, health
│   │   ├── detection/                 # YOLOv8 detector
│   │   ├── tracking/                  # ByteTrack tracker
│   │   ├── analytics/                 # Analytics engine
│   │   ├── models/                    # Pydantic schemas
│   │   └── utils/                     # logger
│   ├── main.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── architecture/                      # Architecture documentation
│   ├── system-design.md
│   ├── api-design.md
│   ├── database-design.md
│   ├── event-schema.md
│   ├── deployment-guide.md
│   ├── heatmap-design.md
│   ├── realtime-events.md
│   └── ai-pipeline-design.md
│
├── docs/                              # Additional documentation
│   ├── adr/                           # Architecture Decision Records
│   │   ├── 001-fastapi.md
│   │   ├── 002-mongodb.md
│   │   ├── 003-socketio.md
│   │   └── 004-yolo.md
│   └── system-readiness-checklist.md
│
├── docker/                            # Docker support files
│   ├── nginx/nginx.conf
│   └── mongo/init-mongo.js
│
├── scripts/                           # Automation scripts
│   ├── setup.sh
│   └── setup.ps1
│
├── sample-data/                       # Sample data for testing
│   ├── README.md
│   ├── videos/
│   └── images/
│
├── README.md
├── DEVELOPMENT_PROGRESS.md
├── docker-compose.yml
├── .gitignore
└── .env.example
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI component library |
| Vite 5 | Build tool and dev server |
| Tailwind CSS 3 | Utility-first styling |
| React Router 6 | Client-side routing |
| Axios | HTTP client for API calls |
| Recharts | Data visualization charts |
| Socket.IO Client | Real-time WebSocket communication |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js 20 | Runtime environment |
| Express 4 | REST API framework |
| MongoDB 7 | Document database |
| Mongoose 8 | ODM for MongoDB |
| Socket.IO 4 | Real-time event streaming |
| JWT (jsonwebtoken) | Token-based authentication |
| Joi | Request validation |
| Winston | Structured logging |
| bcryptjs | Password hashing |

### AI Service
| Technology | Purpose |
|-----------|---------|
| Python 3.11 | Runtime environment |
| FastAPI | Async web framework |
| YOLOv8 (Ultralytics) | Person detection |
| OpenCV | Video processing |
| ByteTrack | Multi-object tracking |
| Pydantic | Data validation |

### DevOps
| Technology | Purpose |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |
| Nginx | Reverse proxy |

---

## Setup Instructions

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose (optional, for containerized deployment)
- MongoDB 7+ (or use Docker)

### Quick Start (Docker)

```bash
git clone <repository-url>
cd store-intelligence-system
cp .env.example .env
docker-compose up -d
```

### Local Development

**Windows:**
```powershell
.\scripts\setup.ps1
```

**Linux/macOS:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**Manual Setup:**
```bash
# Backend
cd backend && cp .env.example .env && npm install && npm run dev

# Frontend (new terminal)
cd frontend && cp .env.example .env && npm install && npm run dev

# AI Service (new terminal)
cd ai-service && cp .env.example .env && python -m venv venv
# Activate venv, then:
pip install -r requirements.txt && python main.py
```

### Verify

```bash
curl http://localhost:5000/api/health    # Backend
curl http://localhost:8000/health        # AI Service
# Open http://localhost:5173             # Frontend
```

---

## API Overview

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Service health check |
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login and get JWT |
| GET | `/auth/profile` | Yes | Get current user profile |
| GET | `/cameras` | Yes | List all cameras |
| POST | `/cameras` | Yes | Add a camera |
| GET | `/cameras/:id` | Yes | Get camera by ID |
| PUT | `/cameras/:id` | Yes | Update camera |
| DELETE | `/cameras/:id` | Yes | Delete camera |
| GET | `/events` | Yes | List events (filtered, paginated) |
| POST | `/events` | Yes | Create an event |
| GET | `/events/:id` | Yes | Get event by ID |
| GET | `/zones` | Yes | List all zones |
| POST | `/zones` | Yes | Create a zone |
| GET | `/zones/:id` | Yes | Get zone by ID |
| PUT | `/zones/:id` | Yes | Update zone |
| DELETE | `/zones/:id` | Yes | Delete zone |
| GET | `/analytics/daily` | Yes | Daily analytics |
| GET | `/analytics/range` | Yes | Analytics date range |

AI Service Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | AI service health check |
| GET | `/api/status` | Pipeline status |
| POST | `/api/process/start` | Start processing (Phase 2) |
| POST | `/api/process/stop` | Stop processing (Phase 2) |

Full API specification: [`architecture/api-design.md`](architecture/api-design.md)

---

## Database Design

The system uses MongoDB with 7 collections:

| Collection | Purpose |
|-----------|---------|
| `users` | System users with role-based access |
| `cameras` | CCTV camera configuration and status |
| `zones` | Spatial regions within camera views |
| `events` | All system events from AI pipeline |
| `tracks` | Customer tracking records (ACTIVE/LOST/EXITED) |
| `analytics` | Aggregated daily analytics per camera |
| `heatmaps` | Position data points for movement visualization |

Full schema documentation: [`architecture/database-design.md`](architecture/database-design.md)

---

## Event Schema

The system defines 11 standardized event types in `backend/src/utils/eventTypes.js`:

| Event | Description |
|-------|-------------|
| `CUSTOMER_ENTERED` | Person detected entering store |
| `CUSTOMER_EXITED` | Person confirmed exiting store |
| `ZONE_VISITED` | Person enters a defined zone |
| `ZONE_LEFT` | Person leaves a defined zone |
| `DWELL_TIME_UPDATED` | Time spent in zone updated |
| `TRACK_CREATED` | New tracking ID assigned |
| `TRACK_LOST` | Track lost (occlusion/exit) |
| `LOITERING_DETECTED` | Anomaly: person stationary too long |
| `CROWD_DETECTED` | Anomaly: zone overcrowded |
| `RESTRICTED_AREA_ENTRY` | Anomaly: restricted zone breach |
| `ANALYTICS_UPDATED` | Daily analytics recalculated |

Full event lifecycle: [`architecture/event-schema.md`](architecture/event-schema.md)

---

## Real-Time Events

WebSocket events pushed via Socket.IO:

| Event | Direction | Description |
|-------|-----------|-------------|
| `visitor_count_update` | Server → Client | Live visitor count change |
| `new_event` | Server → Client | New event from AI pipeline |
| `analytics_update` | Server → Client | Analytics recalculation |
| `zone_visit_update` | Server → Client | Zone entry/exit |
| `anomaly_detected` | Server → Client | Anomaly alert |
| `camera_status_changed` | Server → Client | Camera online/offline |
| `join_dashboard` | Client → Server | Join real-time room |

Full WebSocket contracts: [`architecture/realtime-events.md`](architecture/realtime-events.md)

---

## Heatmap Architecture

The heatmap system captures normalized visitor coordinates and aggregates them into grid-based density maps for visualization.

Key design decisions:
- Coordinates normalized to `[0, 1]` for resolution independence
- Spatial aggregation into 50×50 grid cells
- Time-based aggregation (hourly, daily, weekly, monthly)
- Canvas-based rendering with color gradients

Full design: [`architecture/heatmap-design.md`](architecture/heatmap-design.md)

---

## AI Pipeline

The future AI processing pipeline (Phase 2):

```
Video Input → Frame Extraction → YOLO Detection → ByteTrack Tracking
→ Zone Mapping → Event Generation → MongoDB Storage → Analytics Engine → Dashboard
```

Full pipeline design: [`architecture/ai-pipeline-design.md`](architecture/ai-pipeline-design.md)

---

## Architecture Decision Records

| ADR | Decision |
|-----|----------|
| [001](docs/adr/001-fastapi.md) | FastAPI selected for AI service (async, auto-docs, Pydantic) |
| [002](docs/adr/002-mongodb.md) | MongoDB selected for event-heavy workloads (flexible schema, aggregation) |
| [003](docs/adr/003-socketio.md) | Socket.IO selected for real-time communication (rooms, reconnection) |
| [004](docs/adr/004-yolo.md) | YOLOv8 selected for real-time detection (speed-accuracy tradeoff) |

---

## Future Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| Phase 1 | Project foundation, setup, configuration | ✅ Completed |
| Phase 1.1 | Zones, heatmaps, event types, sample data | ✅ Completed |
| Phase 1.2 | Track model, health checks, ADRs, readiness | ✅ Completed |
| Phase 2 | Detection pipeline, tracking, event generation | 🔜 Planned |
| Phase 3 | Analytics engine, heatmap visualization | 🔜 Planned |
| Phase 4 | Anomaly detection, alerting | 🔜 Planned |
| Phase 5 | Multi-camera support, scaling | 🔜 Planned |
| Phase 6 | Production deployment, monitoring | 🔜 Planned |

---

## Deployment Guide

See [`architecture/deployment-guide.md`](architecture/deployment-guide.md) for full deployment instructions.

**Service Ports:**

| Service | Port |
|---------|------|
| Frontend | 5173 |
| Backend API | 5000 |
| AI Service | 8000 |
| MongoDB | 27017 |
| Mongo Express | 8081 |

---

## Assumptions

1. CCTV cameras provide RTSP or HTTP video streams
2. Camera placement provides a top-down or elevated angle for optimal detection
3. Video resolution is at least 720p for reliable person detection
4. The system operates in a single-store environment initially
5. MongoDB runs locally or in Docker for development
6. GPU is available for production AI inference (CPU fallback for development)
7. A single user session monitors one store at a time
8. Zone definitions are configured manually via the API before AI processing

---

## Engineering Decisions

1. **Monorepo structure** — All services colocated for development simplicity; Docker Compose orchestrates inter-service communication
2. **Centralized event constants** — `eventTypes.js` is the single source of truth; prevents string mismatches across services
3. **Standardized API responses** — All endpoints return `{ success, message, data }` format for consistent client handling
4. **Joi for validation** — Schema-based request validation at the middleware layer, keeping controllers clean
5. **Winston for logging** — Structured JSON logging with file output in production; console-only in development
6. **Multi-stage Docker builds** — Separate development and production stages minimize image sizes
7. **Mongoose population** — Lazy-loading related documents (Camera → Zones, Event → Camera) instead of denormalization
8. **Normalized heatmap coordinates** — Resolution-independent `[0, 1]` range enables cross-camera comparison
9. **Socket.IO rooms** — Dashboard clients join a room to receive only dashboard-relevant events
10. **Role-based access** — Three roles (admin, operator, viewer) for future granular permissions
