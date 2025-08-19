from rest_framework import serializers
from .models import Category,CategoryGroup
from group.models import Group
from group.serializers import GroupSerializer




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name"]


class CategoryGroupSerializer(serializers.ModelSerializer):

    group = GroupSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    group_id = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(), source="group", write_only=True
    )
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )

    class Meta:
        model = CategoryGroup
        fields = '__all__'