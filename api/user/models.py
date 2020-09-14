from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from ..recipe.models import Recipe


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, editable=False)
    avatar = models.ImageField(blank=True, upload_to='avatars')
    bookmarked_recipes = models.ManyToManyField(Recipe, blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=get_user_model())
def create_auth_token_and_profile(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        Profile.objects.create(user=instance)


@receiver(post_save, sender=get_user_model())
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
