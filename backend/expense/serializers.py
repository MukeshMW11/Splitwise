from rest_framework import serializers
from .models import Expense, ExpensesParticipant, ExpensePayer
from group.serializers import GroupSerializer
from user.serializers import UserSeriailizer
from group.models import Group
from user.models import CustomUser
from decimal import Decimal
from django.db import transaction

from .services.expense_service import (
    create_participants,
    create_or_update_payers,
    update_debts_for_expense,
)


from rest_framework import serializers
from .models import Expense, ExpensesParticipant, ExpensePayer
from group.serializers import GroupSerializer
from user.serializers import UserSeriailizer
from group.models import Group
from user.models import CustomUser
from decimal import Decimal
from django.db import transaction
from .services.expense_service import (
    create_participants,
    create_or_update_payers,
    update_debts_for_expense,
)


class ExpensesSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)
    group_id = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(), source="group", write_only=True
    )
    participants = serializers.ListField(
        child=serializers.UUIDField(), write_only=True, required=True
    )
    payers_data = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField()),
        write_only=True,
        required=True,
    )

    expenseparticipants = serializers.SerializerMethodField()
    expensepayer = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = "__all__"

    def get_expenseparticipants(self, obj):
        from .serializers import ExpensesParticipantSerializer

        participants = obj.expenseparticipants.all()
        return ExpensesParticipantSerializer(participants, many=True).data

    def get_expensepayer(self, obj):
        from .serializers import ExpensePayerSerializer

        payers = obj.expensepayer.all()
        return ExpensePayerSerializer(payers, many=True).data

    def validate(self, data):
        amount = data.get("amount")
        payers_data = data.get("payers_data", [])
        total_paid = sum(
            Decimal(payer.get("paid_amount", "0")) for payer in payers_data
        )
        if abs(total_paid - amount) > Decimal("0.01"):
            raise serializers.ValidationError(
                f"Total paid amount ({total_paid}) does not match the expense amount ({amount})."
            )
        return data

    @transaction.atomic
    def create(self, validated_data):
        participants_id = validated_data.pop("participants")
        print("This is the particpants data", participants_id)
        payers_data = validated_data.pop("payers_data")
        print("This is the particpants data", payers_data)

        group = validated_data["group"]

        expense = Expense.objects.create(**validated_data)
        create_participants(expense, participants_id, group)
        create_or_update_payers(expense, payers_data, group)
        update_debts_for_expense(expense)

        return expense

    @transaction.atomic
    def update(self, instance, validated_data):
        participants_id = validated_data.pop("participants", None)
        payers_data = validated_data.pop("payers_data", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        group = instance.group

        if participants_id is not None:
            ExpensesParticipant.objects.filter(expense=instance).exclude(
                user_id__in=participants_id
            ).delete()
            create_participants(instance, participants_id, group)

        if payers_data is not None:
            create_or_update_payers(instance, payers_data, group)

        update_debts_for_expense(instance)
        return instance


class ExpensesParticipantSerializer(serializers.ModelSerializer):
    user = UserSeriailizer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = ExpensesParticipant
        fields = "__all__"


class ExpensePayerSerializer(serializers.ModelSerializer):
    user = UserSeriailizer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), source="user", write_only=True
    )

    class Meta:
        model = ExpensePayer
        fields = "__all__"
