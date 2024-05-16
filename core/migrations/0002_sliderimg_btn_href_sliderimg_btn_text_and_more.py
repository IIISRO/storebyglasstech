# Generated by Django 5.0.4 on 2024-05-16 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sliderimg',
            name='btn_href',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sliderimg',
            name='btn_text',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sliderimg',
            name='header',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sliderimg',
            name='text',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
