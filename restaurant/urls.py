from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'type', views.TypeViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'dish', views.DishViewSet)
router.register(r'drink', views.DrinkViewSet)
router.register(r'restaurant', views.RestaurantViewSet)
router.register(r'table', views.TableViewSet)
router.register(r'review', views.ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]