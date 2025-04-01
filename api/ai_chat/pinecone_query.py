import os
from pinecone import Pinecone

pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))

index_name = "ai-powered-chatbot-challenge"
index = pc.Index(index_name)

def query_Pinecone(input_query):
    response = index.search(
        namespace="",
        query={
            
                "inputs":{
                        "text": input_query
                },
                "top_k": 1
        }
    )
    
    returned_text = response['result']['hits'][0]['fields']['text']
    returned_text_score = response['result']['hits'][0]['_score']
    
    if returned_text_score < 0.3:
        print("Returned text score is too low, please try again.")
        return None
    
    return returned_text