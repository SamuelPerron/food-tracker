from rest_framework import viewsets

from .models import Ingredient, IngredientCategory, IngredientSubCategory
from .serializers import IngredientSerializer, IngredientCategorySerializer, IngredientSubCategorySerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientCategoryViewSet(viewsets.ModelViewSet):
    queryset = IngredientCategory.objects.all()
    serializer_class = IngredientCategorySerializer


class IngredientSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = IngredientSubCategory.objects.all()
    serializer_class = IngredientSubCategorySerializer
