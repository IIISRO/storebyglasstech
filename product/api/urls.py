# urls.py
from django.urls import path
from .views  import ProductsListAPI
app_name = 'productAPI'

urlpatterns = [
    path('products/<slug:category_slug>/', ProductsListAPI.as_view(), name='products-all'),
    path('product/<slug:category_slug>/<slug:product_slug>/', ProductsListAPI.as_view(), name='product-detail'),

]