from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('employees', views.EmployeeViewSet)
router.register('roles', views.RoleViewSet)

urlpatterns = [
    path("auth/login/", views.login, name='login'),
    path("auth/signup/", views.signup, name='signup'),
    path('', include(router.urls))
]
