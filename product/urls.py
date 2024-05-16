from django.urls import path
from .views import Products
from django.views.generic import TemplateView

app_name = 'product'

urlpatterns = [
    path('products/<slug:category_slug>/', Products.as_view(), name='products'),
    path('product/<slug:category_slug>/<slug:product_slug>/', Products.as_view(), name='product-detail'),
]