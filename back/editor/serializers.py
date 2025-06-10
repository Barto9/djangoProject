from rest_framework import serializers
from .models import GDD

class GDDs(serializers.ModelSerializer):
    class Meta:
        model = GDD
        fields = ['id', 'owner', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']