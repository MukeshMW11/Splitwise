from rest_framework import viewsets
from .models import Expense, ExpensesParticipant, ExpensePayer
from .serializers import (
    ExpensesSerializer,
    ExpensesParticipantSerializer,
    ExpensePayerSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from balance.models import Debt


class ExpensesViewSet(viewsets.ModelViewSet):
    serializer_class = ExpensesSerializer

    def get_queryset(self):
        group_id = self.request.query_params.get("group_id")
        if group_id:
            return (
                Expense.objects.filter(group_id=group_id)
                .select_related("group")
                .prefetch_related("expenseparticipants__user", "expensepayer__user")
            )
        return Expense.objects.all()

    def destroy(self, request, *args, **kwargs):
        expense = self.get_object()

        unsettled_debts = Debt.objects.filter(expense=expense, status="pending")
        if unsettled_debts.exists():
            return Response(
                {"message": "Cannot delete expense because there are unsettled debts."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExpensesParticipantViewSet(viewsets.ModelViewSet):
    queryset = ExpensesParticipant.objects.all()
    serializer_class = ExpensesParticipantSerializer


class ExpensePayerViewSet(viewsets.ModelViewSet):
    queryset = ExpensePayer.objects.all()
    serializer_class = ExpensePayerSerializer
