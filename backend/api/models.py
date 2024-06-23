from django.db import models

class Service(models.Model):
    """The service being watched"""
    name = models.CharField(unique=True, primary_key=True, max_length=64)
    description = models.TextField(max_length=1024)
    hostname = models.CharField(max_length=256)
    time_created = models.DateTimeField(auto_now_add=True)

class Status(models.Model):
    """An instance of an uptime check"""
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    response_time = models.IntegerField(null=True) # in ms
    is_up = models.BooleanField()
    time = models.DateTimeField()