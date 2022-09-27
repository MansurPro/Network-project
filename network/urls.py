
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("newPost", views.newPoast, name="newPost"),
    path("followingPostsPage", views.followingPostsPage, name="followingPostsPage"),
    path("otherProfilePage/<int:user_id>", views.otherProfilePage, name="otherProfilePage"),

    # API routes
    path("allPosts/<str:endpoint>", views.allPosts, name="allPosts"),
    path("allPosts/edit/<int:post_id>", views.editPost, name="editPost"),
    path("allPosts/like/<int:post_id>", views.clickLike, name="clickLike"),
    path("otherProfilePage/allPosts/like/<int:post_id>", views.clickLike, name="clickLike"),
    path("profilePage/follow/<int:user_id>", views.updateFollow, name="updateFollow"),
    path("profilePage/unfollow/<int:user_id>", views.updateFollow, name="updateUnfollow"),
    path("followingPosts/<str:endpoint>", views.followingPosts, name="followingPosts"),
    path("profilePage/<str:endpoint>", views.dataset, name="dataset"),
    path("otherProfilePage/profilePage/followers/<int:user_id>", views.getFollowers, name="getFollowers"),
]
