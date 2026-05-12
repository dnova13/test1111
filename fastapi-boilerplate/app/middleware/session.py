from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from app.core.config import settings


def add_session_middleware(app: FastAPI) -> None:
    app.add_middleware(
        SessionMiddleware,
        secret_key=settings.SECRET_KEY,
        max_age=60 * 60 * 24 * 7,  # 7 days in seconds
        https_only=False,
        same_site="lax",
    )
