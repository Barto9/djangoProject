from django.urls import path
from .views import NoteListCreateView, NoteDetailView, NoteHierarchyView, GDDListCreateView

urlpatterns = [
    path('editor/gdds/', GDDListCreateView.as_view(), name='gdd-list-create'),
    path('gdd/<int:gdd_id>/notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('gdd/<int:gdd_id>/notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('gdd/<int:gdd_id>/notes-hierarchy/', NoteHierarchyView.as_view(), name='note-hierarchy'),
]