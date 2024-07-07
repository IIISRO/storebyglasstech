# views.py
from django.shortcuts import render, redirect
from django.views.generic import View, DetailView
from django.contrib.auth.hashers import check_password
from django.urls import reverse_lazy
from django.http import HttpResponse
from django.contrib.auth import login, authenticate, logout
import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.conf import settings
# from order.models import BasketItem, Basket
from product.models import Coupon
from .models  import UserWishlist, UserWishlistItem
# Create your views here.


class WishList(View):
    def get(self, request):
        context = {
        }
        return render(request, 'wishlist.html', context)
    

class Signin(View):
    def get(self, request):
        if not request.user.is_authenticated:
            return render(request, 'signin.html')
        return redirect(reverse_lazy('account:profile'))
    
class Profile(LoginRequiredMixin, View):
    def get(self, request):
        context = {
            'all_addresses':request.user.user_addresses.filter(is_default = False).order_by('-created_at'),
            'default_address':request.user.user_addresses.filter(is_default = True).first(),
        }
        
        return render(request, 'profile.html', context)
    
def login_view(request):
    if not request.user.is_authenticated:
        if request.method == "POST":
            data = json.loads(request.body)
            response = HttpResponse(request)
            username = data['phone'].replace('+994', '0').replace(' ','')
            password = data['password']
            user = authenticate(request, username = username, password =  password)
            
            if user:

                cookie_user_wishlist_items = json.loads(request.COOKIES.get('user_wishlist_items')) if request.COOKIES.get('user_wishlist_items') else []
                if cookie_user_wishlist_items:
                    user_wishlist,s = UserWishlist.objects.get_or_create(user=user)
                    user_wishlist_items = user_wishlist.wish_items.all()
                    # kohne wishlisti temizle
                    user_wishlist_items.delete()
                    for cookie_item in cookie_user_wishlist_items:
                        if not user_wishlist_items.filter(product_id=cookie_item['product']).exists():
                            UserWishlistItem.objects.create(wishlist = user_wishlist, product_id = int(cookie_item['product']))

                
                    response.delete_cookie('user_wishlist_items')

                # cookie_user_basket_items = json.loads(request.COOKIES.get('user_basket_items')) if request.COOKIES.get('user_basket_items') else []
                # if cookie_user_basket_items:
                #     user_basket,s = Basket.objects.get_or_create(user=user)
                #     user_basket_items = user_basket.basket_items.all()
                #     # kohne sebeti temizle
                #     user_basket_items.delete()
                #     for cookie_item in cookie_user_basket_items:
                #         if not user_basket_items.filter(product_id=cookie_item['product']).exists():
                #             BasketItem.objects.create(basket = user_basket, product_id = int(cookie_item['product']), quantity = int(cookie_item['quantity']))

                #     cookie_basket_coupon = int(request.COOKIES.get('basket_coupon')) if request.COOKIES.get('basket_coupon') else None
                #     if not user_basket.coupon and  cookie_basket_coupon:
                #         new_coupon = Coupon.objects.get(id = int(cookie_basket_coupon))
                #         valid, r = new_coupon.is_valid(user)
                #         if valid:
                #             user_basket.coupon = new_coupon
                #             user_basket.save()

                #     response.delete_cookie('user_basket_items')
                #     response.delete_cookie('basket_coupon')
                        
                login(request ,user)
                response.data = 'Signedin!'
                response.status = 200
                return response
            else:
                return HttpResponse('User not found!', status = 404)
    return HttpResponse('Error',  status = 400)

@login_required()
def logout_user(request):
    logout(request)
    return redirect(settings.LOGOUT_REDIRECT_URL)