from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Resource, Comment, User, Bookmark, Account
from .serializers import Entrieserializer, PostSerializer, MyTokenObtainPairSerializer, RegisterSerializer, PinSerializer, ProfileSerializer
import json
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.pagination import PageNumberPagination
from django.core.exceptions import ObjectDoesNotExist


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET'])
def getEntries(request):
    paginator = PageNumberPagination()
    paginator.page_size = 15
    entries = Resource.objects.all().order_by('-updated')
    result_page = paginator.paginate_queryset(entries, request)
    serializer = Entrieserializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)
    

@api_view(['GET'])
def getThread(request, thread_id):
    try:
        resource = Resource.objects.get(pk=thread_id)
    except resource.DoesNotExist:
        content = {"The Resource does not exist."}
        return Response(content)

    resource = Resource.objects.get(pk=thread_id)
    serializer = Entrieserializer(resource, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def getPosts(request, thread_id):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    resource = Resource.objects.get(pk=thread_id)
    posts = resource.thread_posts.order_by('created').all()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True)
    
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
def createThread(request):
    data = json.loads(request.body)    
    try:
        userID =  data['creator']['user']['user_id']
    except TypeError:
        return Response(
                {"res": "Unauthenticated user"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
    subject = data['subject']
    content = data['content']
    topic = data['topic'][0]['value']

    new_thread = Resource(
        subject=subject, 
        content=content, 
        creator=User.objects.get(pk=userID),
        topic=topic
        )
    new_thread.save()
    
    serializer = Entrieserializer(new_thread, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createPost(request):
    data = json.loads(request.body)
    try:
        userID =  data['creator']['user']['user_id']
    except TypeError:
        return Response(
                {"res": "Unauthenticated user"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
    print(data)
    content = data['content']
    threadID = data['resource']
    resource = Resource.objects.get(pk=threadID)
    resource.replyCount += 1
    resource.save()
    new_post = Comment(
        content=content,
        creator=User.objects.get(pk=userID),
        resource=resource
    )
    new_post.save()
    serializer = PostSerializer(new_post, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def bookmark(request):
    data = json.loads(request.body)    
    userID =  data['user']
    threadID = data['resource']
    bookmark = data['bookmark']
   
    if bookmark:
        new_pin = Bookmark(
            user = User.objects.get(pk=userID),
            resource = Resource.objects.get(pk=threadID)
        )
        new_pin.save()

        serializer = PinSerializer(new_pin, many=False)
        return Response(serializer.data)
    else:
        bookmark = Bookmark.objects.filter(user=User.objects.get(pk=userID), resource=Resource.objects.get(pk=threadID))
        bookmark.delete()
        return Response("The bookmark is removed.")


@api_view(['GET'])
def checkBookmarked(request, thread_id, user_id):
    bookmark = Bookmark.objects.filter(user=User.objects.get(pk=user_id), resource=Resource.objects.get(pk=thread_id))
    if bookmark.exists():
        return Response({"pinned": "true"})
    return Response({"pinned": "false"})


@api_view(['GET'])
def getBookmarkedEntries(request, user_id):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    user = User.objects.get(pk=user_id)
    bookmark = user.user_pin.all().order_by('id').reverse()
    ids = [bookmark.resource.id for bookmark in bookmark]
    entries = [Resource.objects.get(pk=id) for id in ids]

    result_page = paginator.paginate_queryset(entries, request)
    serializer = Entrieserializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def getTopEntries(request):
    entries = Resource.objects.all().order_by("replyCount").reverse()[0:5]
    serializer = Entrieserializer(entries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getEntriesTopic(request, topic_id):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    entries = Resource.objects.filter(topic=topic_id).all().order_by('-updated')
    result_page = paginator.paginate_queryset(entries, request)
    serializer = Entrieserializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET', 'PUT'])
def account(request, user_id):
    if request.method == "GET":
        account = Account.objects.get(pk=user_id)
        serializer = ProfileSerializer(account, many=False)
        return Response(serializer.data)

    elif request.method == "PUT":
        try:
            account = Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            return Response({"res": "The account is not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        data = json.loads(request.body)
        bio = data.get("bio")
        avatar = data.get("avatar")
        account.bio = bio
        account.avatar = avatar
        account.save()

        return Response({"res": "The account is updated sucessfully."})







    







