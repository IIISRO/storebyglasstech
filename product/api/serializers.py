# serializers.py
from rest_framework import serializers
from product.models import Product, Coupon, Category, Size, Frame
from django.urls import reverse_lazy



class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = (
            'id',
            'height',
            'width',
        )


class ProductFrameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Frame
        fields = (
            'id',
            'title',
            'frame',
        )

class ProductListSerializer(serializers.ModelSerializer):

    url =  serializers.SerializerMethodField()
    same_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'price',
            'actual_price',
            'image',
            'has_discount',
            'discount_type',
            'discount_amount',
            'same_products',
            'url'
            )
        
    def get_url(self, obj):
        return reverse_lazy('product:product-detail', kwargs = {'category_slug':obj.category.slug, 'product_slug':obj.slug})
    
    def get_same_products(self, obj):

        return [product.type for product in obj.same_products]

   

class ProductSerializer(serializers.ModelSerializer):

    url =  serializers.SerializerMethodField()
    category =  serializers.SerializerMethodField()
    sizes =  serializers.SerializerMethodField()
    frames =  serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'category',
            'price',
            'sizes',
            'frames',
            'type',
            'artist',
            'actual_price',
            'image',
            'category',
            'status',
            'description',
            'has_discount',
            'discount_type',
            'discount_amount',
            'url'
            )
    def get_url(self, obj):
        return reverse_lazy('product:product-detail', kwargs = {'category_slug':obj.category.slug, 'product_slug':obj.slug})

    
    def get_category(self, obj):
        return obj.category.title
    
    def get_sizes(self, obj):
        return ProductSizeSerializer(obj.sizes, many = True).data
    
    def get_frames(self, obj):
        return ProductFrameSerializer(obj.frames, many = True).data


