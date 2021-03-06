# Generated by Django 3.1 on 2020-08-30 15:33

from django.db import migrations

from ..datas import CATEGORIES


def import_recipe_categories(apps, schema_editor):
    Category = apps.get_model('recipe', 'RecipeCategory')
    SubCategory = apps.get_model('recipe', 'RecipeSubCategory')
    for category in CATEGORIES:
        new_category = Category.objects.create(name=category)
        for sub_category in CATEGORIES[category]:
            SubCategory.objects.create(parent_category=new_category, name=sub_category)


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0005_auto_20200830_1514'),
    ]

    operations = [
        migrations.RunPython(import_recipe_categories),
    ]
