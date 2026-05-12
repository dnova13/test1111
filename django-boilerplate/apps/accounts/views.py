"""
Views for the accounts app.

Auth endpoints:
  POST   /api/v1/auth/register      — create account, returns tokens + user
  POST   /api/v1/auth/login         — obtain JWT pair + user
  POST   /api/v1/auth/refresh       — refresh access token
  POST   /api/v1/auth/logout        — blacklist refresh token
  GET    /api/v1/auth/me            — current user profile
  PATCH  /api/v1/auth/me            — update own profile
  POST   /api/v1/auth/me/password   — change own password

Users CRUD (admin only, or own profile):
  GET    /api/v1/users/             — list users (admin)
  POST   /api/v1/users/             — create user (admin)
  GET    /api/v1/users/<id>/        — retrieve (admin or self)
  PATCH  /api/v1/users/<id>/        — update (admin or self)
  DELETE /api/v1/users/<id>/        — delete (admin only)
"""
from django.contrib.auth import get_user_model
from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .permissions import IsAdminUser, IsOwnerOrAdmin
from .serializers import (
    AdminUserUpdateSerializer,
    ChangePasswordSerializer,
    LoginSerializer,
    RegisterSerializer,
    UserSerializer,
    UserUpdateSerializer,
)

User = get_user_model()


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------

class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/auth/register

    Creates a new user account and returns JWT tokens plus the user object.
    """

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user, context={"request": request}).data,
            },
            status=status.HTTP_201_CREATED,
        )


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------

class LoginView(APIView):
    """
    POST /api/v1/auth/login

    Accepts {email, password}, returns {access, refresh, user}.
    """

    permission_classes = [AllowAny]
    serializer_class = LoginSerializer  # for schema generation tools

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


# ---------------------------------------------------------------------------
# Refresh (thin wrapper — simplejwt handles it)
# ---------------------------------------------------------------------------

class RefreshView(TokenRefreshView):
    """
    POST /api/v1/auth/refresh

    Accepts {refresh}, returns new {access} (and rotated {refresh} if configured).
    """


# ---------------------------------------------------------------------------
# Logout
# ---------------------------------------------------------------------------

class LogoutView(APIView):
    """
    POST /api/v1/auth/logout

    Blacklists the supplied refresh token so it can no longer be used.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            return Response(
                {"detail": "Token is invalid or already blacklisted."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)


# ---------------------------------------------------------------------------
# Me (current user)
# ---------------------------------------------------------------------------

class MeView(generics.RetrieveUpdateAPIView):
    """
    GET   /api/v1/auth/me  — current user profile
    PATCH /api/v1/auth/me  — update first_name, last_name, avatar
    """

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return UserUpdateSerializer
        return UserSerializer

    # Disallow full PUT to prevent accidental data wipes
    http_method_names = ["get", "patch", "head", "options"]


class ChangePasswordView(APIView):
    """
    POST /api/v1/auth/me/password

    Requires {old_password, new_password, new_password_confirm}.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Password changed successfully."},
            status=status.HTTP_200_OK,
        )


# ---------------------------------------------------------------------------
# Users CRUD (ViewSet)
# ---------------------------------------------------------------------------

class UserViewSet(viewsets.ModelViewSet):
    """
    /api/v1/users/

    - list, retrieve   → admin OR the user themselves
    - create           → admin only
    - update, partial  → admin OR the user themselves (admins can flip flags)
    - destroy          → admin only
    """

    queryset = User.objects.all().order_by("-date_joined")
    owner_field = None  # the object *is* the user

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminUserUpdateSerializer if self.request.method in ("PUT", "PATCH") else UserSerializer
        return UserUpdateSerializer if self.request.method in ("PUT", "PATCH") else UserSerializer

    def get_permissions(self):
        if self.action in ("list", "create", "destroy"):
            return [IsAdminUser()]
        # retrieve / update / partial_update — owner or admin
        return [IsOwnerOrAdmin()]

    def get_queryset(self):
        # Non-admin users can only see themselves
        if not self.request.user.is_staff:
            return User.objects.filter(pk=self.request.user.pk)
        return super().get_queryset()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance == request.user:
            return Response(
                {"detail": "You cannot delete your own account via this endpoint."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def activate(self, request, pk=None):
        """POST /api/v1/users/<id>/activate/ — re-activate a deactivated account."""
        user = self.get_object()
        user.is_active = True
        user.save(update_fields=["is_active"])
        return Response(UserSerializer(user).data)

    @action(detail=True, methods=["post"], permission_classes=[IsAdminUser])
    def deactivate(self, request, pk=None):
        """POST /api/v1/users/<id>/deactivate/ — deactivate an account."""
        user = self.get_object()
        if user == request.user:
            return Response(
                {"detail": "You cannot deactivate yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user.is_active = False
        user.save(update_fields=["is_active"])
        return Response(UserSerializer(user).data)
