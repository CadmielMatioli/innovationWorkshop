import tweepy
from textblob import TextBlob
from googletrans import Translator
from unidecode import unidecode
import sqlite3
from sqlite3 import Error
import mysql.connector
import sshtunnel

consumer_key = 'vrrwUB8yx0h6DD6wg3ohk6XXZ'
consumer_secret = 'h6zpmIKFUIaEV2RWKSQcpZBXJyInaLVHzroEiYwQ4Q7ueIoUH0'
access_token = '1691636144-pUKKIpkhv1jjpsctGM6diG7i9LugoofN1WV3YcG'
access_token_secret = 'qMyQdVRx8IFFzVnXrXgS37wOArig59eRe4S67p0epMz3S'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

numPos = 0
numNeg = 0
numNeut = 0
total = 0

for tweet in tweepy.Cursor(api.search, q="#covid-19", lang="pt").items():
    textPT = unidecode(tweet.text)
    textEN = Translator().translate(textPT)
    sentiment = TextBlob(textEN.text)
    total += 1
    if sentiment.polarity > 0:
        numPos += 1
    elif sentiment.polarity < 0:
        numNeg += 1
    elif sentiment.polarity == 0:
        numNeut += 1
    conn = sqlite3.connect("E:\\Faculdade\\6° Semestre\\Oficina de inovação IV\\innovationWorkshop\\db.sqlite3")
    x = conn.cursor()
    try:
        print(sqlite3.version)
        x.execute("INSERT INTO api_tweets(sentiment) VALUES("+str(sentiment.polarity)+")")
        conn.commit()
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()
