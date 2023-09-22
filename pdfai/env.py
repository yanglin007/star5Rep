import os
from langchain import OpenAI, SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain


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
    os.environ["AZURE_SERACH_ADMIN_KEY"]="hvAR0OkivJ0pGogSh8EGKPFx37ATCEoaAANpoXBxI4AzseCxSaMQ"
    os.environ["AZURE_SERACH_INDEXER"] ="star5-cosmosdb-indexer"


    #---------------------sql database -----------------------
    os.environ["DB_CONNECT_STR"] ="mysql+pymysql://e515962:%^TYGH78uijk@star5dbserver.mysql.database.azure.com/star5db"

 #---------------------blob storage -----------------------
    os.environ["STORAGE_ACCOUNT"] ="star5storage"
    os.environ["STORAGE_CONTAINER"] ="star5blobcontainer"
    os.environ["STORAGE_KEY"] = "9+uBgwzQHxAORb88MHrxM9JwG6yn5nz5orFQ4rpD8sZoTJ2g12Ri0JGn43gFJ/aUYU80V6xTPhBd+ASt4VLcaQ=="

    #------------recognizer---------
    os.environ["RECOGNIZER_ENDPOINT"] = "https://star5formrecognizer.cognitiveservices.azure.com"
    os.environ["RECOGNIZER_KEY"] = "df6d17da3bd343ed865120e4b95b4372"
   #  db = SQLDatabase.from_uri(os.environ.get("DB_CONNECT_STR"))
   #  llm = OpenAI(temperature=0)
   #  db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)

