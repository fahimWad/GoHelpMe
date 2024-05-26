#Define URL Patterns for the volunteer_hours_portfolio here
from django.urls import path
from . import views
from accounts.views import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login', views.login_view.as_view(), name="login"),
    path('register', views.registration_view.as_view(), name="register"),
    path('logout', views.logoutUser.as_view(), name="logout"),
    path('', views.home.as_view(), name="home"), 
   
]