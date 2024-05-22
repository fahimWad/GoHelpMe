from socket import fromshare
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

from accounts.models import Account
from .models import *

class RegistrationForm(UserCreationForm):
    # first_name = models.CharField(max_length=100, help_text="Required. Please add first name.")
    # last_name = models.CharField(max_length=100, help_text="Required. Please add last name.")
    # email = forms.EmailField(max_length=60, help_text = "Required. Add a valid email address.")
    class Meta:
        model = Account
        fields = ("email", "username", "first_name", "last_name", "school", "password1", "password2")

class AccountAuthenticationForm(forms.ModelForm):
    # password = forms.CharField(Label='Password', widget = forms.PasswordInput)

    class Meta:
        model = Account
        fields = {'username', 'password'}
    
    def clean(self):
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']
        if not authenticate(username=username, password=password):
            raise forms.ValidationError("Invalid Login")

