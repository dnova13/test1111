"""
Custom DRF permissions for the accounts app.
"""
from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminUser(BasePermission):
    """
    Allows access only to admin (staff) users.
    """

    message = "Only admin users are allowed to perform this action."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsOwnerOrAdmin(BasePermission):
    """
    Object-level permission: allow access if the requesting user owns the
    object OR is a staff member.

    The view's object must expose a field that identifies the owner.
    By default the field name is ``owner``; override ``owner_field`` on the
    view to use a different field.
    """

    message = "You must be the owner of this object or an admin."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        # Support objects that *are* the user (e.g. User model itself)
        if obj == request.user:
            return True
        # Support objects with an owner FK
        owner_field = getattr(view, "owner_field", "owner")
        owner = getattr(obj, owner_field, None)
        return owner == request.user


class IsOwnerOrAdminOrReadOnly(BasePermission):
    """
    Read-only for everyone authenticated; write access only for the owner or admin.
    """

    message = "You must be the owner of this object or an admin to modify it."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_staff:
            return True
        if obj == request.user:
            return True
        owner_field = getattr(view, "owner_field", "owner")
        owner = getattr(obj, owner_field, None)
        return owner == request.user
