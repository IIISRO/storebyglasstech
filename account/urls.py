from django.urls import path
from .views import Profile, Signin, login_view, logout_user,  WishList
from django.contrib.auth.views import LogoutView

app_name = 'account'

urlpatterns = [
    path('wishlist/', WishList.as_view(), name='wishlist'),
    path('profile/', Profile.as_view(), name='profile'),
    path('signin/', Signin.as_view(), name='signin'),
    path('login/', login_view, name='login'),
    path('logout/', logout_user, name='logout'),

    


]