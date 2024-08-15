from modeltranslation.translator import translator, TranslationOptions
from .models import Product, Category, Frame

class ProductTranslationOption(TranslationOptions):
    fields=('title','description', 'detail')

class CategoryTranslationOption(TranslationOptions):
    fields=('title',)

class FrameTranslationOption(TranslationOptions):
    fields=('title',)

translator.register(Product, ProductTranslationOption) 
translator.register(Category, CategoryTranslationOption)  
translator.register(Frame, FrameTranslationOption)  
