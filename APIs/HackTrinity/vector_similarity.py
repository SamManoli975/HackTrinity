from datasets import load_dataset
from langchain.schema import Document
import torch 

from langchain_chroma import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

from summarisation_api import summarise_text
class Vector_Database():
    def __init__(self):
        ds = load_dataset("darrow-ai/USClassActions")
        dataset = ds["train"]

        embeddings_model_name = "sentence-transformers/all-MiniLM-L6-v2"
        embeddings = HuggingFaceEmbeddings(model_name=embeddings_model_name)

        # Create the vector store
        self.vectorstore = Chroma(embedding_function=embeddings)

        data = []
        for i in range(len(dataset)):
            if type(dataset[i]["target_text"] == str):
                filtered_ds = Document(page_content= str(dataset[i]["target_text"]), metadata={"verdict": dataset[i]["verdict"]})
                data.append(filtered_ds)

        self.vectorstore.add_documents(data)

    def search_similar_results(self, query, similarity_count=3):
        results = self.vectorstore.similarity_search(query, k=similarity_count)
        total = 0

        dic_results = []
        for doc in results:            
            if doc.metadata["verdict"] == "win":
                total +=1
            data = summarise_text(doc.page_content)
            dic_results.append({"verdict": doc.metadata["verdict"],"data":data})

        # Give the average verdict
        return ((total / similarity_count), dic_results)
    
