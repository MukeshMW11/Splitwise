from django.db import models
import uuid
from group.models import Group
from user.models import CustomUser
from expense.models import Expense

class Debt(models.Model):
    DEBT_STATUS = (
        ("pending", "Pending"),     
        ("settled", "Settled"),
    )

    id = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="debtor")
    owed_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="creditor")
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE, related_name="debt", null=True, blank=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="group_debts")
    debt_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    settled_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0) 
    status = models.CharField(max_length=10, choices=DEBT_STATUS, default="pending")

    class Meta:
        unique_together = ("user", "owed_to", "group", "expense")  

    def __str__(self):
        return f"{self.user.name} owes {self.owed_to.name}: ${self.debt_amount} in {self.group}"
