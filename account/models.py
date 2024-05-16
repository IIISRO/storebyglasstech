from django.db import models
from core.models import AbstractModel
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):

    number = models.CharField(
        max_length=17,
        null=True,
        blank=True, 
        unique = True,         
        error_messages={
            "unique": ("A user with that number already exists."),
        },)
   
    
class UserAddress(AbstractModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name = 'user_addresses')
    first_name = models.CharField(max_length=50,null=False,blank=False)
    last_name = models.CharField(max_length=50,null=False,blank=False)
    address_line = models.CharField(max_length=100,null=False,blank=False)
    region = models.CharField(max_length=100,null=False,blank=False)
    street = models.CharField(max_length=100,null=False,blank=False)
    building = models.CharField(max_length=20,null=False,blank=False)
    flat = models.CharField(max_length=20,null=False,blank=False)
    is_default = models.BooleanField(default = True)

    class Meta:
        verbose_name_plural = ("UsersAddresses")


    def __str__(self) -> str:
        return f"{self.user.number}->{self.address_line}"
    