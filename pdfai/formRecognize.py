from langchain.tools.azure_cognitive_services.form_recognizer import AzureCogsFormRecognizerTool
from azure.storage.blob import BlobServiceClient,BlobClient

from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
from azure.cosmos import CosmosClient
import openai
import os
import time
from env import init
from langchain import OpenAI, SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain.memory import CosmosDBChatMessageHistory
init()
#openai.api_key="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"
def generate_embeddings(text):
    '''
    Generate embeddings from string of text.
    This will be used to vectorize data and user input for interactions with Azure OpenAI.
    '''
    response = openai.Embedding.create(
        input=text, engine="text-embedding-ada-002")
    embeddings = response['data'][0]['embedding']
    time.sleep(20) # rest period to avoid rate limiting on AOAI for free tier
    return embeddings

def upload():
    #methond : post
    os.environ["STORAGE_ACCOUNT"] ="star5storageaccount"
    os.environ["STORAGE_KEY"] = "/7kV9kaYPQAyiY45m+MWtI4xmicB8Mn7iMBeSquNbHHo4cxN98ESVtVMLzp/ReqGjZBgRy+yhLwp+AStUkqZUg=="
    os.environ["STORAGE_CONTAINER"] = "star5container"

    os.environ["RECOGNIZER_ENDPOINT"] ="https://star5recoginzer.cognitiveservices.azure.com"
    os.environ["RECOGNIZER_KEY"] ="4e554529206f4ee5acb5a26fa153607a"

    os.environ["COSMOS_URL"] ="https://star5db.documents.azure.com:443/"
    os.environ["COSMOS_KEY"] ="ArjdHk3zvbwsoBtNx0dNDsw5uefk9JGHciB2eTCgGujTnLMGenJ60iL1IkW3prM6QlmiUpusrRifACDbjTb3vA=="
    os.environ["COSMOS_DB_NAME"] ="star5db"
    os.environ["COSMOS_DB_CONTAINER"] ="star5dbcontainer"


    # file = request.files["file"]

    # #store file to blob storage
    # storage_account_url = f'https://{os.environ.get("STORAGE_ACCOUNT")}.blob.core.windows.net'
    # storage_container = os.environ.get("STORAGE_CONTAINER")
    # blob_service_client = BlobServiceClient(account_url=storage_account_url,credential=os.environ.get("STORAGE_KEY"))
    # blob_client = blob_service_client.get_blob_client(container=storage_container, blob=file.filename)
    # blob_client.upload_blob(file)
    # ref = f'{storage_account_url}/{storage_container}/' + file.filename
    # file.seek(0,0)

    # doc_analysis_client = DocumentAnalysisClient(
    #                 endpoint=os.environ.get("RECOGNIZER_ENDPOINT"),#"form recognizer endpoin",
    #                 credential=AzureKeyCredential(os.environ.get("RECOGNIZER_KEY")),
    #             )
    # poller = doc_analysis_client.begin_analyze_document(
    #                 "prebuilt-document", document = file
    #             )

    # result = poller.result()
    # res_dict = [item.to_dict() for item in result.key_value_pairs]

    rs =[{"id":"9", "name":'Jake',"shares":"100"},{"id":"7", "name":'Jake',"shares":"200"},{"id":"8","keyvalue":"Jake Lucy", "name":'Lucy',"shares":"300"}]
  
    #write to cosmos db
    cosmos_client = CosmosClient(os.environ.get("COSMOS_URL"),os.environ.get("COSMOS_KEY"))
    database = cosmos_client.get_database_client(database=os.environ.get("COSMOS_DB_NAME"))
    container = database.get_container_client(os.environ.get("COSMOS_DB_CONTAINER"))
    db = SQLDatabase.from_uri("mysql+pymysql://root:123456@127.0.0.1/openai")
    llm = OpenAI(temperature=0)
    db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)
    db_chain.run("How many pepole are there?")
    # for item in rs:
    #   item["namevector"] =generate_embeddings(item["name"])
    #   item["sharevector"] =generate_embeddings(item["shares"])
    #   item['@search.action'] = 'upload'
    #   container.create_item(body = item)
    # item = container.query_items(query ="SELECT * FROM r WHERE r.id=@id", parameters=[{"name":"@id","value":"1"}],enable_cross_partition_query=True)
    # print(item)
    # for i, r in enumerate(item):
    #     print(r)

def test():
    os.environ["STORAGE_ACCOUNT"] ="star5storageaccount"
    os.environ["STORAGE_KEY"] = "/7kV9kaYPQAyiY45m+MWtI4xmicB8Mn7iMBeSquNbHHo4cxN98ESVtVMLzp/ReqGjZBgRy+yhLwp+AStUkqZUg=="
    os.environ["STORAGE_CONTAINER"] = "star5container"

    os.environ["RECOGNIZER_ENDPOINT"] ="https://star5recognizer.cognitiveservices.azure.com"
    os.environ["RECOGNIZER_KEY"] ="4e554529206f4ee5acb5a26fa153607a"

    os.environ["COSMOS_URL"] ="https://star5db.documents.azure.com:443"
    os.environ["COSMOS_KEY"] ="JgEbtjJbbXI6q6y0fiC16nXif0JUBhM8LPwHVcOQ1Lm2WAipCPa0QjeNuZgkHneeleQayUKRwMupACDbXIVBSA=="
    os.environ["COSMOS_DB_NAME"] ="star5db"
    os.environ["COSMOS_DB_CONTAINER"] ="star5dbcontainer"


    filename = "Capture.PNG"

    #store file to blob storage
    storage_account_url = f'https://{os.environ.get("STORAGE_ACCOUNT")}.blob.core.windows.net'
    
    storage_container = os.environ.get("STORAGE_CONTAINER")
    print( f'{storage_account_url}/{storage_container}/' + filename)
    # blob_service_client = BlobServiceClient(account_url=storage_account_url,credential=os.environ.get("STORAGE_KEY"))
    # blob_client = blob_service_client.get_blob_client(container=storage_container, blob=file.filename)
    # blob_client.upload_blob(file)
    # ref = f'{storage_account_url}/{storage_container}/' + file.filename
    # file.seek(0,0)

    doc_analysis_client = DocumentAnalysisClient(
                    endpoint=os.environ.get("RECOGNIZER_ENDPOINT"),#"form recognizer endpoin",
                    credential=AzureKeyCredential(os.environ.get("RECOGNIZER_KEY")),
                )
    poller = doc_analysis_client.begin_analyze_document_from_url(
                    "star5model", document_url = f'{storage_account_url}/{storage_container}/' + filename
                )

    result = poller.result()
    res_dict = [item.to_dict() for item in result.key_value_pairs]
    
    rs =[{"id":"1", "name":'Jake',"shares2":"100"},{"id":"2", "name":'Jake',"shares2":"200"},{"id":"3", "name":'Lucy',"shares2":"300"}]
    
    #write to cosmos db
    cosmos_client = CosmosClient(os.environ.get("COSMOS_URL"),os.environ.get("COSMOS_KEY"))
    database = cosmos_client.get_database_client(database=os.environ.get("COSMOS_DB_NAME"))
    container = database.get_container_client(os.environ.get("COSMOS_DB_CONTAINER"))
 
    container.create_item(body = rs)



if __name__=="__main__":
    upload()