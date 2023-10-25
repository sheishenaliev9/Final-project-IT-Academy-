from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response


from .models import *
from .serializers import *

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = serializer.save()


class CurrentUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = {
            'username': request.user.username,
            'email': request.user.email,
        }

        try:
            person = Person.objects.get(user=request.user)
            person_data = PersonSerializer(person).data
        except Person.DoesNotExist:
            person_data = None

        response_data = {
            'user_data': user_data,
            'person_data': person_data,
        }

        return Response(response_data)