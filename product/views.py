from django.shortcuts import render
from django.views.generic import View
from .models import Category, Artist
from django.shortcuts import get_object_or_404

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