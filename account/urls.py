from django.urls import path
from .views import ForgetPassword, WishList, Login, PasswordSent, Profile
from django.views.generic import TemplateView

app_name = 'account'

urlpatterns = [
    path('forget-pwd/', ForgetPassword.as_view(), name='forgetpwd'),
    path('login/', Login.as_view(), name='login'),
    path('pwd-sent/', PasswordSent.as_view(), name='pwdsent'),
    path('wishlist/', WishList.as_view(), name='wishlist'),
    path('profile/', Profile.as_view(), name='profile'),

]