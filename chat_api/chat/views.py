from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


from .models import Conversation
from .serializers import ConversationSerializer

class ConversationViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer