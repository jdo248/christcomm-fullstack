from django.contrib import admin
from .models import Account, Resource, Comment, User, Bookmark

admin.site.register(Resource)
admin.site.register(Comment)
admin.site.register(User)
admin.site.register(Account)
admin.site.register(Bookmark)