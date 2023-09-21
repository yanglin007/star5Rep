import json
from django.middleware.common import MiddlewareMixin
from .baseResponse import BaseResponse
from django.http import JsonResponse
from django.core import serializers
import traceback

class ExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        print("---------exception-----", traceback.print_exc())
        return BaseResponse.failed("Something went wrong, please check.")

def getReqParamValue(request,param):
    if request.method == 'GET':
        return request.GET.get(param)
    else:
        return json.loads(request.body).get(param)
    
def getFieldData(data):
    if data == "null-flag":
        return None
    return data