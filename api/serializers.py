from rest_framework import serializers

from .models import Service, Status


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "name",
            "description",
            "url",
            "time_created",
        ]


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = [
            "service",
            "response_time",
            "is_up",
            "time",
        ]
