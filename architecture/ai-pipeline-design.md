# AI Pipeline Design

## Overview

This document describes the future AI processing pipeline that will be implemented in Phase 2. The pipeline transforms raw CCTV video into structured business events and analytics.

## Pipeline Flow

```
┌─────────────┐
│ Video Input  │  RTSP stream or video file
└──────┬──────┘
       ▼
┌─────────────────┐
│ Frame Extraction │  OpenCV VideoCapture
│                 │  Configurable FPS sampling
└──────┬──────────┘
       ▼
┌─────────────────┐
│ YOLO Detection   │  YOLOv8 person detection
│                 │  Bounding boxes + confidence
└──────┬──────────┘
       ▼
┌──────────────────┐
│ ByteTrack Tracking│  Multi-object tracking
│                  │  Persistent ID assignment
└──────┬───────────┘
       ▼
┌─────────────────┐
│ Zone Mapping     │  Point-in-polygon test
│                 │  Track → Zone association
└──────┬──────────┘
       ▼
┌──────────────────┐
│ Event Generation  │  State change detection
│                  │  Anomaly detection
└──────┬───────────┘
       ▼
┌──────────────────┐
│ MongoDB Storage   │  Events, tracks, heatmap
│                  │  via Backend REST API
└──────┬───────────┘
       ▼
┌──────────────────┐
│ Analytics Engine  │  Aggregation, statistics
│                  │  Dwell time, counts
└──────┬───────────┘
       ▼
┌─────────────┐
│  Dashboard   │  Real-time via Socket.IO
└─────────────┘
```

## Module Responsibilities

### Frame Extraction (`ai-service/app/detection/`)

- Open video stream using OpenCV `VideoCapture`
- Sample frames at configurable rate (default: every 2nd frame for 15 effective FPS)
- Convert frames to RGB for YOLO input
- Handle stream reconnection on failure

### YOLO Detection (`ai-service/app/detection/detector.py`)

- Load YOLOv8 model (`yolov8n.pt` for speed, `yolov8m.pt` for accuracy)
- Run inference on each sampled frame
- Filter detections to `person` class only (COCO class 0)
- Apply confidence threshold (default: 0.5)
- Output: list of bounding boxes `[x1, y1, x2, y2, confidence]`

### ByteTrack Tracking (`ai-service/app/tracking/tracker.py`)

- Accept per-frame detections from YOLO
- Associate detections across frames using IoU and appearance features
- Assign persistent track IDs
- Manage track states: ACTIVE → LOST → EXITED
- Handle occlusion with track memory (configurable: 30 frames)

### Zone Mapping

- Load zone polygon definitions from the backend API
- For each track's center point, perform point-in-polygon test
- Detect zone transitions (enter/exit events)
- Map tracks to their current zone

### Event Generation Strategy

Events are generated on **state changes**, not on every frame:

| State Change | Event Generated |
|-------------|-----------------|
| New track ID assigned | `TRACK_CREATED` |
| Track enters camera FOV via entrance zone | `CUSTOMER_ENTERED` |
| Track center enters a zone polygon | `ZONE_VISITED` |
| Track center leaves a zone polygon | `ZONE_LEFT` |
| Dwell time threshold reached | `DWELL_TIME_UPDATED` |
| Track not matched for N frames | `TRACK_LOST` |
| Track exits via exit zone | `CUSTOMER_EXITED` |
| Person stationary > threshold | `LOITERING_DETECTED` |
| Zone occupancy > threshold | `CROWD_DETECTED` |
| Person in restricted zone | `RESTRICTED_AREA_ENTRY` |

### Analytics Generation Strategy

Analytics are computed in two ways:

1. **Real-time incremental**: Counters updated on each event
   - Active visitor count
   - Per-zone occupancy
   - Running average dwell time

2. **Periodic batch aggregation**: Every 5 minutes
   - Hourly distribution recalculation
   - Peak hour determination
   - Anomaly summary
   - Zone breakdown statistics

Results are stored in the `analytics` collection and pushed via Socket.IO.

## Performance Targets

| Metric | Target |
|--------|--------|
| Detection latency | < 50ms per frame (GPU) |
| Tracking update | < 10ms per frame |
| End-to-end pipeline | < 100ms per frame |
| Supported cameras | 4 simultaneous (single GPU) |
| Frame processing rate | 15 FPS effective |

## Model Selection Guide

| Model | Size | Speed | Accuracy | Use Case |
|-------|------|-------|----------|----------|
| YOLOv8n | 6.2 MB | Fastest | Good | Real-time, limited GPU |
| YOLOv8s | 21.5 MB | Fast | Better | Balanced |
| YOLOv8m | 49.7 MB | Medium | Best | High accuracy needed |
