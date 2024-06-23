from django.contrib import admin
from .models import Service, Status

admin.site.register([Service, Status])