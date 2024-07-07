from django.shortcuts import render
from django.views.generic import View
import json
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.

class Home(View):
    def get(self, request):
        context = {
        }
        return render(request, 'home.html', context)
    
def send_contact_email(request):
    data = json.loads(request.body)
    if data:
        try:
            subject = 'support'
            message = f"Ad:{data['name']}\nSoyad:{data['surname']}\nEmail:{data['email']}\nTelefon:{data['phone']}\nMesaj:\n{data['message']}"
            from_email = settings.EMAIL_HOST_USER
            recipient_list = ['ilgarshukuroff@gmail.com']
            send_mail(subject, message, from_email, recipient_list)
            return HttpResponse(status=200)
        except: 
            return HttpResponse(status=400)
    return HttpResponse(status=400)
