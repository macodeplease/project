from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow requests from any origin

@app.route('/api/data', methods=['POST'])
def handle_data():
    data = request.json  # Receive the JSON data from frontend
    # Process the data
    return jsonify({"message": "Data received", "receivedData": data})

if __name__ == "__main__":
    app.run(debug=True)
