# Generated by Django 3.1 on 2020-08-30 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0004_auto_20200830_0505'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ingredientbrand',
            options={'verbose_name': 'brand'},
        ),
        migrations.AlterModelOptions(
            name='ingredientcategory',
            options={'verbose_name': 'category', 'verbose_name_plural': 'categories'},
        ),
        migrations.AlterModelOptions(
            name='ingredientsubcategory',
            options={'verbose_name': 'sub-category', 'verbose_name_plural': 'sub-categories'},
        ),
        migrations.RemoveField(
            model_name='ingredientserving',
            name='ingredient',
        ),
        migrations.AddField(
            model_name='ingredientserving',
            name='ingredient',
            field=models.ManyToManyField(null=True, to='ingredient.Ingredient'),
        ),
    ]