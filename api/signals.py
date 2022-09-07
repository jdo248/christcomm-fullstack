from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Account

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(
            user=instance,
            name=instance.username,
            bio="Hey there!",
            avatar=f'https://www.gravatar.com/avatar/{instance.email}?d=identicon&s=50',
            status='Member'
        )


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.account.save()