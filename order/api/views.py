# views.py
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from rest_framework.response import Response
from order.models import Basket, BasketItem, Order
from .serializers import BasketItemSerializer, BasketSerializer, GetOrderSerializer, OrderSerializer
from product.models import Product, Coupon, Frame, Size
from rest_framework.views import APIView
import json
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from  datetime import date

class BasketAPIView(APIView):
    http_method_names = ["get"]
    def get(self, request, *args, **kwarg):
        # eger  login deyilse basket modelinii simulasiya edir ve cookideki itemleri  qaytarir
        if not request.user.is_authenticated:
            user_basket_items = json.loads(request.COOKIES.get('user_basket_items')) if request.COOKIES.get('user_basket_items') else []
            basket_coupon = int(request.COOKIES.get('basket_coupon')) if request.COOKIES.get('basket_coupon') else None
            basket = {
                'coupon': basket_coupon,
                'basket_items': user_basket_items
            }
            serializer = BasketSerializer(basket, context={'request':request})
            return Response(serializer.data, status=HTTP_200_OK)
            
        basket = request.user.basket
        serializer = BasketSerializer(basket, context={'request':request})
        return Response(serializer.data, status=HTTP_200_OK)



class AddBasketAPIView(CreateAPIView):
    http_method_names = ["post"]
    serializer_class = BasketItemSerializer
    permission_classes = (IsAuthenticated,)


    def create(self, request, *args, **kwargs):
        #basket item  datasi 
        basket_item_data = request.data
        serializer = BasketItemSerializer(data=basket_item_data)

        if serializer.is_valid():
            # serializerden kecmish data
            serialized_data = serializer.data

            user_basket,s = Basket.objects.get_or_create(user=request.user)

            product_id = serialized_data['product']
            size_id = serialized_data['size']
            frame_id = serialized_data['frame']
            quantity = serialized_data['quantity']
            # productu  tapir  userin basketindeki  butun  itemsleri cagirib check  edir  yoxdusa  yaradir
            product = Product.objects.get(id=product_id)
            frame = Frame.objects.get(id=frame_id) if frame_id else  None
            size = Size.objects.get(id=size_id)

            basket_items = user_basket.basket_items.all()
            basket_item, created = basket_items.get_or_create(basket = user_basket, product=product, frame=frame, size=size)
            
            # eger item var ise yeni  sayi toplayir save edir yoxdusa sayina beraber edir ssave  edir
            if not created:
                basket_item.quantity += int(quantity)
                basket_item.save()
            else:
                basket_item.quantity = int(quantity)
                basket_item.save()
            # basket modelini response verir
            basket_serializer = BasketSerializer(user_basket, context={'request':request})
            return Response(basket_serializer.data, status=HTTP_201_CREATED)
            
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
       
    
class RemoveBasketAPIView(DestroyAPIView):
    http_method_names = ["delete"]
    serializer_class = BasketItemSerializer
    queryset = BasketItem
    
    
class UpdateBasketAPIView(UpdateAPIView):
    http_method_names = ["patch"]
    serializer_class = BasketItemSerializer
    queryset = BasketItem

   
    


        
@api_view(['POST'])
def basket_coupon_api(request):
    action = request.data.get('action')
    if action == "apply":
        code = request.data.get('code')
        coupon = get_object_or_404(Coupon, code = code)
        user = request.user
        valid, reason = coupon.is_valid(user)

        if valid:
            if user.is_authenticated:
                basket = user.basket
               
                basket.coupon = coupon
                basket.save()
                return Response('Coupon applied!', status=HTTP_201_CREATED)
            
            
            response =  Response('Coupon applied!', status=HTTP_201_CREATED)
            response.set_cookie('basket_coupon', coupon.id)
            return response
        return Response(reason, status=HTTP_400_BAD_REQUEST)
    elif action == 'remove':

        if request.user.is_authenticated:
            basket = request.user.basket
            basket.coupon = None
            basket.save()
            return Response('Removed', status=HTTP_204_NO_CONTENT)
        

        
        response = Response(status=HTTP_204_NO_CONTENT)
        response.delete_cookie('basket_coupon')
        return response
    else:
        return Response('some things wrong', status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkout_items_summary(request):    
    user = request.user
    basket = user.basket
    summary = {
        'coupon':{
            'status':False,
            'code':'',
            'precent': 0
        },
        'discount':0.0,
        'subtotal':0.0,
    }
    for item in basket.basket_items.all():
        summary['subtotal'] += round(item.product.actual_price * item.quantity, 2)
        if item.product.has_discount:
            summary['discount'] += round((item.product.price - item.product.actual_price) * item.quantity, 2)
    if basket.coupon and basket.coupon.is_valid(user)[0]:
        coupon_save = round(summary['subtotal'] * basket.coupon.discount_precent / 100, 2)
        summary['discount'] = round(summary['discount'] + coupon_save, 2)
        summary['subtotal'] = round(summary['subtotal'] - coupon_save, 2)
        summary['coupon']['status']=True
        summary['coupon']['code']=basket.coupon.code
        summary['coupon']['precent']=basket.coupon.discount_precent


    return Response(summary, status=HTTP_200_OK)

class OrderListAPIView(APIView):
    http_method_names = ["get"]
    def get(self, request, *args, **kwarg):
        daily_finished_orders = Order.objects.filter(created_at__date = date.today()).filter(status = 'Finished').order_by('-created_at')
        ondelivery_orders = Order.objects.filter(status = 'Delivery').order_by('-created_at')
        new_orders = Order.objects.filter(status = 'Preparing').order_by('-created_at')
        
        orders = {
            'daily_finished_orders': GetOrderSerializer(daily_finished_orders, many=True).data,
            'ondelivery_orders': GetOrderSerializer(ondelivery_orders, many=True).data,
            'new_orders': GetOrderSerializer(new_orders, many=True).data
        }

        
        return Response(orders, status=HTTP_200_OK)
    
class UpdateOrderAPIView(UpdateAPIView):
    http_method_names = ["patch"]
    serializer_class = OrderSerializer
    queryset = Order