#Define URL Patterns for the volunteer_hours_portfolio here
from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required
from rest_framework.routers import DefaultRouter
from .views import *

#Create a router and register viewsets

urlpatterns = [
    path('/portfolio/',views.portfolio.as_view(), name="portfolio"),
    path('/create_entry/', createEntry.as_view(), name="create_entry"),
    path('/update_entry/<int:pk>/', UpdateEntry.as_view(), name="update_entry"),
    path('/delete_entry/<int:pk>/', DeleteEntry.as_view(), name="delete_entry"),
]