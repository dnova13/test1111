from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    SECRET_KEY: str = "dev-secret-key-please-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    DATABASE_URL: str = "sqlite:///./app.db"

    PROJECT_NAME: str = "FastAPI Boilerplate"
    API_V1_STR: str = "/api/v1"

    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost", "http://localhost:3000", "http://localhost:8080"]


settings = Settings()
