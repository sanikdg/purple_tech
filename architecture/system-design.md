# System Design

## Overview

The Store Intelligence System is a distributed application composed of three primary services that work together to process CCTV footage, detect and track customers, generate business events, and display real-time analytics on a dashboard.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER CLIENT                          │
│                   React + Tailwind CSS + Recharts               │
│                     (Real-time Dashboard)                       │
└──────────────┬─────────────────────────┬────────────────────────┘
               │ REST API (Axios)        │ WebSocket (Socket.IO)
               ▼                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND SERVICE                          │
│                   Node.js + Express + Mongoose                  │
│              ┌──────────────────────────────┐                   │
│              │  JWT Auth │ REST API │ Socket │                   │
│              └──────────────────────────────┘                   │
└──────────────┬─────────────────────────┬────────────────────────┘
               │ Mongoose                │ HTTP
               ▼                         ▼
┌──────────────────────┐   ┌──────────────────────────────────────┐
│       MongoDB        │   │          AI SERVICE                  │
│  (Event Store, DB)   │   │     Python + FastAPI + YOLOv8        │
│                      │   │  ┌────────────────────────────────┐  │
│  Collections:        │   │  │ Detection → Tracking → Events │  │
│  - users             │   │  └────────────────────────────────┘  │
│  - events            │   └──────────────────────────────────────┘
│  - cameras           │
│  - analytics         │
│  - zones             │
│  - heatmaps          │
│  - tracks            │
└──────────────────────┘
```

## Service Communication

| From | To | Protocol | Purpose |
|------|----|----------|---------|
| Frontend | Backend | HTTP REST | CRUD operations, auth |
| Frontend | Backend | WebSocket | Real-time event streaming |
| AI Service | Backend | HTTP REST | Post detection events, update tracks |
| Backend | MongoDB | TCP (Mongoose) | Data persistence |

## Data Flow

1. **Camera Feed Ingestion**: AI Service reads RTSP/video streams
2. **Detection**: YOLOv8 detects persons in each frame
3. **Tracking**: ByteTrack assigns persistent IDs across frames
4. **Zone Mapping**: Track positions are mapped to defined store zones
5. **Event Generation**: State changes produce typed events
6. **Storage**: Events and analytics are persisted to MongoDB
7. **Real-time Push**: Backend emits Socket.IO events to connected dashboards
8. **Dashboard Render**: Frontend renders charts, stats, and heatmaps

## Scalability Considerations

- **Horizontal Scaling**: Each service can be scaled independently via Docker
- **Database Indexing**: Compound indexes on high-query-volume collections
- **WebSocket Rooms**: Dashboard clients join rooms to receive only relevant events
- **Stateless Backend**: JWT auth enables stateless horizontal scaling
- **AI Service Isolation**: GPU-heavy workloads isolated from API server

## Security Architecture

- JWT Bearer tokens for API authentication
- Role-based access control (admin, operator, viewer)
- CORS restricted to frontend origin
- Environment-based secret management
- MongoDB authentication in production
