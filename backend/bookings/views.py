# bookings/views.py
from rest_framework import generics
from .models import TimeSlot
from .serializers import TimeSlotSerializer
from rest_framework import viewsets
from .models import Pet
from .serializers import PetSerializer
from rest_framework.permissions import IsAuthenticated

class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer


class PetCreateView(generics.CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)