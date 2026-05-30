# API Design

## Base URL

```
http://localhost:5000/api
```

## Response Format

All endpoints return a standardized JSON response:

```json
{
  "success": true,
  "message": "Description of result",
  "data": { }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detail 1", "Detail 2"]
}
```

---

## Health Check

### `GET /api/health`

**Auth Required**: No

**Response**:
```json
{
  "success": true,
  "service": "backend",
  "status": "healthy",
  "timestamp": "2026-05-30T10:00:00.000Z",
  "uptime": 3600
}
```

---

## Authentication

### `POST /api/auth/register`

**Auth Required**: No

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User full name |
| email | string | Yes | Unique email |
| password | string | Yes | Min 6 characters |
| role | string | No | `admin`, `operator`, `viewer` (default: `viewer`) |

**Response**: `201 Created` with `{ user, token }`

### `POST /api/auth/login`

| Field | Type | Required |
|-------|------|----------|
| email | string | Yes |
| password | string | Yes |

**Response**: `200 OK` with `{ user, token }`

### `GET /api/auth/profile`

**Auth Required**: Yes (Bearer token)

**Response**: `200 OK` with `{ user }`

---

## Cameras

All camera endpoints require authentication.

### `POST /api/cameras`

| Field | Type | Required |
|-------|------|----------|
| name | string | Yes |
| location | string | Yes |
| streamUrl | string (URI) | Yes |
| resolution | object `{width, height}` | No |
| fps | number | No |

### `GET /api/cameras`

Query params: `status`, `isActive`

### `GET /api/cameras/:id`

### `PUT /api/cameras/:id`

### `DELETE /api/cameras/:id`

---

## Events

All event endpoints require authentication.

### `POST /api/events`

| Field | Type | Required |
|-------|------|----------|
| eventType | string (EVENT_TYPE enum) | Yes |
| cameraId | ObjectId | Yes |
| trackId | ObjectId | No |
| zoneId | ObjectId | No |
| timestamp | Date | No |
| payload | object | No |
| confidence | number (0-1) | No |

### `GET /api/events`

Query params: `eventType`, `cameraId`, `startDate`, `endDate`, `page`, `limit`

### `GET /api/events/:id`

---

## Zones

All zone endpoints require authentication.

### `POST /api/zones`

| Field | Type | Required |
|-------|------|----------|
| zoneId | string | Yes |
| zoneName | string | Yes |
| zoneType | string (`entrance`, `exit`, `section`, `checkout`, `restricted`) | Yes |
| polygonCoordinates | array of `{x, y}` (min 3 points) | Yes |
| description | string | No |
| cameraId | ObjectId | No |

### `GET /api/zones`

Query params: `zoneType`, `isActive`

### `GET /api/zones/:id`

### `PUT /api/zones/:id`

### `DELETE /api/zones/:id`

---

## Analytics

All analytics endpoints require authentication.

### `GET /api/analytics/daily`

Query params: `date` (required), `cameraId`

### `GET /api/analytics/range`

Query params: `startDate` (required), `endDate` (required), `cameraId`

---

## AI Service API

Base URL: `http://localhost:8000`

### `GET /health`

**Response**:
```json
{
  "success": true,
  "service": "ai-service",
  "status": "healthy"
}
```

### `GET /api/status`

Returns AI pipeline status.

### `POST /api/process/start`

Starts the video processing pipeline. (Phase 2)

### `POST /api/process/stop`

Stops the video processing pipeline. (Phase 2)
