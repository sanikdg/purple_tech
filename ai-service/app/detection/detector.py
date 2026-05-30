"""
YOLOv8-based person detector for CCTV footage.

This module will handle:
- Model loading and initialization
- Frame-by-frame person detection
- Bounding box extraction
- Confidence filtering

Implementation scheduled for Phase 2.
"""

from app.config import settings


class PersonDetector:
    """Detects persons in video frames using YOLOv8."""

    def __init__(self):
        self.model = None
        self.confidence_threshold = settings.CONFIDENCE_THRESHOLD
        self.device = settings.DEVICE

    def load_model(self):
        """Load YOLOv8 model. Implementation in Phase 2."""
        pass

    def detect(self, frame):
        """
        Run detection on a single frame.

        Args:
            frame: numpy array (H, W, 3) BGR image

        Returns:
            List of detections with bounding boxes and confidence scores.
        """
        pass

    def unload_model(self):
        """Release model resources."""
        self.model = None
