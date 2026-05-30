# ADR-003: Socket.IO for Real-Time Communication

## Status

Accepted

## Context

The dashboard requires real-time updates for:
- Live visitor counts
- New event notifications
- Zone occupancy changes
- Anomaly alerts
- Camera status changes

Updates must be pushed from the server to all connected dashboard clients with minimal latency.

## Problem

Which real-time communication technology should be used for server-to-client event streaming?

## Decision

**Socket.IO** was selected for real-time bidirectional communication.

## Alternatives Considered

| Technology | Pros | Cons |
|-----------|------|------|
| **Socket.IO** | Auto-reconnection, room-based broadcasting, fallback transports, mature ecosystem | Heavier than raw WebSockets, proprietary protocol |
| **Native WebSockets** | Lightest weight, standard protocol | No auto-reconnection, no rooms, manual fallback handling |
| **Server-Sent Events (SSE)** | Simple, HTTP-based, unidirectional | No bidirectional communication, limited browser connection pool |
| **MQTT** | IoT-optimized, pub/sub | Additional broker infrastructure, not HTTP-native |
| **Firebase Realtime DB** | Managed, auto-sync | Vendor lock-in, cost at scale, unnecessary external dependency |

## Tradeoffs

**Gains**:
- Built-in reconnection with configurable retry logic
- Room-based broadcasting (only dashboard clients receive updates)
- Transparent fallback from WebSocket to HTTP long-polling
- Excellent React integration via `socket.io-client`
- Same library on both server (Node.js) and client (React)
- Namespace support for future multi-tenant isolation

**Costs**:
- Slightly heavier than raw WebSockets (~2KB overhead per message)
- Proprietary protocol means client must use `socket.io-client` (not a standard WebSocket client)
- Stateful connections require sticky sessions in load-balanced environments

## Consequences

- Backend initializes Socket.IO alongside the HTTP server in `backend/src/sockets/index.js`
- Frontend connects via `socket.io-client` in `frontend/src/services/socket.js`
- Dashboard clients join the `dashboard` room to receive updates
- All real-time event contracts are documented in `architecture/realtime-events.md`
- Connection status is displayed in the frontend header (Live / Offline indicator)
