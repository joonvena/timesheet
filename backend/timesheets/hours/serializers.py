from rest_framework import serializers
from django.contrib.auth.models import User
from hours.models import Hour
from datetime import date


class HourSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Hour
        fields = ['id', 'client', 'task', 'hours',
                  'date', 'week', 'owner']
