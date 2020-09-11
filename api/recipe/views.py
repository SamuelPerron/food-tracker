from rest_framework import viewsets

from .models import Recipe, RecipeCategory, RecipeSubCategory
from .serializers import RecipeSerializer, RecipeCategorySerializer, RecipeSubCategorySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['slug', 'author__username', 'id', 'category__name', 'category__parent_category__name']
    search_fields = ['name',]


class RecipeCategoryViewSet(viewsets.ModelViewSet):
    queryset = RecipeCategory.objects.all()
    serializer_class = RecipeCategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name']


class RecipeSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = RecipeSubCategory.objects.all()
    serializer_class = RecipeSubCategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'name', 'parent_category']
