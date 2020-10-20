from django.db import models


# Create your models here.
class Tweets(models.Model):
  sentiment = models.DecimalField(unique=False, max_digits=19, decimal_places=10)

  def __str__(self):
    return self.sentiment
