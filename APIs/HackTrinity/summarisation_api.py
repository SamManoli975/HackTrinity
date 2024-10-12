from openai import OpenAI
import requests
import json

YOUR_API_KEY = "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"

def summarise_text(summarising_input):
    # Construct the API payload
    payload = {
        "model": "llama-3.1-sonar-large-128k-online",
        "messages": [
            {"role": "system", "content": "You are a highly skilled legal assistant with expertise in summarizing complex legal documents. Your task is to create a clear, concise, and thorough summary of the court case, capturing all critical points such as the case facts, legal claims, defenses, outcomes sought, and any legal precedents. Make sure to highlight the most relevant facts, the key arguments of both parties, and the requested remedies."},
            {"role": "user", "content": f"Your task is to generate a short summary of a law case in at most 150 words and add<br><br> at the end of each subheading so add multiple <br> in the text taking an unbiased view taking account points in favour and against. Do not include any indicator tokens that indicate this is a summary: {summarising_input}"}
        ]
    }

    # Define the headers for the request
    headers = {
        "Authorization": f"Bearer {YOUR_API_KEY}",
        "accept": "application/json",
        "content-type": "application/json"
    }

    # Make the request to the API
    response = requests.post("https://api.perplexity.ai/chat/completions", json=payload, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()

        # Extract the content directly if choices are present
        if 'choices' in data and data['choices']:
            return data['choices'][0]['message']['content'].strip()
        else:
            return "No choices returned from the API."

    else:
        # Handle request errors
        return f"Request failed with status code {response.status_code}: {response.text}"
    
