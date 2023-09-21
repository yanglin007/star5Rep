import os
from langchain import OpenAI, SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from .utils import getReqParamValue
from .baseResponse import BaseResponse
from django.http import JsonResponse

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

def llm(request):
    chat = ChatOpenAI(temperature=0)
    template='''You are a helpful assistant that find users answers in below texts.
                    user defined some customized libs which can help him draw his work flow. below
                    are the libs information:
                    lib 'Get data from database' helps user to get data from database, 
                    lib 'Export data to excel' helps user to export data to excel.
                    lib 'Export data to csv' helps user to export data to csv.

                    '''
    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    human_template='''
        I want to draw a work flow, 
        {text}, please give me the answer in Json format with below information:
        lib_name : the work flow lib it used.
    '''
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)
    chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])
    # get a chat completion from the formatted messages
    rs = chat(chat_prompt.format_prompt(text="first get data from database, then export data to csv").to_messages())
    # ->
    print(rs.content)

def parseLLMRequest(request):
    db = SQLDatabase.from_uri(os.environ.get("DB_CONNECT_STR"))
    llm = OpenAI(temperature=0)
    db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)
    query = getReqParamValue(request,"prompt")
    answer = db_chain.run(query)
    print('----llm answer---',answer)
    return JsonResponse(BaseResponse(1,{"answer":answer}))
