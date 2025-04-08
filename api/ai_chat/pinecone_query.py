import os
from pinecone import Pinecone, exceptions

api_key = os.environ.get("PINECONE_API_KEY")
if not api_key:
    raise ValueError("Pinecone API key is missing. Please set the PINECONE_API_KEY environment variable.")

try:
    pc = Pinecone(api_key=api_key)
    index_name = "ai-powered-chatbot-challenge"
    index = pc.Index(index_name)
except exceptions.PineconeException as e:
    print(f"An error occurred while initializing Pinecone: {e}")
    raise
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    raise

def query_Pinecone(input_query):
    try:
        response = index.search(
            namespace="",
            query={
                "inputs": {
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

    except exceptions.PineconeException as e:
        print(f"Error querying Pinecone: {e}")
        return None
    except KeyError as e:
        print(f"Missing expected key in response: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred during the query: {e}")
        return None
