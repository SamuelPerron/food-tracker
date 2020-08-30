from rest_framework import viewsets

from .models import Recipe, RecipeCategory, RecipeSubCategory
from .serializers import RecipeSerializer, RecipeCategorySerializer, RecipeSubCategorySerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class RecipeCategoryViewSet(viewsets.ModelViewSet):
    queryset = RecipeCategory.objects.all()
    serializer_class = RecipeCategorySerializer


class RecipeSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = RecipeSubCategory.objects.all()
    serializer_class = RecipeSubCategorySerializer
