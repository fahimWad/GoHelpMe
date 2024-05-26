from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from .models import *
UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
         model = UserModel
         fields = '__all__'

    def validate(self, data):
        if not data.get('email'):
            raise serializers.ValidationError("Users must have an email address")
        if not data.get('username'):
            raise serializers.ValidationError("Users must have a username")
        if not data.get('first_name'):
            raise serializers.ValidationError("Users must have a first name")
        if not data.get('last_name'):
            raise serializers.ValidationError("Users must have a last name")
        if not data.get('school'):
            raise serializers.ValidationError("Users must have a school name")

        # Validate password strength
        password = data.get('password')
        validate_password(password)

        return data

    def create(self, validated_data):
        email = validated_data.get('email')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        school = validated_data.get('school')
        username = validated_data.get('username')
        password = validated_data.get('password')

        user = UserModel.objects.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            school=school,
            username=username,
            password=password
        )
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    ##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            #DOUBLE CHECK VALUEERROR
            raise ValidationError('user not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'username')
