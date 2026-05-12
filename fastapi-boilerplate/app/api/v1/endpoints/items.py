from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.core.deps import get_current_active_user, get_current_admin_user, get_db
from app.models.user import User
from app.schemas.item import ItemCreate, ItemRead, ItemUpdate

router = APIRouter()


@router.get("/", response_model=list[ItemRead])
def read_items(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> list:
    if current_user.is_admin:
        return crud.item.get_multi(db, skip=skip, limit=limit)
    return crud.item.get_multi_by_owner(db, owner_id=current_user.id, skip=skip, limit=limit)


@router.post("/", response_model=ItemRead, status_code=status.HTTP_201_CREATED)
def create_item(
    item_in: ItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> object:
    return crud.item.create_with_owner(db, obj_in=item_in, owner_id=current_user.id)


@router.get("/{item_id}", response_model=ItemRead)
def read_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> object:
    db_item = crud.item.get(db, id=item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if not current_user.is_admin and db_item.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    return db_item


@router.patch("/{item_id}", response_model=ItemRead)
def update_item(
    item_id: int,
    item_in: ItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> object:
    db_item = crud.item.get(db, id=item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if not current_user.is_admin and db_item.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    return crud.item.update(db, db_obj=db_item, obj_in=item_in)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
) -> None:
    db_item = crud.item.get(db, id=item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if not current_user.is_admin and db_item.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    crud.item.remove(db, id=item_id)
