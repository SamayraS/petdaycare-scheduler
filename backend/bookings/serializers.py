from rest_framework import serializers
from .models import Pet, Booking

from .models import TimeSlot

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'start_time', 'end_time', 'is_available']


# class PetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pet
#         fields = '__all__'
#         read_only_fields = ('owner',)

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'breed', 'special_requirements']
        read_only_fields = ['owner']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'