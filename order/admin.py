from django.contrib import admin
from storebyglasstech.storeglasstech_admin import storeglasstech_admin_site
from .models import Basket, BasketItem
# Register your models here.
storeglasstech_admin_site.register(Basket)
storeglasstech_admin_site.register(BasketItem)

