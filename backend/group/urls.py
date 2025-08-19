from rest_framework.routers import DefaultRouter
from .views import GroupViewSet,GroupMemberShipViewSet
from django.urls import path,include




router = DefaultRouter()

router.register('group',GroupViewSet,basename='group'),
router.register('groupmembership',GroupMemberShipViewSet,basename='groupmembership')



urlpatterns = [ 
    path('',include(router.urls)),
    
    
]