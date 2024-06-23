from django.urls import path

from .views import ServicesView, SingleServiceView, StatusView

urlpatterns = [
    path("service/", ServicesView.as_view()),
    path("service/<str:service>/", SingleServiceView.as_view()),
    path("status/", StatusView.as_view()),
]
