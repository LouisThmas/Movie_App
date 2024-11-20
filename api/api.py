from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/route')
def message():
    message = "Helloooooo"
    return jsonify({'message': message})
