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


def prediction(request):
  from django.shortcuts import render
  import requests
  from datetime import datetime
  from django.http import JsonResponse, HttpResponse
  import pandas as pd
  import numpy as np
  from sklearn.model_selection import train_test_split
  from sklearn.tree import DecisionTreeRegressor, DecisionTreeClassifier, plot_tree
  from sklearn.neighbors import KNeighborsRegressor, KNeighborsClassifier
  from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
  from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error, accuracy_score, confusion_matrix
  from sklearn.impute import SimpleImputer
  from sklearn.compose import ColumnTransformer
  from sklearn.preprocessing import OneHotEncoder, LabelEncoder
  import matplotlib.pyplot as plt
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
  ds_brazil = pd.DataFrame(array)
  X = ds_brazil.iloc[:, :-1].values
  y = ds_brazil.iloc[:, -1].values

  ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [0])], remainder='passthrough')
  X = np.array(ct.fit_transform(X))

  labelencoder = LabelEncoder()
  y = labelencoder.fit_transform(y)

  imputer = SimpleImputer(missing_values=np.nan, strategy='mean')

  imputer.fit(X[:, :5])

  X[:, :5] = imputer.transform(X[:, :5])

  X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0)
  knn = KNeighborsRegressor()
  arvore = DecisionTreeRegressor()
  rf = RandomForestRegressor()

  knn.fit(X_train, y_train)
  arvore.fit(X_train, y_train)
  rf.fit(X_train, y_train)

  y_pred_knn = knn.predict(X_test)
  y_pred_arvore = arvore.predict(X_test)
  y_pred_rf = rf.predict(X_test)

  arvore.fit(X_train, y_train)
  plt.figure(figsize=(10, 10))

  # a = plot_tree(arvore,
  #               feature_names=ct.get_feature_names(),
  #               class_names=['0', '1'],
  #               filled=True,
  #               rounded=True,
  #               fontsize=14
  #               )
  plt.show()
  plt.savefig("3.png")
  print(arvore.feature_importances_)

  print(X_test[:, :-1])
  print(arvore.predict(X_test[:, :-1]))
  y_pred = arvore.predict(X_test)
  labels = list(ds_brazil.target_names)
  cm = confusion_matrix(y_test, y_pred)

  cm_visualizar = pd.DataFrame(cm, index=labels, columns=labels)
  print(accuracy_score(y_test, y_pred))

  return JsonResponse(dict_list)

def tweetSentmentAnalysis(request):
  import tweepy
  from textblob import TextBlob
  from googletrans import Translator
  from unidecode import unidecode

  # Tokens de acesso
  consumer_key = 'vrrwUB8yx0h6DD6wg3ohk6XXZ'
  consumer_secret = 'h6zpmIKFUIaEV2RWKSQcpZBXJyInaLVHzroEiYwQ4Q7ueIoUH0'
  access_token = '1691636144-pUKKIpkhv1jjpsctGM6diG7i9LugoofN1WV3YcG'
  access_token_secret = 'qMyQdVRx8IFFzVnXrXgS37wOArig59eRe4S67p0epMz3S'
  # Autenticando
  auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
  auth.set_access_token(access_token, access_token_secret)
  api = tweepy.API(auth, wait_on_rate_limit=True)
  # Contadores
  numPos = 0
  numNeg = 0
  total = 0
  # Buscando tweets
  for tweet in tweepy.Cursor(api.search, q="#covid-19", since='2020-02-22', lang="pt").items(10):
    # Texto do Tweet
    textPT = unidecode(tweet.text)
    # Traduzindo para o Inglês
    textEN = Translator().translate(textPT)
    sentiment = TextBlob(textEN.text)
    # Exibindo...
    # print("[PT-BR] " + textPT)
    # print("[EN]    " + textEN.text)
    print("[Sent.] " + str(sentiment.polarity) + "\n")
    # Estatísticas
    total += 1
    if sentiment.polarity > 0:
      numPos += 1
    elif sentiment.polarity < 0:
      numNeg += 1

  # Sentimento geral
  mediaPos = numPos / total
  mediaNeg = numNeg / total
  print(total)
  print('Porcentagem de comentários positivos: ' + str(mediaPos))
  print('Porcentagem de comentários negativos: ' + str(mediaNeg))
