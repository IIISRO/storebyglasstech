from django.contrib import admin
from storebyglasstech.storeglasstech_admin import  storeglasstech_admin_site
import admin_thumbnails
from .models import Product, Frame, Size, Category, Artist, ProductDiscount, Coupon, UsedCoupon, Comments
from django_ckeditor_5.widgets import CKEditor5Widget
from django.db import models
from modeltranslation.admin import TranslationAdmin

# Register your models here.

@admin_thumbnails.thumbnail('image')
class ProductAdmin(TranslationAdmin):
    list_display = ['title','image_thumbnail']
    readonly_fields = ('actual_price',)
    prepopulated_fields = {'slug': ('title',)}
    formfield_overrides = {
      models.TextField: {'widget': CKEditor5Widget},
    }


class CategoryAdmin(TranslationAdmin):
    list_display = ['title']
    prepopulated_fields = {'slug': ('title',)}

class ProductDiscountAdmin(admin.ModelAdmin):
    filter_horizontal = ('products',)

@admin_thumbnails.thumbnail('image')
class FrameAdmin(TranslationAdmin):
    list_display = ['title','image_thumbnail']



storeglasstech_admin_site.register(ProductDiscount, ProductDiscountAdmin)
storeglasstech_admin_site.register(Coupon)
storeglasstech_admin_site.register(UsedCoupon)
storeglasstech_admin_site.register(Product, ProductAdmin)
storeglasstech_admin_site.register(Frame, FrameAdmin)
storeglasstech_admin_site.register(Size)
storeglasstech_admin_site.register(Category, CategoryAdmin)
storeglasstech_admin_site.register(Artist)
storeglasstech_admin_site.register(Comments)

