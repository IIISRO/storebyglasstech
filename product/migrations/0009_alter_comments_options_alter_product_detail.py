# Generated by Django 5.0.4 on 2024-08-12 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_comments'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comments',
            options={'verbose_name_plural': 'Comments'},
        ),
        migrations.AlterField(
            model_name='product',
            name='detail',
            field=models.TextField(),
        ),
    ]
