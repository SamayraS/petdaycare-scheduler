# bookings/models.py
from django.db import models
from django.contrib.auth.models import User

class Pet(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    pet_type = models.CharField(max_length=50)
    special_needs = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

from django.db import models

class TimeSlot(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_available = models.BooleanField(default=True)
    class Meta:
        verbose_name = "Time Slot"
        verbose_name_plural = "Time Slots"
    def __str__(self):
        return f"Slot {self.id}: {self.start_time} to {self.end_time}"

class Booking(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='confirmed')

    from django.db import models
    
    