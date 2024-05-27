#Define URL Patterns for the volunteer_hours_portfolio here
from django.urls import path
from . import views
from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('portfolio/',login_required(views.portfolio), name="portfolio"),
    path('create_entry/', login_required(views.createEntry), name="create_entry"),
    path('update_entry/<str:pk>/', login_required(views.updateEntry), name="update_entry"),
    path('delete_entry/<str:pk>/', login_required(views.deleteEntry), name="delete_entry"),

]