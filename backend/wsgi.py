# wsgi.py

from waitress import serve
from app import app  # Adjust this import to match your app structure

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
