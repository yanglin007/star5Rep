import os
from langchain import OpenAI, SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from .utils import getReqParamValue
from .baseResponse import BaseResponse
from django.http import JsonResponse
from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
import json


def llm(request):
    prompt = json.loads(request.body).get("prompt")
    chat = ChatOpenAI(temperature=0)
    template='''You are a helpful assistant that find users answers in below texts.
                    user defined some customized libs which can help him draw his work flow. below
                    are the libs information:
                    lib 'Get Data from Database' helps user to get data from database, its lib id is 2; 
                    lib 'Get Data from Excel' helps user to export data to excel,its lib id is 1;
                    lib 'Get Data from Image' helps user to get data from pdf/images, its lib id is 3;
                    lib 'Export Data to Excel' helps user to export data to excel, its lib id is 4;
                    lib 'Export Data to Json' helps user to export data to json format, its lib id is 5;
                    lib 'Export Data to Pie' helps user to generate a pie chart, its lib id is 6;
                    lib 'Export data to Line' helps user to generate a pie chart, its lib id is 7;
                    lib 'Export data to Bar' helps user to generate a pie chart, its lib id is 8;
                    '''
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template='''
        I want to draw a work flow, 
        {text}, please only give me each lib id it used, no need any other message.
    '''
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    # get a chat completion from the formatted messages
    #text="first get data from database, then export data to excel, and then generate a pie chart"
    rs = chat(chat_prompt.format_prompt(text = prompt).to_messages())
    # ->
    print(rs.content)
    return BaseResponse.success(rs.content)


def generateRules(request):
    prompt = json.loads(request.body).get("prompt")
    chat = ChatOpenAI(temperature=0)
    template='''You are a helpful assistant that help to user to generate a mapping for source column and destination cloumn.
    user has source data and want to make a mapping to destination for each column in case to insert data to dest,
    '''
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template='''
    I want to generate a mapping rule,
    {text}, please only give me the information like below in json format without any other message:
    source_column : source column, dest_column: destination column.

    '''
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    # get a chat completion from the formatted messages
    #text="first get data from database, then export data to excel, and then generate a pie chart"
    rs = chat(chat_prompt.format_prompt(text = prompt).to_messages())
    # -&gt;
    print(rs.content)
    return BaseResponse.success(rs.content)
def parseLLMRequest(request):
    db = SQLDatabase.from_uri(os.environ.get("DB_CONNECT_STR"))
    llm = OpenAI(temperature=0)
    db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)
    query = getReqParamValue(request,"prompt")
    answer = db_chain.run(query)
    print('----llm answer---',answer)
    return BaseResponse.success(answer)
