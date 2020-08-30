from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from api.user.views import UserViewSet
from api.ingredient.views import IngredientViewSet


# Routers
router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'ingredients', IngredientViewSet)

# Routes
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('login/', obtain_auth_token, name='login'),
]
