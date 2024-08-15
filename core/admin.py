from django.contrib import admin
from storebyglasstech.storeglasstech_admin import  storeglasstech_admin_site
import admin_thumbnails
from .models import SliderIMG
from modeltranslation.admin import TranslationAdmin

# Register your models here.

@admin_thumbnails.thumbnail('image')
class SliderAdmin(TranslationAdmin):
    list_display = ['header','image_thumbnail']





storeglasstech_admin_site.register(SliderIMG, SliderAdmin)
