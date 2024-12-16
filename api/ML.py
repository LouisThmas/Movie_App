from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import scipy.sparse as sp
import json
import pickle

def basicFunction (search):
    # Load movies dataset
    with open('Ressources/movies.json', 'r') as json_file:
        movies = json.loads(json_file.read())

    # Load the fitted vectorizer
    with open('Ressources/fitted_vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)

    # Load the sparse matrix
    movie_vectors = sp.load_npz('Ressources/movie_sparse_matrix.npz')

    # Transform user input
    user_input = search
    user_vector = vectorizer.transform([user_input])

    # Compute cosine similarity
    similarities = cosine_similarity(user_vector, movie_vectors)

    # Rank and recommend movies
    similarity_scores = similarities.flatten()
    ranked_indices = similarity_scores.argsort()[::-1]

    top_movies = [{"title": movies[i]["title"], "description": movies[i]["overview"]} for i in ranked_indices[:10]]
    return top_movies