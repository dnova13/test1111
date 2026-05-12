"""
Serializers for the accounts app.
"""
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


# ---------------------------------------------------------------------------
# User serializers
# ---------------------------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    """Read-only public representation of a user."""

    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "avatar",
            "is_staff",
            "is_active",
            "date_joined",
        ]
        read_only_fields = ["id", "date_joined", "full_name"]


class UserUpdateSerializer(serializers.ModelSerializer):
    """Allows a user to update their own profile (no password, no privilege escalation)."""

    class Meta:
        model = User
        fields = ["first_name", "last_name", "avatar"]


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    """Admin-only serializer — can flip is_staff / is_active flags."""

    class Meta:
        model = User
        fields = ["first_name", "last_name", "avatar", "is_staff", "is_active"]


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------

class RegisterSerializer(serializers.ModelSerializer):
    """Validate and create a new user account."""

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
        validators=[validate_password],
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "password_confirm"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords do not match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


# ---------------------------------------------------------------------------
# Login / JWT
# ---------------------------------------------------------------------------

class LoginSerializer(TokenObtainPairSerializer):
    """
    Extends simplejwt's pair serializer to also return the user payload
    in the same response body.
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        # Append user info to the token response
        data["user"] = UserSerializer(self.user).data
        return data


# ---------------------------------------------------------------------------
# Password change
# ---------------------------------------------------------------------------

class ChangePasswordSerializer(serializers.Serializer):
    """Endpoint for authenticated users to change their own password."""

    old_password = serializers.CharField(
        required=True, style={"input_type": "password"}
    )
    new_password = serializers.CharField(
        required=True,
        style={"input_type": "password"},
        validators=[validate_password],
    )
    new_password_confirm = serializers.CharField(
        required=True, style={"input_type": "password"}
    )

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def validate(self, attrs):
        if attrs["new_password"] != attrs["new_password_confirm"]:
            raise serializers.ValidationError(
                {"new_password_confirm": "New passwords do not match."}
            )
        return attrs

    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user
