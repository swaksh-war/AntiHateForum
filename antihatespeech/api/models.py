from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, default='None', unique = True)
    password = models.CharField(max_length=255, default='1234')

    def __str__(self):
        return self.username

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title  = models.CharField(max_length=500, default='No title')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField()

    def __str__(self):
        return f"{self.comment} - {self.post}"

                                
