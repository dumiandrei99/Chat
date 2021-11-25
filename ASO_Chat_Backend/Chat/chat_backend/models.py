from django.db import models
import uuid
# Create your models here.

class User(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable = False)
    username = models.CharField(primary_key = True,max_length = 100)
    password = models.CharField(max_length = 100)

class Message(models.Model):
    username = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'sender')
    message_content = models.CharField(max_length = 2000)

