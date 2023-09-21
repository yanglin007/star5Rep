import os
import pinecone
from langchain.document_loaders import PyPDFLoader 
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
import tiktoken
import pinecone

#PINECONE_INDEX_NAME = "adela"
EMBEDDING_MODEL ="text-embedding-ada-002"
LLM_MODEL = 'gpt-3.5-turbo'

# tiktoken.encoding_for_model(LLM_MODEL)
# tokenizer = tiktoken.get_encoding("cl100k_base")

def init():
    print("---initiallizing start---")
    # pinecone.init(
    #     api_key="ec70078b-04f8-4d91-8ebc-98ad36e923c1",
    #     environment="asia-southeast1-gcp-free"
    # )
    # init for openai(openai embedding, openai chat)
    # os.environ["OPENAI_API_TYPE"] = "azure"
    os.environ["OPENAI_API_KEY"] ="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"
    #os.environ["OPENAI_API_BASE"] ="http://flag.smarttrot.com/index.php/api/v1" #https://<your-endpoint.openai.azure.com/
    # os.environ["OPENAI_API_VERSION"] = "2023-03-15-preview"

    #init for azure serach
    os.environ["AZURE_SEARCH_ENDPOINT"]="https://star5search.search.windows.net"
    os.environ["AZURE_SERACH_INDEX_NAME"]="star5index"
    os.environ["AZURE_SERACH_ADMIN_KEY"]="Cw5EBUxaizS4jBFbFdQvohEOSaNCHO3PXC17u6GQy8AzSeDRVUOZ"
    os.environ["AZURE_SERACH_INDEXER"] ="star5-cosmosdb-indexer"

    #---------------------sql database -----------------------
    #os.environ["DB_CONNECT_STR"] ="mssql+pymssql://e515962:%^TYGH78uijk@star5sqldbserver.database.windows.net/star5sqldatabase"
    os.environ["DB_CONNECT_STR"] ="mysql+pymysql://root:123456@127.0.0.1/openai"



 #---------------------blob storage -----------------------
    os.environ["STORAGE_ACCOUNT"] =""
    os.environ["STORAGE_CONTAINER"] =""
    os.environ["STORAGE_KEY"] = ""

    #------------recognizer---------
    os.environ["RECOGNIZER_ENDPOINT"] = "https://star5formrecognizer.cognitiveservices.azure.com"
    os.environ["RECOGNIZER_KEY"] = "df6d17da3bd343ed865120e4b95b4372"