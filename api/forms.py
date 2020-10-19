from django import forms
from api.models import Tweets


class ModelFormTweets(forms.ModelForm):
  class Meta:
    model = Tweets
    fields = "__all__"
