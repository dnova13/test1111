from datetime import datetime

from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    title: str | None = None
    description: str | None = None


class ItemRead(ItemBase):
    id: int
    owner_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
