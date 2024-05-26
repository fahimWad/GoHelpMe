"""
URL configuration for GoHelpMe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#Do not change this file unless you are creating a new application. Define the url paths in your respective project applications.

from django.contrib import admin
from django.urls import path, include

#In this urlpatterns, we are defining three different paths: (1) api/accounts, (2) api/volunteer_events, and (3) volunteer_hours_portfolio
urlpatterns = [
    path('admin/', admin.site.urls),
    #Link all the urls specified under the accounts application.
    path('api/accounts/', include('accounts.urls')),
    #Link all the urls specified under the volunteer_events application.
    path('api/volunteer_events', include('volunteer_events.urls')),
    #Link all the urls specified under the volunteer_hours_portfolio application.
    path('api/volunteer_hours_portfolio', include('volunteer_hours_portfolio.urls')),
]