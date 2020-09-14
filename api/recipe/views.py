from rest_framework import viewsets
from rest_framework.response import Response

from .models import Recipe, RecipeCategory, RecipeSubCategory
from .serializers import RecipeSerializer, RecipeCategorySerializer, RecipeSubCategorySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['slug', 'author__username', 'id', 'category__name', 'category__parent_category__name', 'is_active']
    search_fields = ['name',]

    def list(self, request):
        queryset = self.filter_queryset(Recipe.objects.filter(is_active=True))
        serializer = RecipeSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        doctor = self.get_object()
        doctor.is_active = False
        doctor.save()
        return Response(data='delete success')


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
