#Define URL Patterns for the volunteer_hours_portfolio here
from django.urls import path
from . import views

urlpatterns = [
    path('portfolio/', views.portfolio, name="portfolio"),
    path('create_entry/', views.createEntry, name="create_entry"),
    path('update_entry/<str:pk>/', views.updateEntry, name="update_entry"),
    path('delete_entry/<str:pk>/', views.deleteEntry, name="delete_entry"),
]