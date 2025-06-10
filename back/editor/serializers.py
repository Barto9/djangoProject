from rest_framework import serializers
from .models import GDD, Note, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class NoteSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Note
        fields = [
            'id', 'gdd', 'template', 'parent', 'title', 'content', 'tags',
            'igdb_game_ref', 'created_at', 'updated_at', 'children'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'children']

class GDDSerializer(serializers.ModelSerializer):
    class Meta:
        model = GDD
        fields = ['id', 'owner', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']