from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ExpensesViewSet,ExpensesParticipantViewSet,ExpensePayerViewSet

router = DefaultRouter()

router.register('expense',ExpensesViewSet,basename='expense')
router.register('expenseparticipant',ExpensesParticipantViewSet,basename='expenseparticipant')
router.register('expensepayer',ExpensePayerViewSet,basename='expensepayer')


urlpatterns = [
    path('',include(router.urls)),
    
]




