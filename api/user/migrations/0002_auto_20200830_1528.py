# Generated by Django 3.1 on 2020-08-30 15:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ingredient', '0009_auto_20200830_1514'),
        ('authtoken', '0002_auto_20160226_1747'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipe', '0005_auto_20200830_1514'),
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bookmarked_recipes', models.ManyToManyField(to='recipe.Recipe')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
