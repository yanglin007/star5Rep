from .models import RuleRfrnc, RuleMapping
from .baseResponse import BaseResponse
from django.http import JsonResponse, HttpResponse
import pandas as pd
import os
from django.db import transaction
from azure.storage.blob import BlobServiceClient,BlobClient
import os
from . import handle
from .utils import getFieldData
from django.core import serializers
import json


@transaction.atomic
def addRules(request):
     #    print ("-----------",request.read())
        fl = request.FILES.get("file")   
        rule_name = request.POST['rule_name']
        try:
            unique_object = RuleRfrnc.objects.get(rule_name=rule_name)
        except RuleRfrnc.DoesNotExist:
            unique_object = None

        if unique_object == None: #should be transaction
            new_rule = RuleRfrnc(rule_name = rule_name)
            new_rule.save()
            rf = RuleRfrnc.objects.get(rule_name=rule_name)
            # file_path = os.path.dirname(os.path.abspath(__file__))
            # base_path = os.path.join(file_path, 'rm.xlsx')
            # df = pd.read_excel(file) 
            df = pd.read_excel(fl)
            df = df.fillna("null-flag")
            for index, row in df.iterrows(): 
                    rm = RuleMapping(rule_id =rf.rule_id, source_column = row["source"],dest_column = row["destination"], handler = getFieldData(row["handler"]))
                    rm.save()
            return BaseResponse.success()
        else:
            return BaseResponse.failed("This rule name is existed.")

def editRules(request):
     ruleList = json.loads(request.body)
     for item in ruleList:
          rm = RuleMapping.objects.get(id = item["id"])
          rm["source"] = item["source"]
          rm.save()

     return BaseResponse.success()

def getRules(request):
     return BaseResponse.success(RuleRfrnc.objects.all())

def getRulesMappingById(request):
     rule_id = json.loads(request.body).get("rule_id")
     return BaseResponse.success(RuleMapping.objects.filter(rule_id=rule_id))

def getHandlers(request):
    functionNames = [mh for mh in dir(handle) if callable(getattr(handle, mh))]
    print("---",functionNames)
    return BaseResponse.success(functionNames)

def uploadHandlers(request):
    file = request.POST["file"]
    if (file.name.endswith("py")):
      with open(file,"r") as f1:
           content = f1.read()
           file_path = os.path.dirname(os.path.abspath(__file__))
           base_path = os.path.join(file_path, 'handle.py')
           with open(base_path, 'a+') as f:
                f.write(content)  
    else:
         return BaseResponse.failed("please upload a .py file.")
    return BaseResponse.success()

@transaction.atomic
def test1(request):
     file_path = os.path.dirname(os.path.abspath(__file__))
     base_path = os.path.join(file_path, 'tt.py')
    
     with open(base_path,"r") as f1:
               content = f1.read()
               file_path = os.path.dirname(os.path.abspath(__file__))
               base_path = os.path.join(file_path, 'handle.py')
               with open(base_path, 'a+') as f:
                    f.write(content)  
  
     return BaseResponse.success()
     #     new_rule = RuleRfrnc(rule_name = "excel_order")
#     new_rule.save()
#     rf = RuleRfrnc.objects.get(rule_name="excel_order")
#     file_path = os.path.dirname(os.path.abspath(__file__))
#     base_path = os.path.join(file_path, 'rm.xlsx')
#     # df = pd.read_excel(file) 
#     df = pd.read_excel(base_path)
#     df = df.fillna("null-flag")
#     for index, row in df.iterrows(): 
#           rm = RuleMapping(rule_id =rf.rule_id, source_column = row["source"],dest_column = row["destination"], handler = getFieldData(row["handler"]))
#           rm.save()
#     return BaseResponse.success()

