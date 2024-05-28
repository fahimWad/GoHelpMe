#Define URL Patterns for the volunteer_hours_portfolio here
from django.urls import path
from . import views


# router = DefaultRouter()
# router.register(r'entries', EntryViewSet)

urlpatterns = [
    path('/post_event/', views.post_event.as_view(), name='post_event'),  # URL for posting a new event
    path('/events/', views.event_list.as_view(), name='event_list'),  # URL for listing events
    path('/events/<int:event_id>/', views.event_detail.as_view(), name='event_detail'),  # URL for event details
    path('/events/<int:event_id>/register/', views.register.as_view(), name='register_for_event'),  # URL for event registration
    path('/profile/', views.user_profile.as_view(), name='user_profile'),  # URL for user profile
]

