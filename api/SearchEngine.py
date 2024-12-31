from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from spacy_download import load_spacy
from string import punctuation
import numpy as np
import scipy.sparse as sp
import json
import pickle
import spacy

def filter (userInput):
    # Code adapted from https://www.analyticsvidhya.com/blog/2022/03/keyword-extraction-methods-from-documents-in-nlp/#h-spacy
    # Loading the small english model for NLP
    model = load_spacy("en_core_web_sm")
    # Only looking for nouns, proper nouns and adjectives to keep only the important terms
    relevantTags = ['PROPN', 'ADJ', 'NOUN']
    text = model(userInput.lower())
    # Set to only have unique terms
    sanitizedInput = set()

    for token in text:
        if (token.text in model.Defaults.stop_words or token.text in punctuation):
            continue
        if (token.pos_ in relevantTags):
            sanitizedInput.add(token.text)
    
    filteredlist = list(sanitizedInput)
    # Turn the final keywords into a string
    return " ".join(filteredlist)

def search (searchRequest, pageNumber):

    with open('Ressources/movies.json', 'r') as json_file:
        movies = json.loads(json_file.read())

    # Load the fitted vectorizer (TfidfVectorizer)
    with open('Ressources/fitted_vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)

    # Load the sparse matrix
    movie_vectors = sp.load_npz('Ressources/movie_sparse_matrix.npz')

    # Filter the input from the user
    user_input = filter(searchRequest)
    # user input with the weights of each term to compare with the movies
    user_vector = vectorizer.transform([user_input])

    # Find cosine similarity, which finds the movie vectors closest to the input words vector
    similarities = cosine_similarity(user_vector, movie_vectors)

    # Turns a matrix into a list
    similarity_scores = similarities.flatten()
    # Returns a list of indices of the correctly ordered list
    # Invert the list since the indices are in inverted order by default
    ranked_indices = similarity_scores.argsort()[::-1]

    #calculate the indices to return depending on the amount of pages the user loaded
    infIndex = int(pageNumber)*10
    supIndex = ((int(pageNumber)*10) + 10)

    # Takes the first 10 movies that match the user input the most
    top_movies = [{"id": movies[i]["index"], "title": movies[i]["title"], "description": movies[i]["overview"], "rating": movies[i]["vote_average"], "runtime": movies[i]["runtime"], "release_year": movies[i]["release_date"].split("-")[0]} for i in ranked_indices[infIndex:supIndex]]
    return top_movies