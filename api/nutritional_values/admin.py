from django.contrib import admin

from .models import NutritionalValues

class NutritionalValuesInline(admin.StackedInline):
    model = NutritionalValues
    min_num = 1
    extra = 0
