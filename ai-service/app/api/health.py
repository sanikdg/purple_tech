from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint for service monitoring and deployment verification."""
    return {
        "success": True,
        "service": "ai-service",
        "status": "healthy",
    }
