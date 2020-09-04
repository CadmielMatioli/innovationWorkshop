from django.urls import include, path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('', views.index, name='index'),
]