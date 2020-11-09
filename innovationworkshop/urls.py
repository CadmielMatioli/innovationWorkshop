from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('apicov/', include('apiCov.urls')),
    path('', include('cov.urls')),
    path('admin/', admin.site.urls),
]
