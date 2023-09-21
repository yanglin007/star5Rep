from .env import init
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from django.http import JsonResponse
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.question_answering import load_qa_chain
import json
from . import env

from langchain.vectorstores import AzureSearch
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
import os
from langchain.vectorstores import Pinecone
from .env import init
from .models import Workflow, Libs
from .baseResponse  import BaseResponse
from django.db.models import Max
from .export import *

class AppHelper():

   store = None
   @classmethod
   def getStore(cls):
      if(not cls.store):
          cls.store = AzureSearch(
               azure_search_endpoint=os.environ.get("AZURE_SEARCH_ENDPOINT"),
               azure_search_key=os.environ.get("AZURE_SEARCH_API_KEY"),
               index_name=os.environ.get("AZURE_SEARCH_INDEX_NAME"),
               embedding_function=OpenAIEmbeddings().embed_query
          )
      return cls.store

def chatWf(request) :
    question =  request.POST.get["question"]
    wfs = question.split(",")
    answer =[]
    llm = ChatOpenAI(temperature =0.0)
    chain = load_qa_chain(llm, chain_type="stuff")
    
    # query = json.loads(request.body).get("prompt")
    #"What is the collect stage of data maturity?"
    for query in wfs:
        docs = AppHelper.getStore().similarity_search(query)
        answer.append[chain.run(input_documents=docs,question=query)]
    print(answer)
    return JsonResponse({"answer":answer})

def saveWf(request):
    params = json.loads(request.body)
    wf_name = params["wf_name"]
    wf_desc = params["wf_desc"]
    libs = params["libs"]
    max_wf_id = Workflow.objects.aggregate(Max('work_flow_id'))
    i = 0
    for item in libs:
        i = i +1
        wf = Workflow(work_flow_id = max_wf_id + 1,order_num =i,work_flow_name=wf_name,work_flow_desc=wf_desc,lib_id= item.lib_id)
        wf.save()

def getWf(request):
    wfs = Workflow.objects.values("work_flow_id","work_flow_name","work_flow_desc").distinct()
    return JsonResponse(BaseResponse(1,list(wfs.values("work_flow_id","work_flow_name","work_flow_desc","create_user","node_list","edge_list")),"success").__dict__,safe=False)

def runWf(request):
    wf_id = json.loads(request.body).get("wf_id")
    if wf_id != None: # run exised work flow
        qs = Workflow.objects.filter(work_flow_id=wf_id).order_by("order_num")
        i = 0
        for wf in qs:
           lib = Libs.objects.get(lib_id = wf.lib_id)
           if i==0:
               previous = eval(lib.lib_func)()
               i=i+1
           else:
               previous=eval(lib.lib_func)(previous)
    else:
        libs = json.loads(request.body)["libs"]
        i =0
        for lib in libs:
            if i==0:
                previous = eval(lib["lib_func"])()
                i = i +1
            previous = eval(lib["lib_func"])(previous)

    return BaseResponse.success()


def getLibs(request):
    return BaseResponse.success(Libs.objects.all())


def addWf():
    wf = Workflow(work_flow_id = 1,order_num =1,work_flow_name="wf_01",work_flow_desc="wf_desc",lib_id= 2)
    wf.save()
    wf = Workflow(work_flow_id = 1,order_num =2,work_flow_name="wf_01",work_flow_desc="wf_desc",lib_id= 3)
    wf.save()

def addLibs(request):
    lib = Libs(lib_name='Get Data from Excel',lib_func='getDataFromExcel')
    lib.save()
    lib = Libs(lib_name='Get Data from Database',lib_func='getDataFromDb')
    lib.save()
    lib = Libs(lib_name='Get Data from Image',lib_func='getDataFromImages')
    lib.save()
    lib = Libs(lib_name='Export Data to Excel',lib_func='export_excel')
    lib.save()
    lib = Libs(lib_name='Export Data to Json',lib_func='export_json')
    lib.save()
    # addWf()


def addEmbeding():
    file_path = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(file_path, 'explain.txt')
    loader = TextLoader(base_path)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap = 20)
    split_docs = text_splitter.split_documents(docs)
    store = AppHelper.getStore()
    store.add_documents(split_docs)

def addEmbedingTest():
    init()
    file_path = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(file_path, 'explain.txt')
    loader = TextLoader(base_path)
    docs = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap = 20)
    split_docs = text_splitter.split_documents(docs)
    embed = OpenAIEmbeddings()
    store = Pinecone.from_documents(split_docs, embed, index_name="adela")

# addEmbedingTest()

def chatWfTest(request):
    question =  request.GET.get["question"]
    wfs = question.split(",")
    answer =[]
    llm = ChatOpenAI(temperature =0.0)
    chain = load_qa_chain(llm, chain_type="stuff")
    
    # query = json.loads(request.body).get("prompt")
    #"What is the collect stage of data maturity?"
    store = Pinecone.from_existing_index(index_name="adela",embedding=OpenAIEmbeddings())
    for query in wfs:
        docs = store.similarity_search(query)
        answer.append[chain.run(input_documents=docs,question=query)]
    print(answer)
    return JsonResponse({"answer":answer})