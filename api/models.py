from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32, default='')
    bio = models.TextField(max_length=500, default="Hey there!")
    avatar = models.URLField(default=None)
    status = models.CharField(max_length=16, blank=True, default='')

    def __str__(self):
        return f'{self.user} account'

class Resource(models.Model):
    TOPIC_CHOICES = (
    ("1", "BSC PM"),
    ("2", "BSC CSM"),
    ("3", "BCOM"),
    ("4", "BBA"),
    ("5", "BCA"),
    ("6", "BA JPE"),
    ("7", "BSC PSY CS"),
    ("8", " BSC CM"),
)
    subject = models.CharField(max_length=128)
    content = models.TextField()
    creator = models.ForeignKey('User', on_delete=models.CASCADE, related_name='creator_entries')
    topic = models.CharField(max_length=32, choices=TOPIC_CHOICES, default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    replyCount = models.IntegerField(default=0)

    def __str__(self):
        return f'Resource {self.subject}  is created by {self.creator.username}.'


class Comment(models.Model):
    content = models.TextField()
    resource = models.ForeignKey('Resource', on_delete=models.CASCADE, related_name='thread_posts')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey('User', on_delete=models.CASCADE, related_name='creator_posts')

    def __str__(self):
        return f'Comment of {self.resource.subject} is posted by {self.creator.username}.'


class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_pin", verbose_name="pinned by")
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name="thread_pin")

    def __str__(self):
        return f"{self.user.username} bookmarked entry: {self.resource.id}"





