from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class TrackStatus(str, Enum):
    ACTIVE = "ACTIVE"
    LOST = "LOST"
    EXITED = "EXITED"


class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float = Field(ge=0, le=1)


class Detection(BaseModel):
    frame_id: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    bounding_boxes: List[BoundingBox] = []


class TrackData(BaseModel):
    track_id: str
    status: TrackStatus = TrackStatus.ACTIVE
    current_position: BoundingBox
    zone_id: Optional[str] = None
    start_time: datetime = Field(default_factory=datetime.utcnow)
    last_seen: datetime = Field(default_factory=datetime.utcnow)


class ProcessingRequest(BaseModel):
    camera_id: str
    stream_url: str
    zones: List[dict] = []


class HealthResponse(BaseModel):
    success: bool = True
    service: str = "ai-service"
    status: str = "healthy"
