from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
import uuid

# Create your models here.


class CustomManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is the required field")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Super user must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Super User must have super_user=True")
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None
    id = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)
    email = models.EmailField(("email address"), unique=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    image = models.ImageField(upload_to="profile_images/", blank=True, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]
    objects = CustomManager()

    def __str__(self):
        return self.email
