from django.contrib import admin

class CustomAdminSite(admin.AdminSite):
    site_header = 'StoreGlasstechAdmin'


storeglasstech_admin_site = CustomAdminSite(name='storeglasstech_admin')