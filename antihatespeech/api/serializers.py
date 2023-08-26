from rest_framework import serializers
from .models import CustomUser, Post, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email','password']
        extra_kwargs = {'password' : {'write_only' : True}}
    
    def create(self, validated_data):
        user = CustomUser(username=validated_data['username'],
                          email = validated_data['email']
                          )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at']
    
    def create(self, validated_data):
        user = self.context['request'].user
        post = Post(user=user,title=validated_data['title'], content=validated_data['content'])
        post.save()
        return post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
    
    def create(self, validated_data):
        user = self.context['request'].user
        comment = Comment(user=user, post=validated_data['post'], comment=validated_data['comment'])
        comment.save()
        return comment
