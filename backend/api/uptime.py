"""
Uptime Checker
==============
Jobs that are run by the Django Cron Tab.
"""

import os
from datetime import datetime, date, timedelta
from pathlib import Path
from typing import Union

import ping3
from dotenv import load_dotenv

from .models import Service, Status
from .serializers import StatusSerializer

if Path(".env").exists():
    load_dotenv(".env")


def post_status(service: Service) -> Union[Status | None]:
    """Post a status based on the url.

    Args:
        service (Service): Service model

    Returns:
        Status: Status of service (or None if fail)
    """
    # set time for ping
    time = datetime.now()
    # ping host
    response = ping3.ping(service.hostname, unit="ms")

    # determine status based on response
    if not response:
        data = {"service": service.name, "is_up": False, "time": time}
    else:
        response = int(response)
        # if response is 0, set to 1
        if response == 0:
            response = 1
        data = {
            "service": service.name,
            "response_time": response,
            "is_up": True,
            "time": time,
        }
    serializer = StatusSerializer(data=data)

    if serializer.is_valid():
        status = serializer.save()
        return status
    return None


def log_uptimes() -> list[Status]:
    """Get status for every service.

    Returns:
        list[Status]: All statuses.
    """
    # get all services that need to be pinged
    services = Service.objects.all()

    statuses = []

    for service in services:
        # ping each service and log
        status = post_status(service)
        statuses.append(status)

    return statuses


def delete_uptimes() -> None:
    """Delete all uptimes past retention period"""
    # check for rentention in .env
    retention = os.getenv("UPTIMER_RETENTION_PERIOD")

    if retention is None:
        retention = 90

    # delete all uptimes greater than today - retention
    today = date.today()
    cutoff_date = (today - timedelta(days=retention)).isoformat()

    uptimes = Status.objects.filter(time__lt=cutoff_date)

    try:
        uptimes.delete()
    except Exception as e:
        print(f"There was an error trying to delete uptimes: {e}")
