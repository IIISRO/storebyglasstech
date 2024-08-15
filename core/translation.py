from modeltranslation.translator import translator, TranslationOptions
from .models import SliderIMG

class SliderTranslationOption(TranslationOptions):
    fields=('header','text', 'btn_text')


translator.register(SliderIMG, SliderTranslationOption)  
