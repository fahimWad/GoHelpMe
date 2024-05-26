from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin

class MyAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, school, username, password=None):
        if not email:
            raise ValueError("Users must have a email address")
        if not username:
            raise ValueError("Users must have a username")
        if not first_name:
            raise ValueError("Users must have a first name")
        if not last_name:
            raise ValueError("Users must have last name")
        if not school:
            raise ValueError("Users must have school name")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            school=school,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email, first_name, last_name, school, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            school=school,
        )
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Account(AbstractBaseUser, PermissionsMixin):
    SCHOOL = (
        ("UCLA", "UCLA"),
        ("Stanford University", "Stanford University"),
        ("MIT", "MIT"),
        ("Caltech", "Caltech"),
        ("UCSD", "UCSD"),
        ("USC", "USC"),
        ("Harvard University", "Harvard University"),
        ("UCI", "UCI"),
        ("UC Berkeley", "UC Berkeley"),
        ("Dartmouth University", "Dartmouth University"),
        ("Cornell University", "Cornell University"),
    )
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, unique=False)
    last_name = models.CharField(max_length=30, unique=False)
    school = models.CharField(max_length=50, unique=False, choices=SCHOOL)
    profile_picture = models.ImageField(default="blank-profile-picture-973460_1280.webp", null=True, blank=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'school']

    objects = MyAccountManager()

    def __str__(self):
        return self.email
    

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self,app_label):
        return True