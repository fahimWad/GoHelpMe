#---------------------------------------------------------------------------------------------------------------
#Decorators are pretty much like "wrapping paper." They wrap the function that they are called on. In order to wrap a function,
#use the notation "@<decorator_name>" above the functions in our views.py file. In the case of Django, we use decorators to wrap our functions to restrict
#which pages a user is allowed to access. The decorators.py contains all the functions that define "decorators". At the end, we want to call these functions
#from our views.py file.
#---------------------------------------------------------------------------------------------------------------

from django.http import HttpResponse
from django.shortcuts import redirect

#Decorator defining which page an unauthenticated_user is allowed to see. Since unauthenticated users are not allowed to access the contents of a login,
#they are restricted to only viewing the login page. So, if a user wants to see their dashbaord but isn't logged in, this decorator if wrapped around a 
#function in our views.py file redirects the unauthenticated user to the login page
def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')
        else:
            return view_func(request, *args, **kwargs)
    return wrapper_func

#Decorator defining which pages users are allowed to see. For example, if we wanted to only allow superusers to see this, we would pass in the variable describing super_users as a parameter.
#into the allowed_users decorator inside the views.py. I don't think I used this yet in this prototype, so don't worry about this yet.
def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):

            group = None
            if request.user.groups.exists():
                group = request.user.groups.all()[0].name
            if group in allowed_roles:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse("You are not authorized")
            return view_func(request, *args, **kwargs)
        return wrapper_func
    return decorator
        