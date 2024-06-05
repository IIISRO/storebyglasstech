from django.db import models
from core.models import AbstractModel
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save  
from product.models import Product

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
    
class UserWishlist(AbstractModel):
    user = models.OneToOneField(User, unique = True, null=False, blank=False, on_delete = models.CASCADE, related_name = 'wishlist')
   
    def __str__(self):
        if self.user.get_full_name():
            return f'{self.user.get_full_name()} Wishlist'
        return f'{self.user.number} Wishlist'
    
    def create_basket(sender, **kwargs):
        if kwargs['created']:
            UserWishlist.objects.create(user=kwargs['instance'])
    post_save.connect(create_basket, sender=User)

class UserWishlistItem(AbstractModel):
    wishlist  = models.ForeignKey(UserWishlist, on_delete=models.CASCADE, null=False, blank=False, related_name = 'wish_items')
    product = models.ForeignKey(Product, null=False, blank=False, on_delete = models.CASCADE)
  

    def __str__(self):
       
        return f"{self.wishlist.user.number}'s {self.product.title} in wish"