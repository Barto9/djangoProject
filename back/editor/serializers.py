from rest_framework import serializers
from .models import GDD

class GDDs(serializers.ModelSerializer):
    
    class Meta:
        model = GDD
        fields = ['owner', 'name', 'description', 'created_at', 'updated_at']

