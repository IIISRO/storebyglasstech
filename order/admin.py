from django.contrib import admin
from storebyglasstech.storeglasstech_admin import storeglasstech_admin_site
from .models import Basket, BasketItem, Order, OrderItem
# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    search_fields = ['number',]

class OrderItemAdmin(admin.ModelAdmin):
    search_fields = ['order__number',]

storeglasstech_admin_site.register(Basket)
storeglasstech_admin_site.register(BasketItem)
storeglasstech_admin_site.register(Order, OrderAdmin)
storeglasstech_admin_site.register(OrderItem, OrderItemAdmin)

