from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('employees', views.EmployeeViewSet)
router.register('roles', views.RoleViewSet)

urlpatterns = [
    path("auth/login/", views.login),
    path("auth/signup/", views.signup),
    path('', include(router.urls))
]
