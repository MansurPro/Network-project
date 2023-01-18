from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name="all_user_posts")
    postContent = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "poster": self.poster.username,
            "posterId": self.poster.id,
            "postContent": self.postContent,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
        }

    def __str__(self) -> str:
        return f"{self.id}: new post from {self.poster}"

class Like(models.Model):
    userLike = models.ForeignKey(User, on_delete=models.CASCADE, related_name="all_user_likes")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="all_post_likes")

    def __str__(self) -> str:
        return f"{self.id}: new like from {self.userLike}"


class Following(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rel_from_set")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rel_to_set")

    def __str__(self) -> str:
        return f"{self.follower} follows {self.user}"
    def serialize(self):
        return {
            "id": self.id,
            "follower": self.follower.username,
            "user": self.user.username,
        }
