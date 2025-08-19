from rest_framework import serializers
from .models import Group, GroupMembership
from user.serializers import UserSeriailizer
from user.models import CustomUser
from django.db import transaction


class GroupMembershipSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(read_only=True)
    user = UserSeriailizer(read_only=True)
    group_id = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(), source="group", write_only=True
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = GroupMembership
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    created_by = UserSeriailizer(read_only=True)
    members = serializers.ListField(
        child=serializers.UUIDField(), write_only=True, required=True
    )
    membership = GroupMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = [
            "id",
            "name",
            "description",
            "created_by",
            "created_by_id",
            "members",
            "membership",
        ]

    def create(self, validated_data):
        members_ids = validated_data.pop("members")
        user = self.context["request"].user
        with transaction.atomic():
            group = Group.objects.create(created_by=user, **validated_data)

            for user_id in members_ids:
                try:
                    member = CustomUser.objects.get(id=user_id)
                    GroupMembership.objects.create(
                        group=group,
                        user=member,
                        title=f"{member.username} in {group.name}",
                    )
                except CustomUser.DoesNotExist:
                    raise serializers.ValidationError(
                        f"User with ID {user_id} does not exist."
                    )

            GroupMembership.objects.get_or_create(
                group=group,
                user=user,
                defaults={"title": f"{user.username} (creator) in {group.name}"},
            )

        return group

    def update(self, instance, validated_data):
        members_ids = validated_data.pop("members", [])
        user = self.context["request"].user

        with transaction.atomic():
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()

            existing_member_ids = set(
                instance.membership.values_list("user_id", flat=True)
            )
            for user_id in members_ids:
                if user_id not in existing_member_ids:
                    self._add_member(instance, user_id)

        return instance

    def _add_member(self, group, user_id):
        try:
            member = CustomUser.objects.get(id=user_id)
            GroupMembership.objects.create(
                group=group, user=member, title=f"{member.username} in {group.name}"
            )
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError(f"User with ID {user_id} does not exist.")
