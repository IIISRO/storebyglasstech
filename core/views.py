from django.shortcuts import render
from django.views.generic import View
import json
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from order.models import OrderItem
from django.db.models import Sum, Q, Max, Count
from product.models import Product, ProductDiscount, Category
from django.utils import timezone
from .models import SliderIMG


# Create your views here.

class Home(View):
    def get(self, request):

        slider = SliderIMG.objects.all().order_by('-created_at')

        most_sold_products = (
            OrderItem.objects
            .values('product')
            .annotate(total_quantity_sold=Sum('quantity'))
            .order_by('-total_quantity_sold')[:4]
        )
        trend_products = Product.objects.filter(id__in=[item['product'] for item in most_sold_products])

        least_glass = Product.objects.filter(type = 'GLASS').order_by('-created_at')[:4]
        least_mdf = Product.objects.filter(type = 'MDF').order_by('-created_at')[:4]

        current_datetime = timezone.now()
        valid_discounts = ProductDiscount.objects.filter(
        (Q(valid_from__isnull=True) | Q(valid_from__lte=current_datetime)) &
        (Q(valid_to__isnull=True) | Q(valid_to__gte=current_datetime))
        )
        discounted_products = Product.objects.filter(productdiscount__in=valid_discounts).distinct()[:8]
        max_discount = ProductDiscount.objects.aggregate(Max('value'))['value__max']

        top_categories = (
            Category.objects.annotate(product_count=Count('category_products'))
            .order_by('-product_count')[:2]
        )

        context = {
            'trend_products' : trend_products,
            'least_glass' : least_glass,
            'least_mdf' : least_mdf,
            'discounted_products' : discounted_products,
            'max_discount' : max_discount,
            'top_categories' : top_categories,
            'slider' : slider
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

def error_404_view(request, exception):
    return render(request, '404.html')
