"""
Item model — a simple owned resource demonstrating full CRUD.
"""
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Item(models.Model):
    """
    A generic item owned by a user.

    Fields
    ------
    title       : short display name
    description : optional long-form body
    owner       : FK to the user who created this item
    created_at  : auto-set on creation
    updated_at  : auto-updated on every save
    """

    title = models.CharField(_("title"), max_length=255, db_index=True)
    description = models.TextField(_("description"), blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name=_("owner"),
    )
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    class Meta:
        verbose_name = _("item")
        verbose_name_plural = _("items")
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["owner", "-created_at"]),
        ]

    def __str__(self):
        return self.title
