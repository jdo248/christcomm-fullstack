from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('entries/', views.getEntries, name='entries'),
    path('entries/<int:thread_id>', views.getThread, name='resource'),
    path('entries/<int:thread_id>/posts', views.getPosts, name='comments'),
    path('topEntries/', views.getTopEntries, name="topEntries"),
    path('entries/topic/<int:topic_id>', views.getEntriesTopic, name='getEntriesTopic'),
    path('createThread/', views.createThread, name='createThread'),
    path('addComment/', views.createPost, name='createPost'),
    path('bookmark/', views.bookmark, name='bookmark'),
    path('bookmark/<int:thread_id>&&<int:user_id>', views.checkBookmarked, name='checkBookmarked'),
    path('bookmark/<int:user_id>', views.getBookmarkedEntries, name="getBookmarkedEntries"),
    path('profile/<int:user_id>', views.account, name='account'),

]
