# ADR-001: FastAPI for AI Service

## Status

Accepted

## Context

The AI service needs a web framework to expose REST endpoints for pipeline control, health monitoring, and status reporting. The AI processing logic is written in Python due to the machine learning ecosystem (YOLOv8, OpenCV, NumPy). The framework must:

- Support asynchronous request handling
- Provide automatic API documentation
- Have minimal overhead to avoid impacting GPU-heavy workloads
- Support Pydantic-based request/response validation

## Problem

Which Python web framework should serve the AI service's REST API?

## Decision

**FastAPI** was selected as the AI service web framework.

## Alternatives Considered

| Framework | Pros | Cons |
|-----------|------|------|
| **Flask** | Simple, mature, large community | Synchronous by default, no built-in validation, no auto-docs |
| **Django REST** | Full-featured, ORM, admin | Heavy for a microservice, unnecessary ORM (we use MongoDB via Node.js) |
| **FastAPI** | Async-native, auto OpenAPI docs, Pydantic validation, high performance | Newer ecosystem, smaller community than Flask/Django |
| **aiohttp** | Low-level async | More boilerplate, no auto-docs, less developer ergonomics |

## Tradeoffs

**Gains**:
- Native async/await for non-blocking I/O while GPU processes frames
- Automatic OpenAPI/Swagger documentation at `/docs`
- Pydantic models for type-safe request/response validation
- Uvicorn ASGI server provides excellent throughput
- Minimal framework overhead leaves resources for ML inference

**Costs**:
- Team members may need to learn FastAPI conventions
- Smaller plugin ecosystem compared to Flask/Django

## Consequences

- All AI service endpoints use FastAPI routing conventions
- Request/response models are defined as Pydantic schemas in `app/models/schemas.py`
- The service runs on Uvicorn ASGI server
- API documentation is auto-generated at `http://localhost:8000/docs`
