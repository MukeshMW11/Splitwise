from django.db import models
import uuid
from group.models import Group
from user.models import CustomUser
from django.core.validators import MinValueValidator

# Create your models here.


class Expense(models.Model):
    id = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)

    SPLIT_CHOICES = (
        ("equally", "Equally"),
        ("unequally", "Unequally"),
        ("percentage", "Percentage"),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    split_type = models.CharField(
        max_length=10, choices=SPLIT_CHOICES, default="equally"
    )
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name="groupexpenses"
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("title", "group")

    def __str__(self):
        return self.title


class ExpensesParticipant(models.Model):
    id = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)
    expense = models.ForeignKey(
        Expense, on_delete=models.CASCADE, related_name="expenseparticipants"
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="participants"
    )

    def __str__(self):
        return f"{self.user} - {self.expense.title}"

    class Meta:
        unique_together = ("expense", "user")


class ExpensePayer(models.Model):
    id = models.UUIDField(editable=False, primary_key=True, default=uuid.uuid4)
    expense = models.ForeignKey(
        Expense, on_delete=models.CASCADE, related_name="expensepayer"
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="userexpensespayer"
    )
    paid_amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    actual_amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )

    class Meta:
        unique_together = ("expense", "user")

    def __str__(self):
        return f"{self.user} - {self.expense.title}"
