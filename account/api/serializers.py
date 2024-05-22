# serializers.py
from rest_framework import serializers
from account.models import User, UserAddress


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