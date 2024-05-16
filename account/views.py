from django.shortcuts import render
from django.views.generic import View

# Create your views here.

class ForgetPassword(View):
    def get(self, request):
        context = {
        }
        return render(request, 'forget_password.html', context)
    
class PasswordSent(View):
    def get(self, request):
        context = {
        }
        return render(request, 'password_sent.html', context)
    
class WishList(View):
    def get(self, request):
        context = {
        }
        return render(request, 'wishlist.html', context)
    
class Login(View):
    def get(self, request):
        context = {
        }
        return render(request, 'login.html', context)
    
    
class Profile(View):
    def get(self, request):
        context = {
        }
        return render(request, 'profile.html', context)