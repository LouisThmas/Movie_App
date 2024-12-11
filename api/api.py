from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/route')
def message():
    message = "Terminator"
    return [
        {
            'title': message,
            'description': "I am a very good movie"
        },
        {
            'title': 'Garfield',
            'description': "Movie about lasagna"
        }
    ]

