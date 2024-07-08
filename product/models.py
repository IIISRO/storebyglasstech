from django.db import models
from core.models import AbstractModel
from django_ckeditor_5.fields import CKEditor5Field
from datetime import timedelta
from django.core.exceptions import ValidationError
from django.utils import timezone
import random
from django.template.defaultfilters import slugify



# Create your models here.


class Product(AbstractModel):
    STATUS = (
        ('True', 'True'),
        ('False', 'False'),
        ('New','New')
    )

    TYPE = (
        ('GLASS', 'GLASS'),
        ('MDF', 'MDF'),
    )
    title = models.CharField(max_length=150, null=False, blank=False)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='category_products')
    sizes = models.ManyToManyField('Size')
    frames = models.ManyToManyField('Frame',  blank=True)
    status = models.CharField(max_length=50,default='New', choices=STATUS)
    type = models.CharField(max_length=50, null=False, blank=False, choices=TYPE)
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE, related_name='artist_products')
    description = models.TextField(null=False, blank=False)
    detail = CKEditor5Field(null=False, blank=False, config_name='extends')
    image = models.ImageField(upload_to='PosterIMGs/', null=False, blank=False)
    price = models.FloatField(null=False, blank=False)
    slug = models.SlugField(null=False, unique=True)

    def __str__(self):
        return f'{self.title} - {self.type}'

    def save(self, *args, **kwargs):
       self.slug = slugify(f'{self.title} - {self.type}')
       super(Product, self).save(*args, **kwargs)
    
    def get_absolute_url(self):
        return f'{self.category.get_absolute_url()}{self.slug}/'
    
    @property
    def actual_price(self):
        if self.has_discount:
            if self.discount_type == 'Precent':
                return round(self.price - (self.price * self.discount_amount / 100), 2)
            else:
                if self.discount_amount < self.price:
                    return round(self.price - self.discount_amount, 2)
                
        return round(self.price, 2)
    
    @property
    def has_discount(self):
        if self.productdiscount_set.exists():
            current_datetime = timezone.now()
            discount = self.productdiscount_set.first()
            if (
                discount.valid_from is None or current_datetime >= discount.valid_from
            ) and (
                discount.valid_to is None or current_datetime <= discount.valid_to
            ):
                return True
            else:
                return False
        return False
    
    @property
    def discount_amount(self):
        return round(self.productdiscount_set.first().value, 2)
    @property
    def discount_type(self):
        return self.productdiscount_set.first().type
    
    
    @property
    def is_new(self):
        one_week_ago = timezone.now() - timedelta(weeks=1)
        if self.status == 'New' or self.created_at > one_week_ago:
            return True
        return False
    
    @property
    def same_products(self):
       return Product.objects.filter(title = self.title).filter(category = self.category).filter(artist = self.artist)
        

   
    

class Frame(AbstractModel):
    title=models.CharField(max_length=50)
    cover = models.ImageField(upload_to='FrameCoverIMGs/', null=False, blank=False) 
    frame = models.ImageField(upload_to='FrameIMGs/', null=False, blank=False) 

  
    def __str__(self):
        return self.title
   

class Size(AbstractModel):
    height=models.PositiveIntegerField(null=False)
    width=models.PositiveIntegerField(null=False)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.height} x {self.width} cm'
    

class Category(AbstractModel):
    title = models.CharField(max_length=150)
    slug = models.SlugField(null=False, unique=True)
    class Meta:
        verbose_name_plural = 'Categories'
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return f'{self.slug}/'
    def save(self, *args, **kwargs):
        self.title = self.title.capitalize()
        super(Category, self).save(*args, **kwargs)

    
class Artist(AbstractModel):
    full_name = models.CharField(max_length=150)

    def __str__(self):
        return self.full_name
    
    def save(self, *args, **kwargs):
        self.title = self.full_name.capitalize()
        super(Artist, self).save(*args, **kwargs)

    



class ProductDiscount(AbstractModel):
    DISCOUNT_TYPES = (
        ('Precent', 'Precent'),
        ('Amount', 'Amount')
    )
    products  = models.ManyToManyField("Product")
    type =  models.CharField(max_length=8,null=False,blank=False, choices=DISCOUNT_TYPES)
    value = models.PositiveIntegerField(null=False, blank=False)
    valid_from = models.DateTimeField(null=True, blank=True)
    valid_to = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        if self.type == 'Precent':
            return f'{self.value}%'
        else:
            return f'{self.value}AZN'
    
    
    @property
    def is_valid(self):
        current_datetime = timezone.now()
        if (
            self.valid_from is None or current_datetime >= self.valid_from
        ) and (
            self.valid_to is None or current_datetime <= self.valid_to
        ):
            return True
        else:
            return False
        
class Coupon(AbstractModel):
   
    code = models.CharField(max_length=10, unique=True, null=True, blank=True)
    discount_precent = models.PositiveIntegerField(null=False, blank=False)
    one_time = models.BooleanField()
    valid_from = models.DateTimeField(null=True, blank=True)
    valid_to = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.code
    
    @classmethod
    def generate_unique_code(cls):
        min_length = 5
        max_length = 10
        choices = ['1','2','3','4','5','6','7','8','9','0','glass','storeglass','glasstech','byglass']
        while True:
            
        
            code_length = random.randint(min_length, max_length)
            random_code = ''.join(random.choices(choices, k=code_length))
            
            if not cls.objects.filter(code=random_code[:10]).exists():
                return random_code[:10]   
    
            
    
    def save(self, *args, **kwargs):
        if self.code is None:
            self.code = self.generate_unique_code().upper()
        else:
            self.code =  self.code.upper()

        super(Coupon, self).save(*args, **kwargs)
    
    def is_valid(self, user):
        current_datetime = timezone.now()
        if (
            self.valid_from is None or current_datetime >= self.valid_from
        ) and (
            self.valid_to is None or current_datetime <= self.valid_to
        ):
            if self.one_time:
                if self.used.all().exists():
                    return False, 'Used'
            else:
                if not user.is_authenticated:
                    return False, 'Authentication required!'

                if self.used.filter(user=user).exists():
                    return False, 'Used'
             
            return True, 'Valid'
            
        else:
            return False, 'Expired'
        
from account.models import  User
    
class UsedCoupon(AbstractModel):
    coupon = models.ForeignKey("Coupon", null = False, blank = False, on_delete = models.CASCADE, related_name = 'used')
    user = models.ForeignKey(User, null = True, blank = True, on_delete = models.SET_NULL)

    def __str__(self):
        return f'Coupon: {self.coupon.code} | User: {self.user.get_full_name() if self.user else "Anonymous User"}'