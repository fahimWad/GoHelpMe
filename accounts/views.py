from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from accounts.forms import RegistrationForm, AccountAuthenticationForm
from django.contrib import messages

from accounts.models import Account
from .forms import *
from .decorators import unauthenticated_user
from django.contrib.auth.decorators import login_required

# Create your views here.

@unauthenticated_user
def registration_view(request):
    form = RegistrationForm()
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(request, username=username,password=raw_password)
            login(request, account)
            return redirect('home')
    context = {'form':form}
    return render(request,'accounts/register.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')

@unauthenticated_user
def login_view(request):
    
    context = {}

    user = request.user
    if user.is_authenticated:
        return redirect("home")
    if request.method == "POST":
        form = AccountAuthenticationForm(request.POST)
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Username or Password is incorrect')
    else:
        form = AccountAuthenticationForm()

    context = {'login_form': form}
    return render(request, 'accounts/login.html', context)

def home(request):
    return render(request, 'accounts/dashboard.html')