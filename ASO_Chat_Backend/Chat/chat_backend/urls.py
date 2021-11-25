from django.urls import path
from .views import create_message, create_user, get_messages, log_in

urlpatterns = [
    path('createUser', create_user),
    path('createMessage', create_message),
    path('getMessages', get_messages),
    path('logIn', log_in)
]