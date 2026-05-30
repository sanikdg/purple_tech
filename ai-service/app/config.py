from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True
    BACKEND_URL: str = "http://localhost:5000/api"
    MODEL_PATH: str = "yolov8n.pt"
    CONFIDENCE_THRESHOLD: float = 0.5
    DEVICE: str = "cpu"

    class Config:
        env_prefix = "AI_SERVICE_"
        env_file = ".env"


settings = Settings()
