from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse
from .models import Basket, Order, OrderItem
from product.models import UsedCoupon
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404

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


@csrf_exempt
def create_order(request, basket, checkout_total, checkout_actual_total, delv_fee):
    if request.method == 'POST':
        basket = Basket.objects.get(id = int(basket))
        basket.is_active = True
        basket.save()
        return HttpResponse(status = 200)
    
    if request.method == 'GET':
        basket = get_object_or_404(Basket, id = basket)
        if basket.is_active:
            user = basket.user
            address = user.user_addresses.filter(is_default = True).first()

            order = Order.objects.create(
                    user = user,
                    delv_fee = round(float(delv_fee), 2),
                    order_price = round(float(checkout_total), 2),
                    order_actual_price = round(float(checkout_actual_total), 2),
                    used_coupon = basket.coupon.code,
                    first_name = address.first_name,
                    last_name = address.last_name,
                    address_line = address.address_line,
                    region = address.region,
                    street = address.street,
                    building = address.building,
                    flat = address.flat,
                    )
            
            if basket.coupon and basket.coupon.is_valid(user)[0]:
                order.coupon = basket.coupon.code
                UsedCoupon.objects.create(user = user, coupon = basket.coupon)
                order.save()
                basket.coupon = None

            for item in basket.basket_items.all():
                OrderItem.objects.create(
                    order = order,
                    product = item.product,
                    quantity = item.quantity,
                    frame = item.frame,
                    size = item.size,
                    # image = models.ImageField(null=True, blank=True, upload_to='OrderIMGs/')
                    item_price = item.item_price,
                    item_actual_price = item.item_actual_price
                    )
                item.delete()
            basket.is_active = False
            basket.save()
            return redirect(f"{reverse_lazy('account:profile')}?p=orders&apprv=true")
        raise Http404
           
  
@login_required
def pay_declined(request):
    valid = request.GET.get('valid', '')
    if not valid == 'true':
        raise Http404
    return render(request, 'checkout-declined.html')