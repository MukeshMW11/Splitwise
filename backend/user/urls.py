# user/urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UserViewset, CookieTokenRefreshView

router = DefaultRouter()
router.register(r"user", UserViewset, basename="user")

urlpatterns = [
    path("", include(router.urls)),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
]
