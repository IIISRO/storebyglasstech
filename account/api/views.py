from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView 
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import UserSerializer, UserAddressSerializer, UserWishlistItemSerializer, UserWishlistSerializer
from rest_framework.decorators import api_view
from account.models import User
from account.helpers import create_and_send_password
from django.contrib.auth.hashers import check_password
from account.models import UserAddress, UserWishlist,  UserWishlistItem
import json
from product.models import Product

@api_view(['POST'])
def get_or_create_user(request):
    number = request.data.get('number')

    user = User.objects.filter(number = number)
    
    if user.exists():
        user = user.first()
        return Response('User exist', status=HTTP_200_OK)
    
    user = User.objects.create(number = number, username = number.replace('+994','0').replace(' ',''))

    if create_and_send_password(user):
        return Response('User created and pass sended', status=HTTP_201_CREATED)
    return Response('Error', status=HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
def create_and_send_new_password(request):
    number = request.data.get('number')
    user = User.objects.filter(number = number)
    
    if not user.exists():
        return Response('User not exist', status=HTTP_400_BAD_REQUEST)
    
    user = user.first()
    if create_and_send_password(user):
        return Response('New password sended!', status=HTTP_200_OK)
    return Response('Error', status=HTTP_400_BAD_REQUEST)
    
    
class UpdateUserDataAPIView(UpdateAPIView):
    http_method_names = ["patch"]
    serializer_class = UserSerializer
    queryset = User
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
def change_password(request, pk):
    user = User.objects.filter(pk = pk)
    
    if not user.exists():
        return Response('User not exist', status=HTTP_404_NOT_FOUND)
    
    old_password = request.data['old_password']
    new_password = request.data['new_password']
    user = user.first()
    if not check_password(old_password, user.password):
        return Response('Password not match!', status=HTTP_400_BAD_REQUEST)
    user.set_password(new_password)
    user.save()
    return Response('Password changed!', status=HTTP_200_OK)

class CreateNewAddressAPIView(CreateAPIView):
    queryset = UserAddress
    serializer_class = UserAddressSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        user_addresses = request.user.user_addresses.all().order_by('-created_at')
        serializer = UserAddressSerializer(user_addresses, many = True)
        return Response(serializer.data, status=HTTP_201_CREATED)

class UpdateAddressAPIView(UpdateAPIView):
    http_method_names = ["patch"]
    serializer_class = UserAddressSerializer
    queryset = UserAddress

    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        
        user_addresses = UserAddress.objects.filter(user = self.get_object().user).order_by('-created_at')
        serializer = UserAddressSerializer(user_addresses, many = True)
        return Response(serializer.data)

@api_view(['POST'])
def set_default_address(request, pk):
    address = UserAddress.objects.get(pk = pk)
    default_addresses = UserAddress.objects.filter(user = address.user)
    for default_address in default_addresses:
        default_address.is_default = False
        default_address.save()
    address.is_default = True
    address.save()
    user_addresses = UserAddress.objects.filter(user = address.user).order_by('-created_at')
    serializer = UserAddressSerializer(user_addresses, many = True)
    return Response(serializer.data)


class DeleteAddressAPIView(DestroyAPIView):
    http_method_names = ["delete"]
    serializer_class = UserAddressSerializer
    queryset = UserAddress

    def delete(self, request, *args, **kwargs):
        removing_address = self.get_object()
        if removing_address.is_default:
            address = UserAddress.objects.filter(user = removing_address.user).filter(is_default = False).order_by('-created_at').first()
            if address:
                address.is_default = True
                address.save()
        return super().delete(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        user = self.get_object().user
        super().destroy(request, *args, **kwargs)
        user_addresses = UserAddress.objects.filter(user = user).order_by('-created_at')
        serializer = UserAddressSerializer(user_addresses, many = True)
        return Response(serializer.data)




class AddWishlistAPIView(CreateAPIView):
    http_method_names = ["post"]
    serializer_class = UserWishlistItemSerializer

    def create(self, request, *args, **kwargs):
        #basket item  datasi 
        basket_item_data = request.data
        serializer = UserWishlistItemSerializer(data=basket_item_data)

        if serializer.is_valid():
            # serializerden kecmish data
            serialized_data = serializer.data

            if not request.user.is_authenticated:
                
                # login  deyilse user respone yadilir ve cokiden user_wishlist_itemsleri cekmeye  calisir gelmese bos  list  verilir
                response = Response(status=HTTP_200_OK)
                user_wishlist_items = json.loads(request.COOKIES.get('user_wishlist_items')) if request.COOKIES.get('user_wishlist_items') else []

                # eger gelse  gelen datani yoxlayir
                if user_wishlist_items:
                    serialized_data['id'] = user_wishlist_items[-1]['id'] + 1
                    exist_item = False
                    # data varsa  onu  user_wishlist_items hecne etmir
                    for item in user_wishlist_items: 
                        if item['product'] == serialized_data['product']:
                            exist_item = True
                            break
                    # eger yoxdursa yeni item yaradir
                    if not exist_item:
                        user_wishlist_items.append(serialized_data)
                # user_wishlist_items ilkdefe  yaranirssa ilk items yaradilir
                else:
                    serialized_data['id'] = 1
                    user_wishlist_items.append(serialized_data)

                # basket modelini  simulatsiya  eden dictt yaranir
                wishlist = {
                    'user_wishlist_items': user_wishlist_items
                }
                # response olaraq wishlist modelinin cokiedeki itemler ile response  simuliasiya  edilir ve cookie data yazilir
                response = Response(status=HTTP_201_CREATED)
                response.set_cookie('user_wishlist_items', json.dumps(user_wishlist_items))
                basket_serializer = UserWishlistSerializer(wishlist, context={'request':request})
                response.data = basket_serializer.data
                return response
            # user logindirse  onun  basketinin  olub olmadigini  yoxlayir  yoxdursa  yaradir
            else:
                
                user_wishlist,s = UserWishlist.objects.get_or_create(user=request.user)

                product_id = serialized_data['product']
                # productu  tapir  userin basketindeki  butun  itemsleri cagirib check  edir  yoxdusa  yaradir
                product = Product.objects.get(id=product_id)
                wishlist_items = user_wishlist.wish_items.all()
                wish_items, created = wishlist_items.get_or_create(wishlist = user_wishlist, product=product)
                
              
                # basket modelini response verir
                basket_serializer = UserWishlistSerializer(user_wishlist, context={'request':request})
                return Response(basket_serializer.data, status=HTTP_201_CREATED)
            
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
       
    
class RemoveWishlistAPIView(APIView):
    http_method_names = ["post"]
    def post(self, request, pk, *args, **kwargs):
        # eger logindirse default silir
        if request.user.is_authenticated:
            item = UserWishlistItem.objects.get(wishlist__user=request.user, product__id = pk)
            item.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        # eks halda cookide tapib silir
        user_wishlist_items = json.loads(request.COOKIES.get('user_wishlist_items')) if request.COOKIES.get('user_wishlist_items') else []
        if user_wishlist_items:
            for item in user_wishlist_items: 
                if item['product'] == pk:
                    user_wishlist_items.remove(item)
                    response = Response(status=HTTP_204_NO_CONTENT)
                    response.set_cookie('user_wishlist_items', json.dumps(user_wishlist_items))
                    break
            return response
        return Response(status=HTTP_404_NOT_FOUND)
    

class WishlistAPIView(APIView):
    http_method_names = ["get"]
    def get(self, request, *args, **kwarg):
        # eger  login deyilse basket modelinii simulasiya edir ve cookideki itemleri  qaytarir
        if not request.user.is_authenticated:
            user_wishlist_items = json.loads(request.COOKIES.get('user_wishlist_items')) if request.COOKIES.get('user_wishlist_items') else []
            wishlist = {
                'user_wishlist_items': user_wishlist_items
            }
            serializer = UserWishlistSerializer(wishlist, context={'request':request})
            return Response(serializer.data, status=HTTP_200_OK)
            
        wishlist = request.user.wishlist
        serializer = UserWishlistSerializer(wishlist, context={'request':request})
        return Response(serializer.data, status=HTTP_200_OK)

@api_view(['GET']) 
def get_all_wish_item_number(request):
    if request.user.is_authenticated:
       return Response({'wish_count':request.user.wishlist.wish_items.count()}, status=HTTP_200_OK)
   
    user_wishlist_items = json.loads(request.COOKIES.get('user_wishlist_items')) if request.COOKIES.get('user_wishlist_items') else []
    return Response({'wish_count':len(user_wishlist_items)}, status=HTTP_200_OK)


