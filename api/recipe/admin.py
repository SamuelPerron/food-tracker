from django.contrib import admin
from django.forms import ModelForm

from .models import RecipeCategory, RecipeSubCategory, Recipe, RecipeIngredient, RecipeStep
from ..ingredient.models import IngredientServing

@admin.register(RecipeCategory)
class RecipeCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(RecipeSubCategory)
class RecipeSubCategoryAdmin(admin.ModelAdmin):
    pass


class RecipeIngredientInline(admin.TabularInline):
    model = RecipeIngredient
    min_num = 1
    extra = 0


class RecipeStepInline(admin.TabularInline):
    model = RecipeStep
    min_num = 1
    extra = 0


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    inlines = (RecipeIngredientInline, RecipeStepInline)
