# Generated by Django 5.0.4 on 2024-07-08 11:57

import django_ckeditor_5.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_remove_product_description_remove_product_detail'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='detail',
            field=django_ckeditor_5.fields.CKEditor5Field(default=1),
            preserve_default=False,
        ),
    ]
