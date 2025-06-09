from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class GDD(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gdds")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class NoteTemplate(models.Model):
    gdd = models.ForeignKey(GDD, on_delete=models.CASCADE, related_name="templates")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    template_content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tag(models.Model):
    gdd = models.ForeignKey(GDD, on_delete=models.CASCADE, related_name="tags")
    name = models.CharField(max_length=100)


class Note(models.Model):
    gdd = models.ForeignKey(GDD, on_delete=models.CASCADE, related_name="notes")
    template = models.ForeignKey(NoteTemplate, on_delete=models.SET_NULL, null=True, blank=True)
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, related_name="children")  # foldery hierarchiczne
    title = models.CharField(max_length=255)
    content = models.TextField()  # Markdown lub RichText obsługiwany po stronie frontendu
    tags = models.ManyToManyField(Tag, through='NoteTag', related_name="notes")
    igdb_game_ref = models.JSONField(null=True, blank=True)  # dane z IGDB
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class NoteTag(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)


class NoteLink(models.Model):
    from_note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="outgoing_links")
    to_note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="incoming_links")
    preview = models.BooleanField(default=True)