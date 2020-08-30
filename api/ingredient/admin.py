from django.contrib import admin

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientBrand

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    pass


@admin.register(IngredientCategory)
class IngredientCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(IngredientSubCategory)
class IngredientSubCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(IngredientBrand)
class IngredientBrandAdmin(admin.ModelAdmin):
    pass
