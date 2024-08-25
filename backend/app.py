from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) so that the frontend can connect
CORS(app)

# Define a route for the POST request
@app.route('/api/data', methods=['POST'])
def handle_data():
    # Get JSON data from the request body
    data = request.json
    
    # Process the received data (just echo it back for now)
    print(f"Received data: {data}")
    
    # Send back a response
    return jsonify({"message": "Data received successfully", "receivedData": data})

# Start the Flask app
if __name__ == "__main__":
    app.run(debug=True)
