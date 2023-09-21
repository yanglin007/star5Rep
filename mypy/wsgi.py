"""
WSGI config for mypy project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from pdfai import env

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mypy.settings')
env.init()
application = get_wsgi_application()
