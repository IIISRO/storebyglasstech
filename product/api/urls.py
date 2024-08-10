# urls.py
from django.urls import path
from .views  import ProductsListAPI, ProductDetailAPI, NewCommentAPIView
app_name = 'productAPI'

urlpatterns = [
    path('products/<slug:category_slug>/', ProductsListAPI.as_view(), name='api-products-list'),
    path('product/<slug:category_slug>/<slug:product_slug>/', ProductDetailAPI.as_view(), name='api-product-detail'),
    path('new-comment/', NewCommentAPIView.as_view(), name='new-comment'),


]