from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api.user.views import UserViewSet


# Routers
router = routers.DefaultRouter()

router.register(r'users', UserViewSet)

# Routes
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
