from django.shortcuts import render
from django.views.generic import View,TemplateView
from .models import Category, Artist
from django.shortcuts import get_object_or_404
from .models import Product
# Create your views here.

class Products(View):
    def get(self, request, category_slug):
        if category_slug != 'all':
            get_object_or_404(Category, slug = category_slug)

        context = {
            'categories':Category.objects.all(),
            'artists': Artist.objects.all()
        }
        return render(request, 'products.html', context)
    
class ProductDetail(View):
    def get(self, request, category_slug, product_slug):
        product = get_object_or_404(Product, slug = product_slug, category__slug = category_slug)

        releated_products = Product.objects.filter(category = product.category).exclude(id=product.id).order_by('?')[:4]
        comments = product.product_comments.all()

        context={
            'category_slug':category_slug,
            'product_slug':product_slug,
            'comments':comments,
            'releated_products':releated_products

        }
        return render(request, 'product-detail.html', context)

