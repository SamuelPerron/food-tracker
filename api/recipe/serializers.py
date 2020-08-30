from rest_framework import serializers

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeStep, RecipeIngredient
from ..ingredient.serializers import IngredientServingSerializer, SlimIngredientSerializer
from ..user.serializers import AuthorSerializer
from ..nutritional_values.serializers import NutritionalValuesSerializer


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
    ingredient = SlimIngredientSerializer()
    serving = IngredientServingSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity', 'serving']


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['order', 'content']
        order = 'order'


class RecipeSerializer(serializers.ModelSerializer):
    category = RecipeSubCategorySerializer()
    author = AuthorSerializer()
    ingredients = RecipeIngredientSerializer(many=True)
    steps = RecipeStepSerializer(many=True)
    nutritional_values = NutritionalValuesSerializer()

    class Meta:
        model = Recipe
        fields = '__all__'
