# ADR-004: YOLOv8 for Real-Time Person Detection

## Status

Accepted

## Context

The system's core capability is detecting people in CCTV footage. The detection model must:

- Run in real-time (15-30 FPS)
- Detect persons with high accuracy in retail environments
- Support GPU acceleration
- Be easy to deploy (no complex training pipeline for initial use)
- Work with standard camera resolutions (720p to 1080p)

## Problem

Which object detection model should be used for real-time person detection in CCTV footage?

## Decision

**YOLOv8** (by Ultralytics) was selected as the primary detection model.

## Alternatives Considered

| Model | Pros | Cons |
|-------|------|------|
| **YOLOv8** | Best speed-accuracy tradeoff, easy API, multiple model sizes, active development | Ultralytics license for commercial use |
| **YOLOv5** | Proven, stable, large community | Superseded by YOLOv8 in accuracy |
| **SSD MobileNet** | Very fast, mobile-friendly | Lower accuracy for distant/small persons |
| **Faster R-CNN** | High accuracy | Too slow for real-time processing |
| **DETR** | Transformer-based, no NMS needed | Slower inference, higher resource usage |
| **MediaPipe** | Lightweight, Google-maintained | Optimized for single-person, not multi-person |

## Tradeoffs

**Gains**:
- Multiple model sizes (nano to extra-large) allow speed/accuracy tuning per deployment
- Pre-trained on COCO dataset — person class (class 0) works out of the box
- Simple Python API: `model.predict(frame)` returns structured results
- Built-in export to ONNX/TensorRT for production optimization
- Active community and regular updates from Ultralytics
- ByteTrack integration is well-documented with YOLO outputs

**Costs**:
- Requires GPU for optimal performance (CPU inference is 5-10× slower)
- Ultralytics AGPL license requires attention for commercial deployment
- Model file sizes range from 6MB (nano) to 130MB (xlarge)

## Consequences

- The `PersonDetector` class in `ai-service/app/detection/detector.py` wraps YOLOv8
- Default model is `yolov8n.pt` (nano) for development, configurable via environment
- Detection output is filtered to COCO class 0 (person) only
- Confidence threshold is configurable (default: 0.5)
- Model path and device (cpu/cuda) are set via environment variables
