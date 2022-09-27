import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.paginator import Paginator
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from .models import User, Post, Following, Like


def index(request):
    return render(request, "network/index.html")

@login_required
def followingPostsPage(request):
    return render(request, "network/followingPosts.html")

@csrf_exempt
def allPosts(request, endpoint):
    posts = Post.objects.all()
    posts = posts.order_by("-timestamp").all()
    paginator = Paginator(posts, 10)
    counter = int(request.GET.get("page") or 1)
    user = request.user

    if endpoint == "posts":
        page = paginator.page(counter)
        set_posts = page.object_list
        userPosts = []
        for partPost in set_posts:
            if partPost.poster == user:
                userPosts.append(partPost)
        newPosts = []
        for post in set_posts:
            likes = Like.objects.filter(post=post)
            post = post.serialize()
            if likes is not None:
                post.update({"likes": len(likes)})
            else:
                post.update({"likes": 0})
            newPosts.append(post)

        return JsonResponse({"posts": newPosts,
            "userPosts": [post.serialize() for post in userPosts]}, safe=False)

    elif endpoint == "pages":
        return JsonResponse({"pages": paginator.num_pages})
    else:
        return HttpResponse(status=404)

@csrf_exempt
@login_required
def clickLike(request, post_id):
    post = Post.objects.get(pk=post_id)
    if request.method == "POST":
        likeExist = Like.objects.filter(userLike=request.user, post=post)
        if likeExist:
            likeExist.delete()
            return HttpResponse(status=202)
        else:
            newLike = Like(userLike=request.user, post=post)
            newLike.save()
            return HttpResponse(status=204)

@csrf_exempt
@login_required
def editPost(request, post_id):
    changedPost = Post.objects.get(pk=post_id)
    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("postContent") is not None:
            changedPost.postContent = data["postContent"]
            changedPost.save()
        return HttpResponse(status=204)
    elif request.method == "GET":
        likes = Like.objects.filter(post=changedPost)
        changedPost = changedPost.serialize()
        if likes is not None:
            changedPost.update({"likes": len(likes)})
        else:
            changedPost.update({"likes": 0})
        return JsonResponse(changedPost, safe=False)
    else:
        return JsonResponse({
            "error": "PUT or GET request required."
        }, status=400)

@csrf_exempt
@login_required
def dataset(request, endpoint):
    if endpoint == "pages":
        userId = int(request.GET.get("page"))
        user = User.objects.get(pk=userId)
        posts = Post.objects.filter(poster=user).order_by("-timestamp")
        paginator = Paginator(posts, 10)
        return JsonResponse({"pages": paginator.num_pages})
    elif endpoint == "posts":
        data = request.GET.get("page").split(',')
        user = User.objects.get(pk=int(data[0]))
        posts = Post.objects.filter(poster=user).order_by("-timestamp")
        paginator = Paginator(posts, 10)
        counter = int(data[1] or 1)
        page = paginator.page(counter)
        set_posts = page.object_list

        newPosts = []
        for post in set_posts:
            likes = Like.objects.filter(post=post)
            post = post.serialize()
            if likes is not None:
                post.update({"likes": len(likes)})
            else:
                post.update({"likes": 0})
            newPosts.append(post)
        return JsonResponse(newPosts, safe=False)
    else:
        return HttpResponse(status=404)

@csrf_exempt
@login_required
def followingPosts(request, endpoint):
    followings = User.objects.get(pk=request.user.id).rel_from_set.all()
    posts = []
    for follows in followings:
        followedUserPosts = follows.user.all_user_posts.all().order_by("-timestamp")
        for post in followedUserPosts:
            likes = Like.objects.filter(post=post)
            post = post.serialize()
            if likes is not None:
                post.update({"likes": len(likes)})
            else:
                post.update({"likes": 0})
            posts.append(post)
    paginator = Paginator(posts, 10)
    counter = int(request.GET.get("page") or 1)

    if endpoint == "pages":
        return JsonResponse({"pages": paginator.num_pages})
    elif endpoint == "posts":
        page = paginator.page(counter)
        set_posts = page.object_list
        return JsonResponse(set_posts, safe=False)
    else:
        return HttpResponse(status=404)

@login_required
def newPoast(request):
    if request.method == "POST":
        postContent = request.POST['post-field']
        newPost = Post(poster=request.user, postContent=postContent)
        newPost.save()
    return HttpResponseRedirect(reverse("index"))

@login_required
def otherProfilePage(request, user_id):
    user = User.objects.get(pk=user_id)
    if request.method == "GET":
        followers = User.objects.get(pk=user_id).rel_to_set.all()
        followings = User.objects.get(pk=user_id).rel_from_set.all()
        posts = Post.objects.filter(poster=user).order_by("-timestamp")
        return render(request, "network/profilePage.html", {
            "poster_id": user_id,
            "poster_name": user.username,
            "followers": len(followers),
            "followings": len(followings),
            "posts": len(posts),
        })

@csrf_exempt
@login_required
def getFollowers(request, user_id):
    if request.method == "GET":
        followers = User.objects.get(pk=user_id).rel_to_set.all()
        return JsonResponse([follow.serialize() for follow in followers], safe=False)

@csrf_exempt
@login_required
def updateFollow(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)
    if request.method == "POST":
        follower = request.user
        followingExist = Following.objects.filter(follower=follower, user=user)
        if user.id == follower.id:
            return HttpResponse({"error": "User can't follow ownself."}, status=404)
        if followingExist:
            followingExist.delete()
        else:
            followingLink = Following(follower=follower, user=user)
            followingLink.save()
    return HttpResponse(status=204)

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
