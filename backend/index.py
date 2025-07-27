import os
import shutil
import torch
from langchain_community.document_loaders import DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings

from langchain_chroma import Chroma

DATA_PATH = "" 
CHROMA_PATH = "chroma"


if os.path.exists(CHROMA_PATH):
    shutil.rmtree(CHROMA_PATH)



model_name = "sentence-transformers/all-mpnet-base-v2"
model_device = "cuda" if torch.cuda.is_available() else "cpu"
model_kwargs = {"device": model_device}
encode_kwargs = {'normalize_embeddings': False}


embeddings = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)



def load_documents():
    loader = DirectoryLoader(DATA_PATH, glob="*.md")
    documents = loader.load()
    return documents

documents = load_documents()


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=500,
    length_function=len,
    add_start_index=True,
)
chunks = text_splitter.split_documents(documents)
print(f"Split {len(documents)} documents into {len(chunks)} chunks")

db = Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_PATH)
