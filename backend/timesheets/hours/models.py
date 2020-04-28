from django.db import models
from django.conf import settings

class Hour(models.Model):
    client = models.CharField(max_length=70, blank=False)
    task = models.CharField(max_length=70, blank=False)
    hours = models.IntegerField()
    date = models.DateField(blank=False)
    week = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
