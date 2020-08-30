# Generated by Django 3.1 on 2020-08-30 04:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0002_ingredientbrand_ingredientcategory_ingredientserving_ingredientsubcategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='brand',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='ingredient.ingredientbrand'),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ingredient.ingredientsubcategory'),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='image',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='name',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='ingredientbrand',
            name='image',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='ingredientbrand',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='ingredientcategory',
            name='name',
            field=models.CharField(max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='ingredientserving',
            name='custom_name',
            field=models.CharField(max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='ingredientserving',
            name='grams',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='ingredientserving',
            name='ingredient',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ingredient.ingredient'),
        ),
        migrations.AddField(
            model_name='ingredientserving',
            name='milliliters',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='ingredientsubcategory',
            name='name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='ingredientsubcategory',
            name='parent_category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ingredient.ingredientcategory'),
        ),
    ]