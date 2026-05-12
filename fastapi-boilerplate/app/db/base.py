from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Import all models here so Alembic can detect them
from app.models.user import User  # noqa: F401, E402
from app.models.item import Item  # noqa: F401, E402
