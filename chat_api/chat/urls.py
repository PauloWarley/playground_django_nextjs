from chat.views import ConversationViewSet, CreateUser, ChatPageView

from rest_framework.routers import DefaultRouter
from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'', ConversationViewSet)
router.register(r'auth/register', CreateUser, basename='createuser')


urlpatterns = []

                   
urlpatterns.append(path("chat/", ChatPageView.as_view(), name="chat"))


urlpatterns.append(path('token/', TokenObtainPairView.as_view()))
urlpatterns.append(path('token/refresh/', TokenRefreshView.as_view()))
urlpatterns.append(path('token/refresh/', TokenRefreshView.as_view()))

for url in router.urls:
    urlpatterns.append(url)
    