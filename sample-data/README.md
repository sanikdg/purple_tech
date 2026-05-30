# Sample Data

This directory contains sample data for testing and development of the Store Intelligence System.

## Expected Video Format

| Property | Recommendation |
|----------|---------------|
| **Format** | MP4 (H.264 codec) |
| **Resolution** | 1920×1080 (Full HD) recommended, minimum 1280×720 |
| **FPS** | 25-30 FPS for real-time processing |
| **Duration** | 1-5 minutes for testing, longer for benchmarking |
| **Color Space** | BGR (standard OpenCV format) |
| **Audio** | Not required (can be stripped) |

## Resolution Recommendations

| Use Case | Resolution | Notes |
|----------|-----------|-------|
| Development & Testing | 1280×720 | Faster processing, lower resource usage |
| Production Accuracy | 1920×1080 | Best detection accuracy |
| High-Density Scenes | 2560×1440 | Better for crowded environments |

## FPS Recommendations

| Scenario | FPS | Notes |
|----------|-----|-------|
| Normal foot traffic | 15 FPS | Sufficient for walking speed |
| Fast movement areas | 25 FPS | Entrances, exits |
| High accuracy needed | 30 FPS | Full frame rate, higher GPU cost |

## Directory Structure

```
sample-data/
├── README.md           # This file
├── videos/             # Sample CCTV video clips
│   ├── .gitkeep
│   └── (place .mp4 files here)
└── images/             # Sample frame captures
    ├── .gitkeep
    └── (place .jpg/.png files here)
```

## Notes

- Video files are excluded from git via `.gitignore` (they are typically too large for version control).
- For testing, use publicly available pedestrian detection datasets such as MOT17 or MOT20.
- Ensure camera angles are overhead or elevated for optimal detection.
