from .models import CustomUser
from datetime import datetime, timedelta
from group.models import Group
from .authentication import CookieJWTAuthentication
from .serializers import (
    UserSeriailizer,
)
from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from balance.models import Debt


class UserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSeriailizer
    authentication_classes = [CookieJWTAuthentication]

    def get_permissions(self):
        if self.action in ["register", "login"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_token_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()

        unsettled_debts = Debt.objects.filter(status="pending").filter(
            models.Q(user=user) | models.Q(owed_to=user)
        )

        if unsettled_debts.exists():
            debt_list = [
                {
                    "expense": str(debt.expense) if debt.expense else None,
                    "amount": float(debt.debt_amount),
                    "owes_to": debt.owed_to.name,
                    "owed_by": debt.user.name,
                }
                for debt in unsettled_debts
            ]
            return Response(
                {
                    "detail": "Cannot delete user with unsettled debts.",
                    "unsettled_debts": debt_list,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=["post"], url_path="register")
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"message": "User registered successfully."})

    @action(detail=False, methods=["post"], url_path="login")
    def login(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response({"detail": "Invalid email or password"}, status=401)

        tokens = self.get_token_for_user(user)

        access_token_expiry = datetime.now() + timedelta(minutes=15)
        refresh_token_expiry = datetime.now() + timedelta(days=7)

        response.data = {
            "email": user.email,
            "message": "User login successful",
        }

        response.set_cookie(
            "access_token",
            tokens["access"],
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            expires=access_token_expiry,
        )
        response.set_cookie(
            "refresh_token",
            tokens["refresh"],
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            expires=refresh_token_expiry,
        )

        return response

    @action(detail=False, methods=["post"], url_path="logout")
    def logout(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            print(refresh_token)
            if refresh_token is None:
                raise Exception("No refresh token provided")
            token = RefreshToken(refresh_token)
            print(token)
            try:
                token.blacklist()
            except TokenError:
                pass
            response = Response(
                {"message": "User logout successfully"},
                status=status.HTTP_205_RESET_CONTENT,
            )
            response.delete_cookie("refresh_token")
            response.delete_cookie("access_token")
            return response

        except Exception as e:
            response = Response({"error": str(e)}, status=status.HTTP_205_RESET_CONTENT)
            response.delete_cookie("refresh_token")
            response.delete_cookie("access_token")
            return response

    @action(detail=False, methods=["get"], url_path=r"(?P<group_id>[^/.]+)/group")
    def group(self, request, group_id=None):
        try:
            group = Group.objects.get(id=group_id)
        except Group.DoesNotExist:
            return Response(
                {"detail": "Group not found"}, status=status.HTTP_404_NOT_FOUND
            )

        memberships = group.membership.select_related("user")

        users = [membership.user for membership in memberships]

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="profile")
    def profile(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK and "access" in response.data:
            access_token = response.data["access"]
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
            )
            del response.data["access"]
        return response
