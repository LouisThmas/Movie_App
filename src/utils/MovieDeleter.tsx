async function deleteMovie (id : number) {
    const movieData = {
        movieId: id
    };

    const reqOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(movieData)
    };

    const savedMovie = fetch('http://127.0.0.1:5000/api/unsave', reqOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Problem deleting movie");
            }
            return response.json()
        });
    return savedMovie
}

export default deleteMovie;