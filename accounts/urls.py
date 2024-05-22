#Define URL Patterns for the volunteer_hours_portfolio here
from django.urls import path
from . import views
from accounts.views import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('accounts/login/', login_view, name="login"),
    path('register/', registration_view, name="register"),
    path('logout/', logoutUser, name="logout"),
    path('', login_required(home), name="home"), 
   
]