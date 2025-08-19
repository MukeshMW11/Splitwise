from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DebtViewSet


router = DefaultRouter()
router.register("debt", DebtViewSet, basename="debt")


urlpatterns = [
    path(
        "debt/expense/<uuid:expense_id>/",
        DebtViewSet.as_view({"get": "list"}),
        name="debts-by-expense",
    ),
    path("", include(router.urls)),
]
