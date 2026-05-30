# Heatmap Design

## Overview

The heatmap system captures visitor position data over time and aggregates it into visual representations showing movement patterns, popular areas, and traffic density across store zones.

## Heatmap Generation Strategy

### Data Collection

1. The AI service extracts bounding box center coordinates for each tracked person per frame
2. Coordinates are normalized to `[0, 1]` range relative to the camera frame dimensions
3. Each coordinate point is sent to the backend with visitor ID, timestamp, and zone ID
4. Points are stored in the `heatmaps` collection

### Coordinate Storage Format

```javascript
{
  visitorId: "TRK-00042",
  xCoordinate: 0.456,     // normalized (0 = left edge, 1 = right edge)
  yCoordinate: 0.723,     // normalized (0 = top edge, 1 = bottom edge)
  timestamp: ISODate,
  zoneId: ObjectId,
  cameraId: ObjectId
}
```

**Why normalized coordinates?**
- Camera resolution may change
- Enables cross-camera comparison
- Simplifies frontend rendering to any canvas size

### Sampling Rate

Not every frame produces a heatmap point. The system samples at:
- **1 point per second per track** during normal operation
- **5 points per second per track** during high-activity periods (configurable)

## Aggregation Methodology

### Time-Based Aggregation

Heatmap data is aggregated into time buckets for visualization:

| Bucket | Use Case |
|--------|----------|
| 1 hour | Live dashboard view |
| 1 day | Daily traffic patterns |
| 1 week | Weekly trend analysis |
| 1 month | Long-term zone performance |

### Spatial Aggregation

The coordinate space is divided into a grid (default: 50×50 cells).

For each cell, the system computes:
- **Visit count**: Number of unique visitor IDs
- **Total dwell time**: Sum of time visitors spent in the cell
- **Average density**: Visit count / time period

### MongoDB Aggregation Pipeline

```javascript
db.heatmaps.aggregate([
  { $match: { timestamp: { $gte: startDate, $lte: endDate }, cameraId: cameraId } },
  { $project: {
    gridX: { $floor: { $multiply: ["$xCoordinate", 50] } },
    gridY: { $floor: { $multiply: ["$yCoordinate", 50] } },
    visitorId: 1
  }},
  { $group: {
    _id: { x: "$gridX", y: "$gridY" },
    count: { $sum: 1 },
    uniqueVisitors: { $addToSet: "$visitorId" }
  }},
  { $project: {
    x: "$_id.x", y: "$_id.y",
    density: "$count",
    uniqueVisitors: { $size: "$uniqueVisitors" }
  }}
]);
```

## Dashboard Visualization Approach

### Rendering Technology

- **Canvas-based heatmap** using HTML5 Canvas API
- Color gradient: Blue (low) → Green → Yellow → Red (high density)
- Overlaid on the camera's reference frame image

### Visualization Modes

| Mode | Description |
|------|-------------|
| **Density** | Color intensity = number of visits |
| **Dwell Time** | Color intensity = average time spent |
| **Flow** | Arrows showing common movement paths |
| **Zone Overlay** | Zone boundaries with per-zone stats |

### Update Frequency

- **Live mode**: Updated every 5 seconds via WebSocket
- **Historical mode**: Static render from aggregated data
