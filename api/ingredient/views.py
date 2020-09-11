from rest_framework import viewsets

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientServing, IngredientBrand
from .serializers import IngredientSerializer, IngredientCategorySerializer, IngredientSubCategorySerializer, IngredientBrandSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientBrandViewSet(viewsets.ModelViewSet):
    queryset = IngredientBrand.objects.all()
    serializer_class = IngredientBrandSerializer


class IngredientCategoryViewSet(viewsets.ModelViewSet):
    queryset = IngredientCategory.objects.all()
    serializer_class = IngredientCategorySerializer


class IngredientSubCategoryViewSet(viewsets.ModelViewSet):
    queryset = IngredientSubCategory.objects.all()
    serializer_class = IngredientSubCategorySerializer
