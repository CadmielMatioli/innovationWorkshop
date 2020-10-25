import tweepy
from textblob import TextBlob
from googletrans import Translator
from unidecode import unidecode
from sqlite3 import Error
import psycopg2

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




    con = psycopg2.connect(host='ec2-54-157-88-70.compute-1.amazonaws.com', database='d6hm7bjvrr5aij',
                           user='wltwdpgyxxcivw',
                           password='7d9904ffc16851dd2b36dda170bf8a3f848fac3ad919cf75cdeda023b5a913f7')
    cur = con.cursor()
    try:
        print(cur)
        cur.execute('INSERT INTO "apiCov_tweets" VALUES(default,'+str(sentiment.polarity)+')')
        con.commit()
    except Error as e:
        print(e)
    finally:
        if con:
            con.close()


