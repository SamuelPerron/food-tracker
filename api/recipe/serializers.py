from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeStep, RecipeIngredient
from ..ingredient.serializers import IngredientServingSerializer, SlimIngredientSerializer
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


class RecipeIngredientSerializer(serializers.HyperlinkedModelSerializer):
    serving = IngredientServingSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity', 'serving']


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = ['order', 'content']
        order = 'order'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['pk', 'username']


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, required=False)
    steps = RecipeStepSerializer(many=True)
    nutritional_values = NutritionalValuesSerializer(required=False, read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    # def create(self, validated_data):
    #     author = get_user_model().objects.get(pk=validated_data['author']['pk'])
    #     raise ValueError(author.username)
    #     data_for_creation = {
    #         'author': author,
    #         'category_id': validated_data['category']['id'],
    #         'name': validated_data['name'],
    #         'preparation_time': validated_data['preparation_time'],
    #         'servings': validated_data['servings'],
    #     }
    #     recipe = Recipe(**data_for_creation)
    #     return recipe


class RecipeBookmarkSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = Recipe
        fields = ['pk', 'name', 'author']
