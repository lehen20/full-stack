from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql://postgres:password@localhost:5432/fullstack_db"
    
    # Security
    secret_key: str = "your-super-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS
    cors_origins: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    
    # API
    api_v1_prefix: str = "/api/v1"
    project_name: str = "Full Stack App"
    
    class Config:
        env_file = ".env"


settings = Settings()