from django.db import models

from django.contrib.auth.models import User
from ..ingredient.models import Ingredient, IngredientServing


class RecipeCategory(models.Model):
    name = models.CharField(max_length=25, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'


class RecipeSubCategory(models.Model):
    name = models.CharField(max_length=50, null=True)
    parent_category = models.ForeignKey(RecipeCategory, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.parent_category.name} - {self.name}'

    class Meta:
        verbose_name = 'sub-category'
        verbose_name_plural = 'sub-categories'


class Recipe(models.Model):
    name = models.CharField(max_length=150, null=True)
    description = models.TextField(blank=True)
    image = models.ImageField(blank=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(RecipeSubCategory, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class RecipeStep(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, related_name='steps')
    order = models.IntegerField(default=1, blank=False)
    content = models.TextField(blank=False)

    def __str__(self):
        return f'{self.recipe.name} - Step {self.order}'


class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, related_name='ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    serving = models.ForeignKey(IngredientServing, on_delete=models.CASCADE)
    quantity = models.FloatField(blank=False)

    def __str__(self):
        return f'{self.recipe.name} - {self.ingredient.name}'
