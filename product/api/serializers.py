# serializers.py
from rest_framework import serializers
from product.models import Product, Coupon, Category, Size, Frame
from django.urls import reverse_lazy
from account.models import UserWishlistItem
import json

class CouponSerializer(serializers.ModelSerializer):
    is_valid = serializers.SerializerMethodField()
    class Meta:
        model = Coupon
        fields = [
            'code',
            'discount_precent',
            'one_time',
            'is_valid',
        ]
    def get_is_valid(self, obj):
        request = self.context.get('request')
        valid = obj.is_valid(request.user)
        return valid
    
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
            'cover',
            'frame',
        )

class ProductListSerializer(serializers.ModelSerializer):

    url =  serializers.SerializerMethodField()

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
            'url'
            )
        
    def get_url(self, obj):
        return reverse_lazy('product:product-detail', kwargs = {'category_slug':obj.category.slug, 'product_slug':obj.slug})
 
   

class ProductSerializer(serializers.ModelSerializer):

    url =  serializers.SerializerMethodField()
    category =  serializers.SerializerMethodField()
    sizes =  serializers.SerializerMethodField()
    frames =  serializers.SerializerMethodField()
    same_products = serializers.SerializerMethodField()
    in_wish = serializers.SerializerMethodField()


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
            'same_products',
            'artist',
            'actual_price',
            'image',
            'category',
            'status',
            'description',
            'detail',
            'has_discount',
            'discount_type',
            'discount_amount',
            'in_wish',
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

    def get_same_products(self, obj):
        return [{'type': product.type, 'url':reverse_lazy('product:product-detail', kwargs = {'category_slug':product.category.slug, 'product_slug':product.slug})} 
                for product in obj.same_products]
    def get_in_wish(self, obj):
        request = self.context.get('request', None)
        if request is not None and request.user.is_authenticated:
            return UserWishlistItem.objects.filter(wishlist__user=request.user, product=obj).exists()
        elif request is not None:
            user_wishlist_items = json.loads(request.COOKIES.get('user_wishlist_items')) if request.COOKIES.get('user_wishlist_items') else []
            for item in user_wishlist_items: 
                if item['product'] == obj.id:
                    return True

        return False