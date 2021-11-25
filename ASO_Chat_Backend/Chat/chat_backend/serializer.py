from rest_framework import serializers
from .models import User
from .models import Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['username', 'message_content']
