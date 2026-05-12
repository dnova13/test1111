"""
Views for the items app.

Endpoints (all require JWT authentication):
  GET    /api/v1/items/          — list items (own items; admin sees all)
  POST   /api/v1/items/          — create item (owner = request.user)
  GET    /api/v1/items/<id>/     — retrieve item (owner or admin)
  PUT    /api/v1/items/<id>/     — full update (owner or admin)
  PATCH  /api/v1/items/<id>/     — partial update (owner or admin)
  DELETE /api/v1/items/<id>/     — delete (owner or admin)

Query parameters for list:
  ?search=<text>   — filter title / description
  ?ordering=<field> — order by title, created_at, updated_at (prefix - for desc)
  ?owner=<id>      — filter by owner pk (admin only)
"""
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated

from apps.accounts.permissions import IsOwnerOrAdmin
from core.pagination import StandardResultsPagination

from .models import Item
from .serializers import ItemSerializer, ItemWriteSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """
    Full CRUD ViewSet for Item, protected by JWT authentication.

    - Regular users see and modify only their own items.
    - Admin users can see and modify all items and filter by ?owner=<id>.
    """

    pagination_class = StandardResultsPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "description"]
    ordering_fields = ["title", "created_at", "updated_at"]
    ordering = ["-created_at"]
    owner_field = "owner"  # used by IsOwnerOrAdmin

    def get_permissions(self):
        if self.action in ("list", "create"):
            return [IsAuthenticated()]
        return [IsOwnerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        qs = Item.objects.select_related("owner")

        if user.is_staff:
            # Admin: optionally filter by ?owner=<id>
            owner_id = self.request.query_params.get("owner")
            if owner_id:
                qs = qs.filter(owner_id=owner_id)
        else:
            # Regular users only see their own items
            qs = qs.filter(owner=user)

        return qs

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return ItemWriteSerializer
        return ItemSerializer

    def perform_create(self, serializer):
        # owner is injected by ItemWriteSerializer.create() via request context
        serializer.save()
