from rest_framework import serializers
from .models import GDD, Note, Tag, NoteTemplate, NoteTag, NoteLink

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class NoteTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteTemplate
        fields = ['id', 'name', 'description', 'template_content']

class NoteSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    template = NoteTemplateSerializer(read_only=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = [
            'id', 'gdd', 'template', 'parent', 'title', 'content', 'tags',
            'igdb_game_ref', 'created_at', 'updated_at', 'children'
        ]
        read_only_fields = ['id', 'gdd', 'created_at', 'updated_at', 'children']  # <-- add 'gdd' here

    def get_children(self, obj):
        # Recursively serialize children for hierarchy
        children = obj.children.all()
        return NoteSerializer(children, many=True, context=self.context).data

class NoteListSerializer(serializers.ModelSerializer):
    # For listing notes in a hierarchy (folders and notes)
    tags = TagSerializer(many=True, read_only=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = [
            'id', 'parent', 'title', 'content', 'tags', 'children'
        ]

    def get_children(self, obj):
        children = obj.children.all()
        return NoteListSerializer(children, many=True, context=self.context).data

class GDDSerializer(serializers.ModelSerializer):
    class Meta:
        model = GDD
        fields = ['id', 'owner', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']