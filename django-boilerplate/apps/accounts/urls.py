"""
URL patterns for the accounts app.

Mounted in config/urls.py:
  /api/v1/auth/  -> auth_urlpatterns  (register, login, refresh, logout, me)
  /api/v1/       -> users_urlpatterns (users CRUD via router)
"""
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ChangePasswordView,
    LoginView,
    LogoutView,
    MeView,
    RefreshView,
    RegisterView,
    UserViewSet,
)

# Auth-specific patterns — included under /api/v1/auth/
auth_urlpatterns = [
    path("register", RegisterView.as_view(), name="auth-register"),
    path("login", LoginView.as_view(), name="auth-login"),
    path("refresh", RefreshView.as_view(), name="auth-refresh"),
    path("logout", LogoutView.as_view(), name="auth-logout"),
    path("me", MeView.as_view(), name="auth-me"),
    path("me/password", ChangePasswordView.as_view(), name="auth-change-password"),
]

# Users CRUD — included under /api/v1/
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
users_urlpatterns = router.urls
