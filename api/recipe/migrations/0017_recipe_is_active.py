# Generated by Django 3.1 on 2020-09-14 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0016_auto_20200914_1927'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='is_active',
            field=models.BooleanField(blank=True, default=True),
        ),
    ]
