from django.shortcuts import render
import requests
from django.http import JsonResponse


def index(request):
    return render(request, 'index.html')


def prediction(request):
    return render(request, 'prediction.html')


def twitter(request):
    return render(request, 'twiiter.html')


def countries(request):
    return render(request, 'country.html')
