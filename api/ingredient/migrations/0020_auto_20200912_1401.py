# Generated by Django 3.1 on 2020-09-12 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0019_ingredientserving_for_list_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='name',
            field=models.CharField(max_length=150, null=True, unique=True),
        ),
    ]
