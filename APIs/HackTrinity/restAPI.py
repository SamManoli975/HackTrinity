from flask import Flask, request, jsonify
from summarisation_api import summarise_text

app = Flask(__name__)

@app.route('/')  # Define a route for the root URL
def index():
    return 'Welcome to the API! Go to /hello for a greeting.'

@app.route('/hello')
def hello():
    # Get the text to summarise from the request JSON
    data = request.get_json()
    summarising_input = data.get('text', '')  # Default to empty string if not provided

    # Call the summarization function
    summary = summarise_text(summarising_input)

    # Return the summary as a JSON response
    return jsonify({"summary": summary}) 

if __name__ == '__main__':  
    app.run(debug=True, port=5001)  # Optionally enable debug mode