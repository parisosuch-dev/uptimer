from django.urls import path

from .views import ServicesView, SingleServiceView

urlpatterns = [
    path("service/", ServicesView.as_view()),
    path("service/<str:service>/", SingleServiceView.as_view()),
]
