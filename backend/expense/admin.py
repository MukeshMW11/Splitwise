from django.contrib import admin
from .models import Expense,ExpensesParticipant,ExpensePayer
# Register your models here.
admin.site.register(Expense)
admin.site.register(ExpensesParticipant)
admin.site.register(ExpensePayer)
