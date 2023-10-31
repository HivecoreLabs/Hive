from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet, basename='employees')
router.register(r'roles', views.RoleViewSet, basename='roles')
router.register(r'clock-ins', views.EmployeeClockInViewSet, basename='clock-ins')


urlpatterns = [
    path("auth/login/", views.login, name='login'),
    path("auth/signup/", views.signup, name='signup'),
    path("spreadsheets/", views.generate_sheet_database),
    path('', include(router.urls))
]
