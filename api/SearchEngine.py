from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import scipy.sparse as sp
import json
import pickle

def search (searchRequest):

    with open('Ressources/movies.json', 'r') as json_file:
        movies = json.loads(json_file.read())

    # Load the fitted vectorizer (TfidfVectorizer)
    with open('Ressources/fitted_vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)

    # Load the sparse matrix
    movie_vectors = sp.load_npz('Ressources/movie_sparse_matrix.npz')

    # user input with the weights of each term to compare with the movies
    user_input = searchRequest
    user_vector = vectorizer.transform([user_input])

    # Find cosine similarity, which finds the movie vectors closest to the input words vector
    similarities = cosine_similarity(user_vector, movie_vectors)

    # Turns a matrix into a list
    similarity_scores = similarities.flatten()
    # Returns a list of indices of the correctly ordered list
    # Invert the list since the indices are in inverted order by default
    ranked_indices = similarity_scores.argsort()[::-1]

    # Takes the first 10 movies that match the user input the most
    top_movies = [{"title": movies[i]["title"], "description": movies[i]["overview"], "rating": movies[i]["vote_average"]} for i in ranked_indices[:10]]
    return top_movies