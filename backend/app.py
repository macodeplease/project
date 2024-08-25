from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) so that the frontend can connect
CORS(app)

# Define user details
USER_ID = "john_doe_17091999"
EMAIL = "john@xyz.com"
ROLL_NUMBER = "ABCD123"

# Define a route for the POST request
@app.route('/bfhl', methods=['POST'])
def handle_post():
    try:
        # Get JSON data from the request body
        data = request.json.get('data', [])
        
        # Initialize lists
        numbers = []
        alphabets = []
        highest_lowercase_alphabet = []

        # Process the input data
        for item in data:
            if item.isdigit():
                numbers.append(item)
            elif item.isalpha():
                alphabets.append(item)

        # Find the highest lowercase alphabet
        lowercase_alphabets = [ch for ch in alphabets if ch.islower()]
        if lowercase_alphabets:
            highest_lowercase_alphabet = [max(lowercase_alphabets)]

        # Prepare the response
        response = {
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase_alphabet
        }
        return jsonify(response), 200

    except Exception as e:
        # Print error message for debugging
        print(f"Error: {str(e)}")
        return jsonify({"is_success": False, "error": str(e)}), 400

# Define a route for the GET request
@app.route('/bfhl', methods=['GET'])
def handle_get():
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200

# Start the Flask app
if __name__ == "__main__":
    app.run(debug=True)
