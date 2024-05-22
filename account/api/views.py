from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, ListAPIView
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, UserAddressSerializer
from rest_framework.decorators import api_view
from account.models import User
from account.helpers import create_and_send_password
from django.contrib.auth.hashers import check_password
from account.models import UserAddress


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
        print(request.data)
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
