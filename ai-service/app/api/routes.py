from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
async def get_status():
    """Returns the current status of the AI processing pipeline."""
    return {
        "success": True,
        "pipeline": "idle",
        "model_loaded": False,
        "active_streams": 0,
    }


@router.post("/process/start")
async def start_processing():
    """Starts the video processing pipeline. Implementation in Phase 2."""
    return {
        "success": True,
        "message": "Processing pipeline endpoint ready. Implementation pending Phase 2.",
    }


@router.post("/process/stop")
async def stop_processing():
    """Stops the video processing pipeline. Implementation in Phase 2."""
    return {
        "success": True,
        "message": "Stop pipeline endpoint ready. Implementation pending Phase 2.",
    }
