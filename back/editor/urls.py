from django.urls import path, include
from rest_framework.routers import DefaultRouter
from editor.views import GddForUser

router = DefaultRouter()
router.register(r'gdds', GddForUser, basename='gdd')

urlpatterns = [
    path('', include(router.urls)),
]
