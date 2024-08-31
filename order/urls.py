from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from .views import Checkout, pay_declined, create_order, orders_list


app_name = 'order'

urlpatterns = [
    path('cart/', login_required(TemplateView.as_view(template_name="cart.html")), name='cart'),
    path('checkout/', Checkout.as_view(), name='checkout'),
    path('checkout/approved/<int:basket>/<str:checkout_total>/<str:checkout_actual_total>/<str:delv_fee>/', create_order, name='create_order'),
    path('checkout/declined/', pay_declined, name='pay_declined'),
    path('orderslist/', orders_list, name='orders_list'),
]