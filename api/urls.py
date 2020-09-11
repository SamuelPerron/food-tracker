from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from api.user.views import UserViewSet
from api.ingredient.views import IngredientViewSet, IngredientCategoryViewSet, IngredientSubCategoryViewSet, IngredientBrandViewSet
from api.recipe.views import RecipeViewSet, RecipeCategoryViewSet, RecipeSubCategoryViewSet


# Routers
router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'ingredients/brands', IngredientBrandViewSet)
router.register(r'ingredients/categories', IngredientCategoryViewSet)
router.register(r'ingredients/sub-categories', IngredientSubCategoryViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'recipes/categories', RecipeCategoryViewSet)
router.register(r'recipes/sub-categories', RecipeSubCategoryViewSet)
router.register(r'recipes', RecipeViewSet)

# Routes
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('login/', obtain_auth_token, name='login'),
]
