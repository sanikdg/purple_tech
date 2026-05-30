# Event Schema Design

## Overview

The system uses a centralized event type system defined in `backend/src/utils/eventTypes.js`. All services reference these constants to ensure consistency.

## Event Types

| Constant | Value | Description |
|----------|-------|-------------|
| `CUSTOMER_ENTERED` | `CUSTOMER_ENTERED` | A new person detected entering the camera FOV |
| `CUSTOMER_EXITED` | `CUSTOMER_EXITED` | A tracked person exits the camera FOV |
| `ZONE_VISITED` | `ZONE_VISITED` | A tracked person enters a defined zone |
| `ZONE_LEFT` | `ZONE_LEFT` | A tracked person leaves a defined zone |
| `DWELL_TIME_UPDATED` | `DWELL_TIME_UPDATED` | Periodic update of time spent in a zone |
| `TRACK_CREATED` | `TRACK_CREATED` | ByteTrack assigns a new track ID |
| `TRACK_LOST` | `TRACK_LOST` | Track lost (person occluded or left) |
| `LOITERING_DETECTED` | `LOITERING_DETECTED` | Anomaly: person stationary beyond threshold |
| `CROWD_DETECTED` | `CROWD_DETECTED` | Anomaly: person count exceeds threshold |
| `RESTRICTED_AREA_ENTRY` | `RESTRICTED_AREA_ENTRY` | Anomaly: person enters restricted zone |
| `ANALYTICS_UPDATED` | `ANALYTICS_UPDATED` | Daily analytics aggregation updated |

## Track Status Values

| Status | Description |
|--------|-------------|
| `ACTIVE` | Track is currently being updated with new detections |
| `LOST` | Track was not matched to a detection for N frames |
| `EXITED` | Track confirmed to have exited via an exit zone |

## Event Lifecycle

```
Person Detected
     │
     ▼
TRACK_CREATED ──▶ CUSTOMER_ENTERED
     │
     ▼
ZONE_VISITED ──▶ DWELL_TIME_UPDATED (periodic)
     │
     ▼
ZONE_LEFT ──▶ ZONE_VISITED (next zone)
     │
     ▼
TRACK_LOST ──▶ CUSTOMER_EXITED
     │
     ▼
ANALYTICS_UPDATED (aggregated)
```

## Anomaly Events

Anomaly events are generated when specific thresholds are exceeded:

| Anomaly | Trigger | Severity |
|---------|---------|----------|
| Loitering | Person stationary > 5 minutes | Medium |
| Crowd | Zone person count > configured max | High |
| Restricted Entry | Person enters restricted zone | Critical |

## Event Storage

All events are stored in the `events` collection in MongoDB with:
- Indexed `eventType + timestamp` for efficient filtered queries
- Indexed `cameraId + timestamp` for per-camera event streams
- Populated references to `Camera`, `Track`, and `Zone` documents

## Track-Event Relationship

Each Track generates a sequence of events throughout its lifecycle:

1. `TRACK_CREATED` — Initial detection assignment
2. `CUSTOMER_ENTERED` — Entry zone crossing
3. `ZONE_VISITED` (×N) — Each zone transition
4. `DWELL_TIME_UPDATED` (×N) — Periodic while in zone
5. `ZONE_LEFT` (×N) — Each zone exit
6. `TRACK_LOST` or `CUSTOMER_EXITED` — Track termination
