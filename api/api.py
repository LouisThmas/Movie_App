from flask import Flask, jsonify, request
from flask_cors import CORS
import SearchEngine

app = Flask(__name__)
CORS(app)

@app.route('/api/route')
def message():
    searchRequest = request.args.get('search')
    pageNumber = request.args.get('page')
    return SearchEngine.search(searchRequest, pageNumber)

