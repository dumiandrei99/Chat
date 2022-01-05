from django.shortcuts import render
from rest_framework import serializers
from .models import User
from .models import Message
from .serializer import UserSerializer
from .serializer import MessageSerializer
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

@csrf_exempt
def create_user(request):
    if request.method == 'POST': 
        data = JSONParser().parse(request)
        if len(data['username']) < 5:
            return JsonResponse("Username must have at least 5 characters", safe = False)
        
        if len(data['password']) < 6:
            return JsonResponse("Password must have at least 6 characters", safe = False)
            
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("success-register", safe = False)
        return JsonResponse("user existent-register", safe = False)
    return JsonResponse('Error status: 500',status = 500, safe = False)

@csrf_exempt
def create_message(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        print(data)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("message saved", safe = False)
        return JsonResponse("Couldn't insert", safe = False)
    return JsonResponse('Error status: 500',status = 500, safe = False)

@csrf_exempt
def get_messages(request):
    if request.method == 'GET':
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        print(serializer)
        return JsonResponse(serializer.data, safe = False)
    return JsonResponse('Error status: 500',status = 500, safe = False)

@csrf_exempt
def log_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        try:
            user= User.objects.get(username = data['username'])
        except:
            response = {"username": "", "response": "Userul nu exista!"}
            return JsonResponse(response, safe = False)
        
        if user.password != data['password']:
            response = {"username": "", "response": "wrong password-login"}
            return JsonResponse(response, safe = False)

        response = {"username": user.username, "response": "success"}
        return JsonResponse(response, safe = False)