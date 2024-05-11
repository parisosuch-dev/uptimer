"""
Uptime Checker
==============
Jobs that are run by the Django Cron Tab.
"""

import ping3

from .models import Service, Status


def post_status(url: str) -> Status:
    pass
def 

def log_uptimes() -> list[Status]:
    """Check uptimes of services and post them to statuses."""
    # get all services that need to be pinged
    services = Service.objects.all()

    for service in services:
        # ping each service and log
        pass
