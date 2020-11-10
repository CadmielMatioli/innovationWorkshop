from django.urls import include, path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'cov'

urlpatterns = [
    path('states', views.index, name='index'),
    path('prediction', views.prediction, name='prediction'),
    path('twitter', views.twitter, name='twitter'),
    path('', views.countries, name='countries'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
