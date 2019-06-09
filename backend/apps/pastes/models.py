from django.db import models
from django.contrib.auth import get_user_model


class Folder(models.Model):
    name = models.CharField(max_length=256)
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="folders",
    )

    def __str__(self):
        return f"{self.name} - f{self.created_by}"


class Paste(models.Model):
    title = models.CharField(max_length=256, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    public = models.BooleanField(default=True)
    folder = models.ForeignKey(
        Folder,
        on_delete=models.CASCADE,
        related_name="pastes",
        null=True,
        blank=True,
    )
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="pastes",
        null=True,
        blank=True,
    )

    def __str__(self):
        if self.title:
            return self.title
        return "Untitled Paste"
