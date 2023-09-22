import json
from django.http import JsonResponse
from django.db.models.query import QuerySet

class BaseResponse():
    def __init__(self, code, data, msg) -> None:
        self.code = code #1 success, 2 failed
        self.data = data
        self.msg = msg
    
    @staticmethod
    def success(data = None):
        print ("--fff--",isinstance(data, QuerySet),type(data),data)
        if isinstance(data, QuerySet):
           return JsonResponse(BaseResponse(1,list(data.values()),"success").__dict__,safe=False)
        br = BaseResponse(1, data,"success")
        return JsonResponse(br.__dict__ )
    
    @staticmethod
    def failed(msg):
        br = BaseResponse(0, None,msg)
        return JsonResponse(br.__dict__)
