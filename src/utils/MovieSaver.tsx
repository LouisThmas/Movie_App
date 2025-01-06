async function saveMovie (id : number, title : string, runtime: string, year: string) {
    const movieData = {
        movieId: id,
        movieTitle: title,
        movieRuntime: runtime,
        movieYear: year
    };

    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(movieData)
    };

    const savedMovie = fetch('http://127.0.0.1:5000/api/save', reqOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Problem saving movie");
            }
            return response.json()
        });
    return savedMovie
}

export default saveMovie;