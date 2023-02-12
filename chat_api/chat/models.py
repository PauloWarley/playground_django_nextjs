from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
    
class Conversation(models.Model):
    
    user = models.CharField(max_length=20)
    phrase = models.CharField(max_length=200)
    posted_at = models.DateTimeField(auto_now_add=True)