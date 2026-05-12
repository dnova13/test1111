"""
Root URL configuration.
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from apps.accounts.urls import auth_urlpatterns, users_urlpatterns

urlpatterns = [
    path("admin/", admin.site.urls),

    # Authentication: /api/v1/auth/
    path("api/v1/auth/", include((auth_urlpatterns, "auth"))),

    # Users CRUD: /api/v1/users/
    path("api/v1/", include((users_urlpatterns, "users"))),

    # Items CRUD: /api/v1/items/
    path("api/v1/", include("apps.items.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
