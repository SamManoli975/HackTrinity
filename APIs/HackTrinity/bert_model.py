from transformers import BertForSequenceClassification
from transformers import BertTokenizer

from openai import OpenAI
import requests
import json
import torch

BERT_MODEL = "textattack/bert-base-uncased-yelp-polarity"

tokenizer = BertTokenizer.from_pretrained(BERT_MODEL)


model = BertForSequenceClassification.from_pretrained(BERT_MODEL, num_labels = 2)

YOUR_API_KEY = "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"


# Get the summary input from the lawyer
def summarise(summarising_input):

    # Construct the API payload
    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {"role": "system", "content": "You are an artificial intelligence assistant and you need to engage in a helpful, detailed, polite conversation with a lawyer."},
            {"role": "user", "content": f"Your task is to generate a short summary of a law case in at most 150 words taking an unbiased view taking account points in favour and against. Do not include any indicator tokens that indicate this is a summary. Put it as a single paragraph{summarising_input}"}
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
            content = data['choices'][0]['message']['content']  # Directly access the first choice
            
            # Print the formatted content
            return (content.strip())

    else:
        # Handle request errors
        print(f"Request failed with status code {response.status_code}: {response.text}")

def tokenize_text(text):
    create_summary = summarise(text)
    inputs = tokenizer(create_summary, return_tensors="pt")

    return inputs

def get_model_output(query):
    tokenised = tokenize_text(query)
    logits = model(**tokenised)
    val = torch.argmax((logits.logits), -1).item()
    if val == 1:
        return "win"
    else:
        return "lose"
    
