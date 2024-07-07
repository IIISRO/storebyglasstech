# serializers.py
from rest_framework import serializers
from account.models import User, UserAddress,  UserWishlistItem, UserWishlist
from product.api.serializers import ProductSerializer
from product.models import Product

class UserSerializer(serializers.ModelSerializer):
    class Meta:
            model = User
            fields = (
                'first_name', 
                'last_name',
                'email',
                'number',
            )



class UserAddressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
            model = UserAddress
            fields = '__all__'

    def validate(self, attrs):
        request = self.context['request']
        attrs['user'] = request.user
        default_addresses = UserAddress.objects.filter(user = request.user).filter(is_default = True)
        for default_address in default_addresses:
            default_address.is_default=False
            default_address.save()
        return super().validate(attrs)
    
class UserWishlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWishlistItem
        fields = (
            'product', 
            )

class GetWishlistItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    class Meta:
        model = UserWishlistItem
        fields = (
            'id',
            'product', 
            )
    
    def get_product(self, obj):
        if isinstance(obj, dict):
            return ProductSerializer(Product.objects.get(pk=obj['product'])).data
        return ProductSerializer(obj.product).data

class UserWishlistSerializer(serializers.ModelSerializer):
    items =  serializers.SerializerMethodField()
    class Meta:
        model = UserWishlist
        fields =  [
            'items'
        ]
    
    def get_items(self, obj):
        # eger login deyilse similasiya  modeldir  yeni  dict
        if type(obj) == dict:
            items = obj['user_wishlist_items']
            return GetWishlistItemSerializer(items, many = True).data
        
        items = obj.wish_items.all().order_by('created_at')
        return GetWishlistItemSerializer(items, many = True).data
