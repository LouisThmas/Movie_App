from flask import Flask, jsonify, request
from flask_cors import CORS
import SearchEngine
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/route', methods = ['GET'])
def message():
    searchRequest = request.args.get('search')
    pageNumber = request.args.get('page')
    return SearchEngine.search(searchRequest, pageNumber)

@app.route('/api/save', methods = ['POST'])
def save():
    with open('Database/userSavedDB.json') as database:
        savedMovies = json.load(database)

    savedMovies.append(request.get_json())

    with open('Database/userSavedDB.json', 'w') as json_file:
        json.dump(savedMovies, json_file, 
                                indent=4,  
                                separators=(',',': '))
    
    return request.get_json()

@app.route('/api/unsave', methods =['DELETE'])
def delete():
    with open('Database/userSavedDB.json') as database:
        savedMovies = json.load(database)

    for i in range(len(savedMovies)):
        if savedMovies[i]["movieId"] == request.get_json()["movieId"]:
            del savedMovies[i]
            break

    with open('Database/userSavedDB.json', 'w') as json_file:
        json.dump(savedMovies, json_file, 
                                indent=4,  
                                separators=(',',': '))
    
    return request.get_json()

@app.route('/api/saved', methods = ['GET'])
def getSaved():
    with open('Database/userSavedDB.json') as database:
        savedMovies = json.load(database)
    
    return savedMovies



