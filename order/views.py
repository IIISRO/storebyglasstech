from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from .models import Basket, Order, OrderItem
from product.models import UsedCoupon
from django.urls import reverse_lazy
# from product.helpers import get_weekly_most_sold_three_products
from django.views.decorators.csrf import csrf_exempt
# from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from datetime import date
# Create your views here.

class Checkout(LoginRequiredMixin, View):
    def get(self, request):
        if request.user.basket.basket_items.count():
            context = {
                'all_addresses':request.user.user_addresses.filter(is_default = False).order_by('-created_at'),
                'default_address':request.user.user_addresses.filter(is_default = True).first()
            }
            
            return render(request, 'checkout.html', context)
        return redirect('order:cart')
