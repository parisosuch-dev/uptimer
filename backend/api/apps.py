from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    def ready(self):
        from .scheduler import start_scheduler

        try:
            start_scheduler()
        except Exception as err:
            print("There was an error trying to start scheduler!")
            print(err)
