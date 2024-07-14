from django.urls import path
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from .views import Checkout


app_name = 'order'

urlpatterns = [
    path('cart/', login_required(TemplateView.as_view(template_name="cart.html")), name='cart'),
    path('checkout/', Checkout.as_view(), name='checkout'),


]