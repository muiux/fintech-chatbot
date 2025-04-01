import os
import google.generativeai as genai
from .pinecone_query import query_Pinecone

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

model = genai.GenerativeModel('gemini-1.5-flash')

def generate_answer(query_input):
    retrieved_data = query_Pinecone(query_input)
    
    prompt = (
        "This is the question I want you to answer: "
        f"{query_input}. "
        "Please answer the question based on the data retrieved from the database as accurately as possible. "
        "The data retrieved from the database is as follows: "
        f"{retrieved_data}. "
        "If the information provided by Database is insufficient to fully answer the question, please continue with the best possible answer using your own knowledge, ensuring to address the question thoroughly. "
        "After indicating this, please proceed to answer the question based on your own knowledge and provide a thoughtful and accurate response with the information that the answer is based on your own knowledge. "
        "Your answer should be polite, clear, and informative, and should aim to resolve the question to the best of your ability, whether using the retrieved data or your own knowledge."
    )
    
    response = model.generate_content(prompt)
    print(response.text)
    
    return response.text
