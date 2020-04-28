from hours.models import Hour
from django.contrib.auth.models import User
from hours.serializers import HourSerializer
from hours.permissions import IsOwner
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics
from rest_framework import permissions

class HourList(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwner]
    queryset = Hour.objects.all()
    serializer_class = HourSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        week_num = self.request.query_params.get('weeknum', None)
        owner_queryset = self.queryset.filter(owner=self.request.user, week=week_num)
        return owner_queryset

class HourDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hour.objects.all()
    serializer_class = HourSerializer

