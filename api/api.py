from flask import Flask, jsonify, request
from flask_cors import CORS
import ML

app = Flask(__name__)
CORS(app)

@app.route('/api/route')
def message():
    search = request.args.get('search')
    return ML.basicFunction(search)

