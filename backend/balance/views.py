from rest_framework import viewsets, status
from django.db.models import Q, Sum
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Debt
from .serializers import DebtSerializer


class DebtViewSet(viewsets.ModelViewSet):
    serializer_class = DebtSerializer

    def get_queryset(self):
        user = self.request.user
        expense_id = self.kwargs.get("expense_id") or self.request.query_params.get(
            "expense_id"
        )

        base_filter = Q(user=user) | Q(owed_to=user)
        qs = Debt.objects.filter(base_filter)

        if expense_id:
            qs = qs.filter(expense_id=expense_id)

        return (
            qs.select_related("user", "owed_to", "expense", "group")
            .prefetch_related(
                "expense__expenseparticipants__user",
                "expense__expensepayer__user",
            )
            .distinct()
        )

    @action(detail=False, methods=["get"], url_path="group-debt/(?P<group_id>[^/.]+)")
    def group_debt(self, request, group_id=None):
        user = request.user

        debts = Debt.objects.filter(
            Q(user=user) | Q(owed_to=user), group_id=group_id, status="pending"
        ).select_related("owed_to", "user", "expense")

        serialized_data = []
        for debt in debts:
            debt_data = DebtSerializer(debt).data
            if debt.user == user:
                debt_data["role"] = "owes"
            else:
                debt_data["role"] = "owed_to"
            serialized_data.append(debt_data)

        total_debt = (
            debts.filter(user=user).aggregate(total=Sum("debt_amount"))["total"] or 0
        )

        return Response({"total_debt": total_debt, "debts": serialized_data})

    @action(detail=True, methods=["patch"], url_path="settle")
    @transaction.atomic
    def settle_single_debt(self, request, pk=None):
        user = request.user
        debt = get_object_or_404(Debt, pk=pk)

        if debt.user != user and debt.owed_to != user:
            return Response(
                {"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN
            )

        if debt.status == "settled":
            return Response(
                {"detail": "Debt already settled"}, status=status.HTTP_400_BAD_REQUEST
            )

        debt.status = "settled"
        debt.settled_amount = debt.debt_amount
        debt.save(update_fields=["status", "settled_amount"])

        serializer = self.get_serializer(debt)
        return Response(serializer.data, status=status.HTTP_200_OK)
