from openai import OpenAI
import requests
import json

YOUR_API_KEY = "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"

def summarise_text(summarising_input):
    # Construct the API payload
    payload = {
        "model": "llama-3.1-sonar-large-128k-online",
        "messages": [
            {"role": "system", "content": "You are an artificial intelligence assistant and you need to engage in a helpful, detailed, polite conversation with a lawyer."},
            {"role": "user", "content": f"summarise including points including points that are{summarising_input}"}
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
    
