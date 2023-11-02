from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet, basename='employees')
router.register(r'roles', views.RoleViewSet, basename='roles')
router.register(r'formulas', views.FormulaViewSet, basename='formulas')
router.register(r'variables', views.VariablesViewSet, basename='variables')

urlpatterns = [
    path("auth/login/", views.login, name='login'),
    path("auth/signup/", views.signup, name='signup'),
    path("spreadsheets/", views.generate_sheet_database, name='spreadsheets'),
    path("tables/", views.get_tables_columns,name='tables'),
    path('', include(router.urls))
]
