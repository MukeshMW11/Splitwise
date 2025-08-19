from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet,CategoryGroupViewSet
from django.urls import path,include


router  = DefaultRouter()
router.register('category',CategoryViewSet,basename='category')
router.register('categorygroup',CategoryGroupViewSet,basename='categorygroup')




urlpatterns =[

path('',include(router.urls))


]

