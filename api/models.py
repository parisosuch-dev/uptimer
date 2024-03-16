from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255, null=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)


class Status(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    response_time = models.IntegerField()
    success = models.BooleanField()
