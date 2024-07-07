# serializers.py
from rest_framework import serializers
from order.models import BasketItem, Basket, Order, OrderItem
from product.api.serializers import ProductSerializer, CouponSerializer
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
    class Meta:
        model = BasketItem
        fields = (
            'id',
            'product', 
            'quantity'
            )
    
    def get_product(self, obj):
        if isinstance(obj, dict):
            return ProductSerializer(Product.objects.get(pk=obj['product'])).data
        return ProductSerializer(obj.product).data

class BasketSerializer(serializers.ModelSerializer):
    items =  serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    class Meta:
        model = Basket
        fields =  [
            'coupon',
            'items'
        ]
    
    def get_items(self, obj):
        # eger login deyilse similasiya  modeldir  yeni  dict
        if type(obj) == dict:
            items = obj['basket_items']
            return GetBasketItemSerializer(items, many = True).data
        
        items = obj.basket_items.all().order_by('created_at')
        return GetBasketItemSerializer(items, many = True).data
    def get_coupon(self, obj):
        if isinstance(obj, Basket):
            if obj.coupon:
                return CouponSerializer(obj.coupon, context = self.context).data
            return None
        if obj['coupon']:
            return CouponSerializer(Coupon.objects.get(id=obj['coupon']), context = self.context).data
        return None

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = (
            'product', 
            'quantity',
            'price'
            )
    def get_product(self, obj):
        return obj.product.title
    
class GetOrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'number',
            'products',
            'discount', 
            'coupon',
            'delv_fee',
            'payed_amount',
            'pay_method',
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
        return OrderItemSerializer(obj.orderitem_set.all(), many=True).data
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
   