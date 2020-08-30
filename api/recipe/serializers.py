from rest_framework import serializers

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeStep, RecipeIngredient
from ..ingredient.serializers import IngredientSerializer, IngredientServingSerializer
from ..user.serializers import AuthorSerializer


class RecipeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeCategory
        fields = '__all__'


class RecipeSubCategorySerializer(serializers.ModelSerializer):
    parent_category = RecipeCategorySerializer()

    class Meta:
        model = RecipeSubCategory
        fields = '__all__'


class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    serving = IngredientServingSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['pk', 'ingredient', 'quantity', 'serving']


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['pk', 'order', 'content']
        order = 'order'


class RecipeSerializer(serializers.ModelSerializer):
    category = RecipeSubCategorySerializer()
    author = AuthorSerializer()
    ingredients = RecipeIngredientSerializer(many=True)
    steps = RecipeStepSerializer(many=True)

    class Meta:
        model = Recipe
        fields = '__all__'
