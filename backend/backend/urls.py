from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),    
    path('api/', include([
        path('auth/', include('accounts.urls')),
        path('', include('bookings.urls')),
    ])),
    path('', TemplateView.as_view(template_name='index.html')),
]

# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
    
#     # API endpoints
#     path('api/auth/', include('accounts.urls')),  # Authentication endpoints
#     path('api/', include('bookings.urls')),      # Slots endpoints
# ]