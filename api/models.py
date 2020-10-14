from django.db import models

# Create your models here.
class Tweets(models.Model):
  sentiment = models.CharField(max_length=264, unique=True)

  def __str__(self):
    return self.nome
