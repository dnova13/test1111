"""
Development settings — SQLite, DEBUG=True, relaxed security.
"""
from .base import *  # noqa: F401, F403
from .base import BASE_DIR, env

DEBUG = True

SECRET_KEY = env(
    "SECRET_KEY",
    default="django-insecure-dev-secret-key-do-not-use-in-production",
)

ALLOWED_HOSTS = ["*"]

# ---------------------------------------------------------------------------
# Database — SQLite for local development
# ---------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ---------------------------------------------------------------------------
# Email — console backend during development
# ---------------------------------------------------------------------------
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# ---------------------------------------------------------------------------
# CORS — allow all origins locally
# ---------------------------------------------------------------------------
CORS_ALLOW_ALL_ORIGINS = True

# ---------------------------------------------------------------------------
# Debug toolbar / other dev-only apps can be added here
# ---------------------------------------------------------------------------
INTERNAL_IPS = ["127.0.0.1"]
