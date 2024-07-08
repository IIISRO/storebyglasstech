# urls.py
from django.urls import path
from .views import (get_or_create_user, 
                    create_and_send_new_password, 
                    UpdateUserDataAPIView,
                    change_password, 
                    CreateNewAddressAPIView, 
                    set_default_address, 
                    DeleteAddressAPIView,
                    AddWishlistAPIView,
                    RemoveWishlistAPIView,
                    WishlistAPIView,
                    get_all_wish_item_number
                    )

app_name = 'accountAPI'

urlpatterns = [
    path('get_or_create_user/', get_or_create_user, name='get_or_create_user'),
    path('create_and_send_new_password/', create_and_send_new_password, name='create_and_send_new_password'),
    path('update/user/<int:pk>/', UpdateUserDataAPIView.as_view(), name='update_user'),
    path('change_password/<int:pk>/', change_password, name='change_password'),
    path('create/address/', CreateNewAddressAPIView.as_view(), name='create_address'),
    path('set_default/address/<int:pk>/', set_default_address, name='set_default_address'),
    path('delete/address/<int:pk>/', DeleteAddressAPIView.as_view(), name='delete_address'),
    path('wishlist/add/', AddWishlistAPIView.as_view(), name='addwishlist'),
    path('wishlist/remove/<int:pk>/', RemoveWishlistAPIView.as_view(), name='removewishlist'),
    path('wishlist/', WishlistAPIView.as_view(), name='wishlistAPI'),
    path('get_all_wish_item_number/', get_all_wish_item_number, name='get_all_wish_item_number'),



]