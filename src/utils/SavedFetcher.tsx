async function SavedFetcher () {
    const savedMovies = fetch('http://127.0.0.1:5000/api/saved', {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                throw new Error("Problem getting saved movies")
            }
            return response.json()
        });
    return savedMovies
}

export default SavedFetcher;