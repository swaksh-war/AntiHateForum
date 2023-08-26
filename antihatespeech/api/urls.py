from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('create_post/', views.create_post, name='create_post'),
    path('get_post/', views.get_posts, name='get_post'),
    path('get_comments/<int:pk>/', views.get_comments_for_post, name='get_comments'),
    path('post_comment/', views.post_comment, name='post_comment'),
    path('get_post/<int:pk>/', views.get_single_post, name='get_single_post')
]
