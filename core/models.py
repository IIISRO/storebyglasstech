from django.db import models

# Create your models here.
class AbstractModel(models.Model):
    created_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)

    class Meta:
        abstract=True

class SliderIMG(AbstractModel):
    image = models.ImageField(upload_to='SliderIMGs/')
    header = models.CharField(max_length=100, null=False)
    text = models.CharField(max_length=100, null=False)
    btn_text = models.CharField(max_length=100, null=False)
    btn_href = models.TextField(null=False)



    def  __str__(self):
        return f'{self.image} {self.id}'