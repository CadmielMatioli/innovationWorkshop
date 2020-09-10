from django.urls import include, path
from . import views

urlpatterns = [
    path('testApp/', views.index, name='index'),
]
