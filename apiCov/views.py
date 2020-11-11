import requests
from django.http import JsonResponse
from apiCov.models import Tweets
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from googletrans import Translator
index_view = never_cache(TemplateView.as_view(template_name='index.html'))


def states(request):
    response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1')
    states = response.json()
    array = []
    for list in states['data']:
        array += [{
            'state': list['state'],
            'uf': list['uf'],
            'cases': list['cases'],
            'deaths': list['deaths'],
            'suspects': list['suspects'],
            'refuses': list['refuses'],
            'datetime': list['datetime']
        }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)


def state(request, state):
    response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/' + state + '')
    state = response.json()
    array = []
    for list in state:
        array = [{
            'state': state['state'],
            'cases': state['cases'],
            'deaths': state['deaths'],
            'suspects': state['suspects'],
            'refuses': state['refuses'],
            'datetime': state['datetime']
        }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)


def brazilPerDate(request, date):
    date = str(date - 1)
    response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/' + date + '')
    brazilperdate = response.json()
    array = []
    for list in brazilperdate['data']:
        array += [{
            'state': list['state'],
            'cases': list['cases'],
            'deaths': list['deaths'],
            'suspects': list['suspects'],
            'refuses': list['refuses'],
            'datetime': list['datetime']
        }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)


def countries(request):
    response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/countries')
    countries = response.json()
    array = []
    translator = Translator()
    for list in countries['data']:
        array += [{
            'country': list['country'],
            'cases': list['cases'],
            'confirmed': list['confirmed'],
            'deaths': list['deaths'],
            'recovered': list['recovered'],
            'datetime': list['updated_at']
        }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)


def country(request, country):
    response = requests.get('https://covid19-brazil-api.now.sh/api/report/v1/' + country + '')
    country = response.json()
    array = []
    translator = Translator()
    for list in country:
        array = [{
            'country': country['data']['country'],
            'cases': country['data']['cases'],
            'confirmed': country['data']['confirmed'],
            'deaths': country['data']['deaths'],
            'recovered': country['data']['recovered'],
            'datetime': country['data']['updated_at']
        }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)


def prediction(request):
    import requests
    from django.http import JsonResponse
    import pandas as pd
    import matplotlib.pyplot as plt
    from matplotlib.dates import DateFormatter
    import matplotlib.dates as mdates
    from sklearn import linear_model
    from sklearn.metrics import max_error
    from datetime import datetime, timedelta

    response = requests.get('https://api.covid19api.com/dayone/country/brazil/status/confirmed')
    countries = response.json()
    array = []
    for list in countries:
        array += [{
            'cases': list['Cases'],
            'Date': list['Date'],
        }]
    dataset = pd.DataFrame(array)
    dataset.columns = ['Cases', 'Date']
    dataset.dropna(axis=0, how='any', inplace=True)
    dataset.index = pd.RangeIndex(len(dataset.index))
    dataset.to_csv("Datasets.csv", index=False)
    ds_countries = pd.read_csv('Datasets.csv')
    dates = ds_countries['Date']
    date_format = [pd.to_datetime(d) for d in dates]
    X = date_format
    y = ds_countries['Cases'].tolist()[1:]
    starting_date = len(X) - 200
    day_numbers = []
    for i in range(1, len(X)):
        day_numbers.append([i])
    X = day_numbers
    X = X[starting_date:]
    y = y[starting_date:]
    linear_regr = linear_model.LinearRegression()
    linear_regr.fit(X, y)
    print("Linear Regression Model Score: %s" % (linear_regr.score(X, y)))
    y_pred = linear_regr.predict(X)
    error = max_error(y, y_pred)
    X_test = []
    future_days = len(X) + 365
    for i in range(starting_date, starting_date + future_days):
        X_test.append([i])
    y_pred_linear = linear_regr.predict(X_test)
    y_pred_max = []
    y_pred_min = []
    for i in range(0, len(y_pred_linear)):
        y_pred_max.append(y_pred_linear[i] + error)
        y_pred_min.append(y_pred_linear[i] - error)
        date_zero = datetime.strptime(ds_countries['Date'][starting_date], '%Y-%m-%dT%H:%M:%SZ')
        date_prev = []
        x_ticks = []
        step = 90
        data_curr = date_zero
        x_current = starting_date
        n = int(future_days / step)
        for i in range(0, n):
            date_prev.append(str(data_curr.day)+"-"+str(data_curr.month)+"-"+ str(data_curr.year)[-2:])
            x_ticks.append(x_current)
            data_curr = data_curr + timedelta(days=step)
            x_current = x_current + step
    plt.grid()
    plt.scatter(X, y, color='blue')
    plt.plot(X_test, y_pred_linear, color='black', linewidth=2)
    plt.plot(X_test, y_pred_max, color='red', linewidth=1, linestyle='dashed')
    plt.plot(X_test, y_pred_min, color='green', linewidth=1, linestyle='dashed')
    plt.xlabel('Dias')
    plt.xlim(starting_date, starting_date + future_days)
    plt.xticks(x_ticks, date_prev)
    plt.ylabel('Casos')
    plt.yscale("log")
    plt.gca().set_facecolor('#2c314a')
    plt.savefig('cov/Static/prediction.png')
    value_x = []
    value_x_test = []
    value_y_pred_linear = []
    value_y_pred_max = []
    value_y_pred_min = []
    for idx, val in enumerate(X):
        value_x += [X[idx][0]]

    for idx, val in enumerate(X_test):
        value_x_test += [X_test[idx][0]]

    for i, val in enumerate(y_pred_linear):
        value_y_pred_linear += [int(val)]

    for i, val in enumerate(y_pred_max):
        value_y_pred_max += [int(val)]

    for i, val in enumerate(y_pred_min):
        value_y_pred_min += [int(val)]

    array = [{
        'X': value_x,
        'y': y,
        'x_ticks': x_ticks,
        'date_prev': date_prev,
        'X_test': value_x_test,
        'y_pred_linear': value_y_pred_linear,
        'y_pred_max': value_y_pred_max,
        'y_pred_min': value_y_pred_min,
    }]
    dict_list = {"list": array}
    return JsonResponse(dict_list)


def tweetSentmentAnalysis(request):
    positive = round(Tweets.objects.filter(sentiment__gt=0).count() * 100 / Tweets.objects.count(), 2)
    negative = round(Tweets.objects.filter(sentiment__lt=0).count() * 100 / Tweets.objects.count(), 2)
    neutral = round(Tweets.objects.filter(sentiment=0).count() * 100 / Tweets.objects.count(), 2)
    array = [{
        'positive': positive,
        'neutral': neutral,
        'negative': negative
    }]
    dict_list = {'list': array}
    return JsonResponse(dict_list)
