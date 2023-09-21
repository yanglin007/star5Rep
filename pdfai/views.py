from django.shortcuts import render
from .llmRequest import parseLLMRequest
from .azureSearch import cognitiveSearch
from .rules import test1, addRules,getRules,getRulesMappingById, editRules, getHandlers
from .uploadFile import uploadFiles1, uploadFiles
from .cogSearch import addLibs, saveWf,runWf,getWf, getLibs

# Create your views here.
def llmRequest(request):
    return parseLLMRequest(request)

def cogsearch(request):
    return cognitiveSearch(request)

def addRule(request):
    return addRules(request)

def editRule(request):
    return editRules(request)

def getRule(request):
    return getRules(request)

def getRulesMapping(request):
    return getRulesMappingById(request)

def uploadFile(request):
    return uploadFiles1(request)

def getHandler(request):
    return getHandlers(request)

def addLib(request):
    return addLibs(request)

def addLib(request):
    return addLibs(request)

def saveWorkFlow(request):
    return saveWf(request)

def runWorkFlow(request):
    return runWf(request)

def getWorkFlow(request):
    return getWf(request)

def getLib(request):
    return getLibs(request)


