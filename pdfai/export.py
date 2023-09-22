import pandas as pd  
import matplotlib.pyplot as plt  
from matplotlib.backends.backend_pdf import PdfPages  
import shutil
import os
import json  
from reportlab.pdfgen import canvas  
from reportlab.lib.pagesizes import letter  
from django.db import connection
from .uploadFile import mappingtransfer
from langchain.tools.azure_cognitive_services.form_recognizer import AzureCogsFormRecognizerTool
from azure.storage.blob import BlobServiceClient,BlobClient

from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
import os
from PIL import Image
  
def getDataFromDb(dt, config):   
    cursor = connection.cursor()  
    query = json.loads(config).get("query")
    query = "select * from trades"
    cursor.execute(query)  
    
    results = cursor.fetchall()  
  
    df = pd.DataFrame(results, columns=[column[0] for column in cursor.description])  
    rule_id = json.loads(config).get("rule_id")
    if rule_id != None:
        df = mappingtransfer(df,rule_id)

    connection.close()  
    return df

def getDataFromExcel(dt, config):
    file_name = json.loads(config).get("file_name")
    file_name="data.xlsx"
    file_path = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(file_path, file_name)
    return  pd.read_excel(base_path)

def getDataFromImages(dt,config):
    filename = json.loads(config).get("file_name")
    filename = "TRADES.pdf"
    file_path = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(file_path, filename)
    

    # store file to blob storage
    # storage_account_url = f'https://{os.environ.get("STORAGE_ACCOUNT")}.blob.core.windows.net'
    
    # storage_container = os.environ.get("STORAGE_CONTAINER")
   
    doc_analysis_client = DocumentAnalysisClient(
                    endpoint=os.environ.get("RECOGNIZER_ENDPOINT"),#"form recognizer endpoin",
                    credential=AzureKeyCredential(os.environ.get("RECOGNIZER_KEY")),
                )

    with open(base_path,"rb") as f:
            poller = doc_analysis_client.begin_analyze_document(
                    "prebuilt-document", document=f)

    result = poller.result()
    res_dict = [item.to_dict() for item in result.key_value_pairs]
    ls = []
    for item in res_dict:
        a ={item["key"]["content"]:item["value"]["content"]}
        ls.append(a)

    print("-----------------",ls)
    return pd.DataFrame.from_dict(ls)

def export_excel(df,config):
    target_path = json.loads(config).get("file_name")
    target_path='share1.xlsx'
    df.to_excel(target_path, index=False)  


def export_json(df,config):  
    df.to_json('data.json')


def data_to_pie(df,config):
      file_name = json.loads(config).get("file_name")
      target_path = json.loads(config).get("target_path")
      target_path = './mypy//'
      df = df.from_dict(orient='index', columns=['value'])  
      fig, ax = plt.subplots() 
      ax.pie(df['value'], labels=df.index, autopct='%1.1f%%', startangle=90)  
      ax.axis('equal')
      plt.title('Pie')  
      pdf_pages = PdfPages(file_name)  
      pdf_pages.savefig(fig)  
      pdf_pages.close()
 
      source_file = './'+file_name  
      file_name = os.path.basename(file_name) 
  
      target_file = os.path.join(target_path, file_name) 
      if os.path.exists(target_file):  
          os.remove(target_file)   
  
      shutil.move(source_file, target_path)

def data_to_line(df,config):
    file_name = json.loads(config).get("file_name")
    target_path = json.loads(config).get("target_path")
    target_path = './mypy//'
    # df = pd.DataFrame(data)  
    plt.figure(figsize=(10,5)) 
    # labels = list(data.keys()) 
    plt.plot(df['Year'], df['Sales'], marker='o')  
    plt.title('Line')  
    # labels = list(data.keys())
    plt.xlabel('Year')  
    plt.ylabel('Sales')  
     
    with PdfPages(file_name) as pdf:  
        pdf.savefig(plt.gcf())

    source_file = './'+file_name   
    file_name = os.path.basename(file_name)  

    target_file = os.path.join(target_path, file_name)
    if os.path.exists(target_file):  
        os.remove(target_file)   
 
    shutil.move(source_file, target_path)


def data_to_bar(df,config):
    file_name = json.loads(config).get("file_name")
    target_path = json.loads(config).get("target_path")
    target_path = './mypy//'
    # df = pd.DataFrame(data, index=['X', 'Y', 'Z'])
    c = canvas.Canvas(file_name, pagesize=letter)
    fig, ax = plt.subplots()  
    df.plot(kind='bar', ax=ax)  
    plt.savefig('bar_plot.png')  
    c.drawImage('bar_plot.png', 50, 500, 600, 400) 
    c.showPage()  
    c.save()   
    os.remove('./bar_plot.png')
    source_file = './'+file_name  
    file_name = os.path.basename(file_name)  

    target_file = os.path.join(target_path, file_name)  
    if os.path.exists(target_file):  
        os.remove(target_file) 
  
    shutil.move(source_file, target_path)
