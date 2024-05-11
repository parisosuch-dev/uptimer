"""
Uptime Checker
==============
Jobs that are run by the Django Cron Tab.
"""

from datetime import datetime
from typing import Union
import ping3

from .models import Service, Status
from .serializers import StatusSerializer


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
    print(service.hostname)
    response = ping3.ping(service.hostname, unit="ms")

    print(response)

    # determine status based on response
    if not response:
        data = {
            "service": service.name,
            "is_up": False,
            "time": time
        }
    else:
        data = {
            "service": service.name,
            "response_time": int(response),
            "is_up": True,
            "time": time
        }
    serializer = StatusSerializer(data=data)

    if serializer.is_valid():
        status = serializer.save()
        return status
    print(serializer.errors)
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