from django.shortcuts import render
import requests
from datetime import datetime
from django.http import JsonResponse, HttpResponse

def index(request):

    return render(request, 'index.html')


def home(request):

  response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1')
  # response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/20200601')
  # response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/sp')
  states = response.json()
  array = []
  for list in states['data']:
    array += [{
      'state' : list['state'],
      'cases' : list['cases'],
      'deaths' : list['deaths'],
      'suspects' : list['suspects'],
      'refuses' : list['refuses'],
      'datetime' : datetime.strptime(list['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%d-%m-%Y"),
    }]
  dict_list = {'list' : array}
  return JsonResponse(dict_list)
  # return render(request, 'home.html', dict_list)
