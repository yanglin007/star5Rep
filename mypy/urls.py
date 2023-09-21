"""
URL configuration for mypy project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from pdfai import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('test',views.test11),
    path('addRule',views.addRule),
    path('editRule',views.editRules),
    path('getRule',views.getRules),
    path('getRulesMapping',views.getRulesMapping),
    path('uploadFile',views.uploadFile),
    path('getHandler',views.getHandler),
    path('addLib',views.addLib),
    path('saveWf',views.saveWorkFlow),
    path('runWf',views.runWorkFlow),
    path("getWf",views.getWorkFlow),
    path("cogsearch",views.cogsearch),
    path("getLib",views.getLib)
]
