from django.shortcuts import render
import requests
from datetime import datetime
from django.http import JsonResponse, HttpResponse

# Create your views here.
def states(request):
  response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1')
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

def state(request, state):
  response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/'+state+'')
  state = response.json()
  array = []
  for list in state:
    array = [{
      'state' : state['state'],
      'cases' : state['cases'],
      'deaths' : state['deaths'],
      'suspects' : state['suspects'],
      'refuses' : state['refuses'],
      'datetime' : datetime.strptime(state['datetime'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%d-%m-%Y"),
    }]
  dict_list = {'list' : array}
  return JsonResponse(dict_list)

def brazilPerDate(request, date):
  date = str(date-1)
  response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/'+date+'')
  brazilperdate = response.json()
  array = []
  for list in brazilperdate['data']:
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

def countries(request):
  response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/countries')
  countries = response.json()
  array = []
  for list in countries['data']:
    array += [{
      'country' : list['country'],
      'cases' : list['cases'],
      'confirmed': list['confirmed'],
      'deaths' : list['deaths'],
      'recovered' : list['recovered'],
      'datetime' : datetime.strptime(list['updated_at'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%d-%m-%Y"),
    }]
  dict_list = {'list' : array}
  return JsonResponse(dict_list)

def country(request, country):
  response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/'+country+'')
  country = response.json()
  array = []
  for list in country:
    array = [{
      'country' : country['data']['country'],
      'cases' : country['data']['cases'],
      'confirmed' : country['data']['confirmed'],
      'deaths' : country['data']['deaths'],
      'recovered' : country['data']['recovered'],
      'datetime' : datetime.strptime(country['data']['updated_at'], '%Y-%m-%dT%H:%M:%S.%f%z').strftime("%d-%m-%Y"),
    }]
  dict_list = {'list' : array}
  return JsonResponse(dict_list)
