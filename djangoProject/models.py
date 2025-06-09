from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    created = models.DateTimeField(auto_now_add=True, db_column='created_at')
    updated = models.DateTimeField(auto_now=True, db_column='updated_at')
    class Meta:
        db_table = 'notes'
    def __str__(self):
        return self.title