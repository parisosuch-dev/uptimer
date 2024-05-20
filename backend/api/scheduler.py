from apscheduler.schedulers.background import BackgroundScheduler
from .uptime import log_uptimes


def start_scheduler():
    """Start background scheduler for uptime logging."""
    scheduler = BackgroundScheduler()
    scheduler.add_job(log_uptimes, "interval", minutes=5)

    scheduler.start()
