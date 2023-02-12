from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Conversation, User
from .serializers import ConversationSerializer, UserSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    
class CreateUser(viewsets.ViewSet):
    permission_classes = (AllowAny, )
    
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        
        username = request.data['username']
        password = request.data['password']
        
        
        if serializer.is_valid() and not User.objects.filter(username = username).first():
            user = serializer.save()
            user.set_password(request.data.get("password"))
            user.save()
            
            print(user)
            
            return Response ({
                
                "status": "user created"
                # "user": UserSerializer(request.data, context=self.get_serializer_context()),
                # "token": Token.objects.crete(user=user)
            })
            
        else:
            return Response(serializer.errors, status=400)
            # return Response("teste")
