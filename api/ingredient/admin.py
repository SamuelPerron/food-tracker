from django.contrib import admin

from .models import Ingredient, IngredientCategory, IngredientSubCategory, IngredientBrand, IngredientServing

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
    

@admin.register(IngredientServing)
class IngredientServingAdmin(admin.ModelAdmin):
    # Hide page from admin
    def get_model_perms(self, request):
        return {}
