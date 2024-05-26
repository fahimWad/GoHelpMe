from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password, validate_username

class registration_view(APIView):
    #Allow access to anyone
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class login_view(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##
    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class logoutUser(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class home(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

# from django.shortcuts import render, redirect
# from django.contrib.auth import login, authenticate, logout
# from accounts.forms import RegistrationForm, AccountAuthenticationForm
# from django.contrib import messages

# from accounts.models import Account
# from .forms import *
# from .decorators import unauthenticated_user
# from django.contrib.auth.decorators import login_required

# # Create your views here.

# @unauthenticated_user
# def registration_view(request):
#     form = RegistrationForm()
#     if request.method == "POST":
#         form = RegistrationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password1')
#             account = authenticate(request, username=username,password=raw_password)
#             login(request, account)
#             return redirect('home')
#     context = {'form':form}
#     return render(request,'accounts/register.html', context)

# def logoutUser(request):
#     logout(request)
#     return redirect('login')

# @unauthenticated_user
# def login_view(request):
    
#     context = {}

#     user = request.user
#     if user.is_authenticated:
#         return redirect("home")
#     if request.method == "POST":
#         form = AccountAuthenticationForm(request.POST)
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)
#             return redirect('home')
#         else:
#             messages.info(request, 'Username or Password is incorrect')
#     else:
#         form = AccountAuthenticationForm()

#     context = {'login_form': form}
#     return render(request, 'accounts/login.html', context)

# def home(request):
#     return render(request, 'accounts/dashboard.html')