from django.contrib import admin

from .models import NutritionalValues

@admin.register(NutritionalValues)
class NutritionalValuesAdmin(admin.ModelAdmin):
    # Hide page from admin
    def get_model_perms(self, request):
        return {}
