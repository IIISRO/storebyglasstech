# views.py
from rest_framework.response import Response
from product.models import Product, Category, Artist
from rest_framework.views import APIView
from .serializers import ProductListSerializer
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.core.paginator import EmptyPage, Paginator



class ProductsListAPI(APIView):
    http_method_names = ["get"]
    def get(self, request,  category_slug, *args, **kwarg):
        # artist_names = Artist.objects.filter(artist_products__in=products).distinct().values_list('full_name', flat=True)
        # category_names = Category.objects.filter(category_products__in=products).distinct().values_list('title', flat=True)

        if category_slug == 'all':
            products = Product.objects.filter(Q(status="True") | Q(status='New')).order_by('-created_at')
            search = self.request.GET.get('search', '')

            if search:
                products = products.filter(Q(title__icontains=search)|Q(title__startswith = search)|Q(title__endswith = search))

            response_data = {
                'category': 'All',
            }

        else:
            category = get_object_or_404(Category, slug = category_slug)
            products = category.category_products.filter(Q(status="Active") | Q(status='New')).order_by('-created_at')
            response_data = {
            'category': category.title.capitalize(),
            }

        artist = self.request.GET.get('artist', '')
        if artist:
            products = products.filter(artist__full_name__in=artist.split(',')).distinct()

        sort = self.request.GET.get('sort', '')
        if sort == 'htl':
            products = sorted(products, key=lambda x: x.actual_price)
        elif sort == 'lth':
            products = sorted(products, key=lambda x: x.actual_price, reverse=False)
            

        product_per_page = 6

        page = self.request.GET.get('page', 1)
        product_paginator = Paginator(products, product_per_page)
        try:
            products = product_paginator.page(page)
        except EmptyPage:
            products = product_paginator.page(product_paginator.num_pages)
        except:
            products = product_paginator.page(product_per_page)

        if product_paginator.num_pages > 1:
            is_paginated = True
        else:
            is_paginated=False

        pagination = {}
        pagination['is_paginated']=is_paginated
        pagination['all_pages_num'] = product_paginator.num_pages
        pagination['current_page'] = int(page)
        pagination['next_page'] = None if not products.has_next() else products.next_page_number()  
        pagination['previous']  = None if not products.has_previous() else products.previous_page_number()  

        product_serializer = ProductListSerializer(products, many = True)
        response_data['pagination'] = pagination
        response_data['products'] = product_serializer.data
       
        return Response(response_data, status=HTTP_200_OK)