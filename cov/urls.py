from django.urls import include, path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'cov'

urlpatterns = [
    path('', views.index, name='index'),
    path('prediction', views.prediction, name='prediction'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
