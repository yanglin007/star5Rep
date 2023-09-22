from django.contrib import admin
from .models import RuleRfrnc, RuleMapping

# Register your models here.
admin.site.register([RuleRfrnc,RuleMapping])