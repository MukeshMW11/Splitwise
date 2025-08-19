from rest_framework import serializers
from .models import Debt
from user.serializers import UserSeriailizer
from expense.serializers import ExpensesSerializer, ExpensesParticipantSerializer, ExpensePayerSerializer

class DebtSerializer(serializers.ModelSerializer):
    user = UserSeriailizer(read_only=True)
    owed_to = UserSeriailizer(read_only=True)
    expense = ExpensesSerializer(read_only=True)
    expense_participants = serializers.SerializerMethodField()
    expense_payers = serializers.SerializerMethodField()

    class Meta:
        model = Debt
        fields = [
            'id',
            'user',
            'owed_to',
            'debt_amount',
            'status',
            'expense',
            'expense_participants',
            'expense_payers',
            "settled_amount"
        ]

    def get_expense_participants(self, obj):
        participants = obj.expense.expenseparticipants.all()
        return ExpensesParticipantSerializer(participants, many=True).data

    def get_expense_payers(self, obj):
        payers = obj.expense.expensepayer.all()
        return ExpensePayerSerializer(payers, many=True).data
