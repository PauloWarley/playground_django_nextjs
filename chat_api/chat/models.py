from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class Conversation(models.Model):
    
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    phrase = models.CharField(max_length=200, default="")
    posted_at = models.DateTimeField(auto_now_add=True)

