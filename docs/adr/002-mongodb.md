# ADR-002: MongoDB for Data Storage

## Status

Accepted

## Context

The system generates a high volume of heterogeneous events from CCTV analysis — customer entries, zone visits, tracking updates, anomalies, and analytics aggregations. The data model needs to:

- Handle high-throughput write operations (events from multiple cameras)
- Support flexible schemas that evolve as new event types are added
- Enable efficient time-range queries for analytics dashboards
- Store geospatial-like data (zone polygons, heatmap coordinates)

## Problem

Which database should be used for the event-heavy, analytics-driven workload?

## Decision

**MongoDB** was selected as the primary database.

## Alternatives Considered

| Database | Pros | Cons |
|----------|------|------|
| **PostgreSQL** | ACID, strong consistency, mature | Schema rigidity for evolving event types, JSON support is bolt-on |
| **MongoDB** | Flexible schema, native JSON, excellent write throughput, aggregation pipeline | Eventual consistency (acceptable for analytics), no joins |
| **TimescaleDB** | Time-series optimized, SQL | Additional complexity, overkill for current scale |
| **InfluxDB** | Time-series native | Limited query flexibility, poor for relational data (users, cameras) |
| **Redis** | Ultra-fast reads/writes | Not suitable for primary storage, limited querying |

## Tradeoffs

**Gains**:
- Schema-less documents match the variable structure of event payloads
- Built-in aggregation pipeline for analytics (heatmap generation, hourly distributions)
- Native Mongoose ODM integrates cleanly with Node.js/Express backend
- Horizontal scaling via sharding for future multi-store deployment
- Compound indexes on `{eventType, timestamp}` and `{cameraId, timestamp}` optimize dashboard queries

**Costs**:
- No enforced foreign key constraints (handled at application level via Mongoose refs)
- Eventual consistency model (acceptable — analytics tolerate slight delays)
- Team needs MongoDB-specific query optimization knowledge

## Consequences

- All data models are defined as Mongoose schemas in `backend/src/models/`
- Relationships use `ObjectId` references with `populate()` for lazy loading
- Performance-critical queries use indexed fields and aggregation pipelines
- MongoDB initialization script creates collections and indexes at startup
