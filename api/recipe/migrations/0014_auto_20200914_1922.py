# Generated by Django 3.1 on 2020-09-14 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0013_auto_20200913_0139'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='recipe',
            options={'ordering': ['created_at']},
        ),
        migrations.AddField(
            model_name='recipe',
            name='created_at',
            field=models.DateTimeField(editable=False, null=True),
        ),
    ]
