# Movie_App

## Overview
This web app is designed to give you movie recommendations in function of what you feel in the moment. This software uses a modified version of a database from Kaggle (https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset) to find the closest matching movies. The intention behind this application to allow users to quickly and easily discover movies that match their feelings. Many machine learning concepts are used to achieve this goal.

## How to run
Make sure you have Node, npm and python installed on your machine. After copying the repository on your machine, you must download the javascript dependencies like so:

``npm install``

Then, head to the ``api`` directory. You must create your python virtual environnement to have access to the server. This can be done with this command:

``python -m venv venv``

Still in the ``api`` directory, you can now activate the virtual environnement like so:

``./venv/Scripts/activate``

The python requirements can be installed with this command:

``pip install -r requirements.txt``

Finally, you can start the server with the following line in the terminal:

``flask run``

To view the website, head to the ``src`` directory. In there, you can run the following command:

``npm run dev``

## Theory
As previously stated, the app relies on many machine learning concepts to find the best matching movies. First, it is important to note that the data from the database has been sanitized by removing unnecessary columns and null values. Additionally, the ``terms`` column is an amalgamation of the ``director``, ``actors`` and ``keywords`` columns. This allows users to find movies that have certain themes and that star their favorite actors. 

A sparse matrix of these ``terms`` has been made to compare the similarity of the user nput to each movie. This is done with a TF-IDF matrix, which is a way to represent sentences with values. The TF part of this matrix means the *term frequency*, which calculates the frequency of words in a sentence. This equation helps highlight the frequent, and so important, words in a sentence. Next, IDF signifies *inverse document frequency*, which calculates the importance of certain words in a sentence. Words that are not important for the deeper meaning of a sentence like "the", "a" and "of" are not considered. This way, only the important terms are evaluated. Both the TFIDFVectorizer and the sparse matrix are saved as to not rebuild them on every request.

The TFIDFVectorizer from the ``scikit-learn`` library is used to turn the user input into a vector that can be compared against the vectors of each movie. This comparison can be done with the following formula:

``cos θ = (a · b) / (|a| |b|)``

This formula finds the angle between two vectors. The smaller the angle, the more the vectors are close. In the context of this movie application, the closer the user input vector is to the vector generated for a movie, the more they are similar. All that needs to be done is to sort the movies by the angle between the movie and the user input and to return the 10 movies with the smallest angle.

Finally, user input is sanitized by only keeping certain word types with the help of ``spaCy``. This ensures that only the important words are being considered in the search.






