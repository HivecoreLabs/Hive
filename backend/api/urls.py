from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

# router = DefaultRouter()
# router.register(r'roles', views.RoleViewSet, basename='roles')
# router.register(r'clock-ins', views.EmployeeClockInViewSet, basename='clock-ins')

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet, basename='employees')

employee_nested_router = routers.NestedSimpleRouter(r'clock-ins', views.EmployeeClockInViewSet, basename='employee-clock-ins')


urlpatterns = [
    path("auth/login/", views.login, name='login'),
    path("auth/signup/", views.signup, name='signup'),
    path("spreadsheets/", views.generate_sheet_database),
    # path(r'', include(router.urls)),
    path(r'', include(router))
]
