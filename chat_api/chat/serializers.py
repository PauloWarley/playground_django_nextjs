from chat.models import Conversation
from django.contrib.auth.models import User


from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class ConversationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Conversation
        fields = ['user', 'phrase', 'posted_at']