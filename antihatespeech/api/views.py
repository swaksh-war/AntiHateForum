from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .models import CustomUser, Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated

'''
Below is the method to make a new registration of user with the
posted data from react endpoint
'''
@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
Below is the method to make a login with the user with either
email or username
'''
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            
            except ObjectDoesNotExist:
                pass
        
        if not user:
            user = authenticate(username = username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token' : token.key}, 
                            status=status.HTTP_200_OK)
        return Response({'error' : 'Invalid Credentials'}, 
                        status= status.HTTP_401_UNAUTHORIZED)

'''
Below method is the logout method for the user both login and
logout is done using JSON web tokens.
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response({'Message' : 'You are successfully loggedout'}, status=status.HTTP_200_OK)
    return Response({'Message' : 'Error While Logging out'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

'''
Below Method is used for creating new posts that will be checked for the 
hatespeech detection and if approved it will be stored in the server
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data = request.data, context={'request' : request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

'''
Below Method is used for get all the posts to show in the frontend
'''
@api_view(['GET'])
def get_posts(request):
    if request.method == 'GET':
        all_posts = Post.objects.all()
        serializer = PostSerializer(all_posts, many=True)
        custom_response = {'message': 'All Posts Retrieved', 'posts': serializer.data}
        return Response(custom_response, status=status.HTTP_200_OK)
    return Response({'message': 'There was an error fetching the API'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)

'''
Below method is used to retrieve 1 single post based on the id of the post
'''
@api_view(['GET'])
def get_single_post(request, pk):
    if request.method == 'GET':
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, many=False)
        user_for_the_post = post.user.username
        custom_response = {'message' : 'Post Retrieved Successfully', 'post' : serializer.data, 'user' : user_for_the_post}
        return Response(custom_response, status=status.HTTP_200_OK)
    return Response({'message' : 'Error occured while retrieving the data'}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)

'''
Creating a method to post a comment and store it in the database
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request):
    if request.method == 'POST':
        user = request.user
        post = request.data.get('post')
        comment = request.data.get('comment')
        custom_data = {
            'user' : user.id,
            'post' : post,
            'comment' : comment
        }
        serializer = CommentSerializer(data = custom_data, context={'request' : request}) #type: ignore
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''
Get all the comments for a post
'''
@api_view(['GET'])
def get_comments_for_post(request, pk):
    if request.method == 'GET':
        all_comments_for_the_post = Comment.objects.filter(post = pk)
        serializer = CommentSerializer(all_comments_for_the_post, many=True)
        custom_response = {'Message' : 'All commnets Retrieved', 'Comments' : serializer.data}
        return Response(custom_response, status=status.HTTP_200_OK)
    return Response({'Message' : "There was an error fetching the comments"}, status=status.HTTP_400_BAD_REQUEST)
