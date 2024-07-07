"""
URL configuration for storebyglasstech project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .storeglasstech_admin  import storeglasstech_admin_site

urlpatterns = [
    path('admin/', storeglasstech_admin_site.urls),
    path('', include('core.urls', namespace='core')),
    path('', include('product.urls', namespace='product')),
    path('', include('account.urls', namespace='account')),
    path('', include('order.urls', namespace='order')),
    path('api/v1/', include('product.api.urls', namespace='productAPI')),
    path('api/v1/account/', include('account.api.urls', namespace='accountAPI')),
    path('api/v1/order/', include('order.api.urls', namespace='orderAPI')),
    path("ckeditor5/", include('django_ckeditor_5.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)