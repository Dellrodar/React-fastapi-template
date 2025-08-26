"""Application configuration using Pydantic Settings."""

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8", 
        extra="ignore"
    )
    
    APP_ENV: str = Field(default="development", description="Application environment")
    PORT: int = Field(default=8000, description="Server port")
    LOG_LEVEL: str = Field(default="info", description="Logging level")
    CORS_ORIGINS_STR: str = Field(
        default="http://localhost:3000,http://127.0.0.1:3000",
        description="Comma-separated CORS origins",
        alias="CORS_ORIGINS"
    )
    
    @property
    def CORS_ORIGINS(self) -> list[str]:
        """Parse CORS origins from string."""
        return [origin.strip() for origin in self.CORS_ORIGINS_STR.split(',')]
    
    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.APP_ENV.lower() == "development"
    
    @property
    def is_production(self) -> bool:
        """Check if running in production mode."""
        return self.APP_ENV.lower() == "production"


settings = Settings()
