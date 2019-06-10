from django.db import models
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError


class Folder(models.Model):
    name = models.CharField(max_length=256)
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="folders",
    )

    class Meta:
        ordering = ["name"]
        unique_together = [["name", "created_by"]]

    def __str__(self):
        return f"{self.name} - {self.created_by}"


class Paste(models.Model):
    title = models.CharField(max_length=256, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField(default=None)
    public = models.BooleanField(default=True)
    language = models.CharField(max_length=128, null=True)
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

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if self.folder is not None and self.created_by is None:
            raise IntegrityError(
                'Paste can not be assigned a folder without created_by.')
        else:
            return super().save(*args, **kwargs)

    def __str__(self):
        if self.title:
            return self.title
        return "Untitled Paste"
