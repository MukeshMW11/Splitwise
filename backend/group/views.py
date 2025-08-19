from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.db.models import Q

from .models import Group, GroupMembership
from .serializers import GroupSerializer, GroupMembershipSerializer
from balance.models import Debt


class GroupViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Group.objects.none()

        return (
            Group.objects.filter(membership__user=user)
            .distinct()
            .prefetch_related("membership", "membership__user")
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    

    def destroy(self, request, *args, **kwargs):
        group = self.get_object()
        unpaid_debts = Debt.objects.filter(group=group, status='pending').exists()

        if unpaid_debts:
            return Response(
                {"error": "Cannot delete group with unsettled debts."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=["post"], url_path="leave")
    @transaction.atomic
    def leave(self, request, pk=None):
        user = request.user
        group = self.get_object()

        membership = GroupMembership.objects.filter(group=group, user=user).first()
        if not membership:
            return Response(
                {"error": "You are not a member of this group."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if group.created_by == user:
            return Response(
                {"error": "Group creator cannot leave the group."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        has_debts = (
            Debt.objects.filter(group=group, status="pending")
            .filter(Q(user=user) | Q(owed_to=user))
            .exists()
        )

        if has_debts:
            return Response(
                {"error": "Cannot leave group. You have unsettled debts."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        membership.delete()

        return Response(
            {"message": "You have successfully left the group."},
            status=status.HTTP_200_OK,
        )


class GroupMemberShipViewSet(viewsets.ModelViewSet):
    queryset = GroupMembership.objects.all()
    serializer_class = GroupMembershipSerializer
