from rest_framework import serializers
from .models import CustomUser


class UserSeriailizer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id","name","email", "password","phone_number","image"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
