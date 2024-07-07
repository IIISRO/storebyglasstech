# urls.py
from django.urls import path
from .views import (AddBasketAPIView,
                    BasketAPIView, 
                    RemoveBasketAPIView, 
                    UpdateBasketAPIView, 
                    OrderListAPIView, 
                    UpdateOrderAPIView, 
                    basket_coupon_api, 
                    checkout_items_summary
                    )

app_name = 'orderAPI'

urlpatterns = [
    # other urlpatterns
    path('basket/add/', AddBasketAPIView.as_view(), name='addbasket'),
    path('basket/', BasketAPIView.as_view(), name='basket'),
    path('basket/remove/<int:pk>/', RemoveBasketAPIView.as_view(), name='removebasket'),
    path('basket/update/<int:pk>/', UpdateBasketAPIView.as_view(), name='updatebasket'),
    path('basket/coupon/', basket_coupon_api, name='basketcoupon'),
    path('checkout_items_summary/', checkout_items_summary, name='checkout_items_summary'),
    path('orders/list/', OrderListAPIView.as_view(), name='orderslist'),
    path('order/update/<int:pk>/', UpdateOrderAPIView.as_view(), name='updateorder'),







]