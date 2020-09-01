from rest_framework import viewsets

from .models import Recipe, RecipeCategory, RecipeSubCategory
from .serializers import RecipeSerializer, RecipeCategorySerializer, RecipeSubCategorySerializer
from django_filters.rest_framework import DjangoFilterBackend


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['slug', 'author']


class RecipeCategoryViewSet(viewsets.ModelViewSet):
    queryset = RecipeCategory.objects.all()
    serializer_class = RecipeCategorySerializer


class RecipeSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = RecipeSubCategory.objects.all()
    serializer_class = RecipeSubCategorySerializer
