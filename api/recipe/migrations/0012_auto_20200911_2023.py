# Generated by Django 3.1 on 2020-09-11 20:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0011_recipe_slug'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='recipeingredient',
            options={'ordering': ['ingredient__category__name']},
        ),
    ]
