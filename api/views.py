from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Service, Status
from .serializers import ServiceSerializer, StatusSerializer


class ServicesView(APIView):
    """View for all services."""

    def get(self, request: Request) -> Response:
        """Get all services.

        Args:
            request (Request): incoming http request

        Returns:
            Response: all services being tracked
        """
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: Request, *args, **kwargs) -> Response:
        """Post a service.

        Args:
            request (Request): incoming http request

        Returns:
            Response: status of service being posted
        """
        service_name = request.data.get("name")
        service_description = request.data.get("description")
        service_url = request.data.get("url")

        services = Service.objects.filter(name=service_name)

        # reject post if service already exists
        if len(services) > 0:
            return Response(
                {"message": f"Service with name: '{service_name}' already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {
            "name": service_name,
            "description": "" if service_description is None else service_description,
            "url": service_url,
        }

        # serialize and validate data
        serializer = ServiceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SingleServiceView(APIView):
    """View for specifc service."""

    def get(self, request: Request, service: str) -> Response:
        """Get a specific service by name.

        Args:
            request (Request): incoming http request
            service (str): service name

        Returns:
            Response: respective service or error
        """
        try:
            service_obj = Service.objects.get(name=service)
        except Service.DoesNotExist:
            return Response(
                {"message": f"Service with name '{service}' does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ServiceSerializer(service_obj)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, service: str) -> Response:
        """Update a specific service by name.

        Args:
            request (Request): incoming http request
            service (str): service name

        Returns:
            Response: respective service or error
        """
        try:
            service_obj = Service.objects.get(name=service)
        except Service.DoesNotExist:
            return Response(
                {"message": f"Service with name '{service}' does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # parse data to see if name is attempted to be changed
        if request.data.get("name"):
            return Response(
                {
                    "message": "Cannot change name of service. Must delete service in order to change name."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # update
        serializer = ServiceSerializer(service_obj, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, service: str) -> Response:
        """Delete a specific service by name.

        Args:
            request (Request): incoming http request
            service (str): service name

        Returns:
            Response: respective service or error
        """
        try:
            service_obj = Service.objects.get(name=service)
            service_obj.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Service.DoesNotExist:
            return Response(
                {"message": f"Service with name '{service}' does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
