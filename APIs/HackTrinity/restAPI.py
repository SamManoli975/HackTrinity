from flask import Flask, request, jsonify
from flask_cors import CORS
from summarisation_api import summarise_text
from vector_similarity import Vector_Database

app = Flask(__name__)
CORS(app)

database = Vector_Database()

@app.route('/')  # Define a route for the root URL
def index():
    return 'Welcome to the API! Go to /hello for a greeting.'

@app.route('/summarise', methods=['POST'])
def summarise():
    # Get the text to summarise from the request JSON
    data = request.get_json()
    print(data)

    # Call the summarization function
    # Return the summary as a JSON response
    count, similarity = database.search_similar_results(data["userInput"])
    print(similarity)
    return jsonify({"count": str(count), "similarities": similarity})

if __name__ == '__main__':  
    app.run(debug=True, port=5001)  # Optionally enable debug mode