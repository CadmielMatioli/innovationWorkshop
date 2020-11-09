from django.urls import include, path
from . import views

app_name = 'apiCov'

urlpatterns = [
    path('states/', views.states, name='states'),
    path('state/<str:state>', views.state, name='state'),
    path('brazilperdate/<int:date>', views.brazilPerDate, name='brazilperdate'),
    path('countries/', views.countries, name='countries'),
    path('country/<str:country>', views.country, name='country'),
    path('prediction/', views.prediction, name='prediction'),
    path('tweets/sentiment/', views.tweetSentmentAnalysis, name='tweets'),
]
