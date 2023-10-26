from django.urls import path
from . import views

urlpatterns = [
    path("users/login", views.login),
    path("users/signup", views.signup),
]
