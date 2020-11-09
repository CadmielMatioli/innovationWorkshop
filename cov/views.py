from django.shortcuts import render
import requests
from django.http import JsonResponse


def index(request):
    return render(request, 'index.html')


def prediction(request):
    return render(request, 'prediction.html')
