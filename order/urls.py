from django.urls import path
from django.views.generic import TemplateView

app_name = 'order'

urlpatterns = [
    path('cart/', TemplateView.as_view(template_name="cart.html"), name='cart'),
    path('checkout/', TemplateView.as_view(template_name="checkout.html"), name='checkout'),


]