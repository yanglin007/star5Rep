import os
from azure.core.credentials import AzureKeyCredential
from azure.search.documents.indexes import SearchIndexerClient # for create index , we did this by portal
from azure.search.documents import SearchClient
from .utils import getReqParamValue
from .baseResponse import BaseResponse
from django.http import JsonResponse


admin_key = os.environ.get("AZURE_SERACH_ADMIN_KEY")
index_name = os.environ.get("AZURE_SERACH_INDEX_NAME")
endpoint = os.environ.get("AZURE_SEARCH_ENDPOINT")

def pullDataFromDb():
    indexer_client = SearchIndexerClient(endpoint, AzureKeyCredential(admin_key))
    result = indexer_client.get_indexer(os.environ.get("AZURE_SERACH_INDEXER"))
    # Run the indexer we just created.
    indexer_client.run_indexer(result.name)
    
def cognitiveSearch(request):
    search_client = SearchClient(endpoint=endpoint,
                      index_name=index_name,
                      credential=AzureKeyCredential(admin_key))
    pullDataFromDb()
    results = search_client.search(getReqParamValue(request,"search_text"),search_mode='all',include_total_count=True)
    print ('Total Documents Matching Query:', results)
    return BaseResponse.success(results)

