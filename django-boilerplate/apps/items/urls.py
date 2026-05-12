"""
URL patterns for the items app.

Mounted at /api/v1/ in config/urls.py → exposes /api/v1/items/
"""
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ItemViewSet

router = DefaultRouter()
router.register(r"items", ItemViewSet, basename="item")

urlpatterns = [
    path("", include(router.urls)),
]
