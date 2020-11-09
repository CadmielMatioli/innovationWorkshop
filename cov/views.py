from django.shortcuts import render
import requests
from django.http import JsonResponse


def index(request):
    return render(request, 'index.html')

def home(request):
    response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1')
    states = response.json()
    array = []
    for list in states['data']:
        array += [{
            'state': list['state'],
            'cases': list['cases'],
            'deaths': list['deaths'],
            'suspects': list['suspects'],
            'refuses': list['refuses'],
        }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)