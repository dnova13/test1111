"""
Serializers for the items app.
"""
from rest_framework import serializers

from apps.accounts.serializers import UserSerializer
from .models import Item


class ItemSerializer(serializers.ModelSerializer):
    """Full serializer for reading an item (includes nested owner summary)."""

    owner = UserSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ["id", "title", "description", "owner", "created_at", "updated_at"]
        read_only_fields = ["id", "owner", "created_at", "updated_at"]


class ItemWriteSerializer(serializers.ModelSerializer):
    """
    Serializer used for creating / updating items.
    The owner is set automatically from the request user.
    """

    class Meta:
        model = Item
        fields = ["id", "title", "description", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        # Inject the owner from the request context
        request = self.context.get("request")
        validated_data["owner"] = request.user
        return super().create(validated_data)
