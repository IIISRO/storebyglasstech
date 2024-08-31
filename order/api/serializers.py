# serializers.py
from rest_framework import serializers
from order.models import BasketItem, Basket, Order, OrderItem
from product.api.serializers import ProductSerializer, CouponSerializer, ProductFrameSerializer, ProductSizeSerializer
from product.models import Product, Coupon

class BasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = (
            'product', 
            'size',
            'frame',
            'quantity',
            )

class GetBasketItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    frame = serializers.SerializerMethodField()

    class Meta:
        model = BasketItem
        fields = (
            'id',
            'product', 
            'size',
            'frame',
            'item_price',
            'item_actual_price',
            'quantity'
            )
    
    def get_product(self, obj):
        return ProductSerializer(obj.product).data
    
    def get_size(self, obj):
        self.context['product'] = obj.product
        return ProductSizeSerializer(obj.size, context = self.context).data
    
    def get_frame(self, obj):
        return ProductFrameSerializer(obj.frame).data

class BasketSerializer(serializers.ModelSerializer):
    items =  serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    basket_price = serializers.SerializerMethodField()
    basket_actual_price = serializers.SerializerMethodField()

    class Meta:
        model = Basket
        fields =  [
            'coupon',
            'items',
            'basket_price',
            'basket_actual_price',

        ]
    
    def get_items(self, obj):
       
        items = obj.basket_items.all().order_by('created_at')
        return GetBasketItemSerializer(items, many = True).data
    
    def get_coupon(self, obj):
        if obj.coupon:
            return CouponSerializer(obj.coupon, context = self.context).data
        return None
    
    def get_basket_price(self, obj):
        basket_price = sum(item.item_price * item.quantity for item in obj.basket_items.all())
        return round(basket_price, 2)
    def get_basket_actual_price(self, obj):
        basket_actual_price = sum(item.item_actual_price * item.quantity for item in obj.basket_items.all())
        request = self.context.get('request')

        if obj.coupon and obj.coupon.is_valid(request.user)[0]:
            basket_actual_price -= (basket_actual_price * obj.coupon.discount_precent) / 100
        return round(basket_actual_price, 2)
        
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    frame = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = (
            'id',
            'product', 
            'size',
            'frame',
            'item_price',
            'item_actual_price',
            'quantity'
            )
    
    def get_product(self, obj):
        return ProductSerializer(obj.product).data
    
    def get_size(self, obj):
        self.context['product'] = obj.product
        return ProductSizeSerializer(obj.size, context = self.context).data
    
    def get_frame(self, obj):
        return ProductFrameSerializer(obj.frame).data
    
class GetOrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'number',
            'products',
            'used_coupon',
            'delv_fee',
            'order_price',
            'order_actual_price',
            'first_name',
            'last_name',
            'address_line',
            'region',
            'street',
            'building',
            'flat',
            'status',
            'date',
            'user'
        )
    def get_products(self, obj):
        return OrderItemSerializer(obj.order_items.all(), many=True).data
    def get_user(self, obj):
        user = {
            'number': obj.user.number,
            'first_name': obj.user.first_name,
            'last_name': obj.user.last_name,
            'email': obj.user.email
        }
        return user

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
   