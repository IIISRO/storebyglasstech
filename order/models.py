
from django.db import models
from core.models import AbstractModel
from account.models import User
from product.models import Product, Frame, Size, Coupon
from django.db.models.signals import post_save  
from django.utils import timezone

# Create your models here.


class Basket(AbstractModel):
    user = models.OneToOneField(User, unique = True, null=False, blank=False, on_delete = models.CASCADE, related_name = 'basket')
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default = False)

    def __str__(self):
        if self.user.get_full_name():
            return f'{self.user.get_full_name()} Basket'
        return f'{self.user.number} Basket'
    
    def create_basket(sender, **kwargs):
        if kwargs['created']:
            Basket.objects.create(user=kwargs['instance'])
    post_save.connect(create_basket, sender=User)

class BasketItem(AbstractModel):
    basket  = models.ForeignKey(Basket, on_delete=models.CASCADE, null=False, blank=False, related_name = 'basket_items')
    product = models.ForeignKey(Product, null=False, blank=False, on_delete = models.CASCADE)
    frame = models.ForeignKey(Frame, null=True, blank=True, on_delete = models.CASCADE)
    size = models.ForeignKey(Size, null=False, blank=False, on_delete = models.CASCADE)
    quantity =  models.PositiveIntegerField(default = 1)

    def __str__(self):
        if self.basket.user.first_name:
            return f"{self.basket.user.first_name}'s {self.product.title} in basket"
        return f"{self.basket.user.number}'s {self.product.title} in basket"
    
class Order(AbstractModel):
    STATUS = (              
        ('Preparing', 'Preparing'),
        ('Delivery', 'Delivery'),
        ('Finished', 'Finished')
    )
    PAY_METHODS = (              
        ('card', 'card'),
        ('cash', 'cash')
    )
    number = models.PositiveBigIntegerField(null=True, blank=True, unique=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name = 'user_orders')
    products = models.ManyToManyField(Product, through='OrderItem')
    discount = models.FloatField(null=True, blank=True)
    coupon = models.CharField(max_length = 10, null = True, blank = True)
    delv_fee = models.FloatField(null=True, blank=True)
    payed_amount = models.FloatField(null=True, blank=True)
    pay_method = models.CharField(max_length=10,default='card', choices=PAY_METHODS)
    first_name = models.CharField(max_length=50,null=False,blank=False)
    last_name = models.CharField(max_length=50,null=False,blank=False)
    address_line = models.CharField(max_length=100,null=False,blank=False)
    region = models.CharField(max_length=100,null=False,blank=False)
    street = models.CharField(max_length=100,null=False,blank=False)
    building = models.CharField(max_length=20,null=False,blank=False)
    flat = models.CharField(max_length=20,null=False,blank=False)
    status = models.CharField(max_length=25,default='Preparing', choices=STATUS)

    def __str__(self):
        return f"Order #{self.number} - {self.products.count()} items"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.number:
            self.number = f"{timezone.now().strftime('%d%m%y')}{self.user.pk}{self.pk}"
            self.save()
        

    @property
    def date(self):
        return self.created_at.strftime('%Y.%m.%d %H:%M')

class OrderItem(AbstractModel):
    order  = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False, related_name = 'order_items')
    product = models.ForeignKey(Product, null=False, blank=False, on_delete = models.CASCADE)
    frame = models.ForeignKey(Frame, null=False, blank=False, on_delete = models.CASCADE)
    size = models.ForeignKey(Size, null=False, blank=False, on_delete = models.CASCADE)
    image = models.TextField(null=True, blank=True)
    quantity =  models.PositiveIntegerField(default = 1)

    def __str__(self):
        return f"{self.quantity} x {self.product.title} in Order #{self.order.number}"
    
    @property
    def total(self):
        return round(self.price * self.quantity,2)