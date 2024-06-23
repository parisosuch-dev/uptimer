import os

from pathlib import Path
from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv

from .uptime import log_uptimes


def start_scheduler():
    """Start background scheduler for uptime logging."""
    # get retention environment variable (if none is present default will be used)
    if Path(".env").exists():
        load_dotenv()
        period = os.getenv("UPTIMER_PING_PERIOD")
    if not period:
        seconds = 300
    else:
        seconds = int(period)

    print(f"Periodicity of ping: {seconds}s")
    scheduler = BackgroundScheduler()
    scheduler.add_job(log_uptimes, "interval", seconds=seconds)

    scheduler.start()
