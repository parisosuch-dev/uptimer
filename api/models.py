from django.db import models

class Service(models.Model):
    """The service being watched"""
    name = models.TextField()
    description = models.TextField()
    url = models.URLField()
    time_created = models.DateTimeField(auto_now_add=True)

class Status(models.Model):
    """An instance of an uptime check"""
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    response_time = models.IntegerField() # in ms
    is_up = models.BooleanField()
    time = models.DateTimeField()