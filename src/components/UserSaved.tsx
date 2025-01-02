import { useState, useEffect } from "react";
import "./UserSaved.css";
import SavedFetcher from "../utils/SavedFetcher";

function UserSaved() {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        async function fetchSavedMovies() {
            try {
                const movies = await SavedFetcher();
                setSavedMovies(movies);
            } catch (error) {
                console.error("Error fetching saved movies:", error);
            }
        }

        fetchSavedMovies();
    }, []);

    return (
        <div className="saved-container">
            <h2>Saved Movies</h2>
            <div id="saved-items">
                <div className="saved">
                    {savedMovies.map((movie, index) => (
                        <div key={index}>
                            <h3 id="title">{movie.movieTitle}</h3>
                            <p id="info">{movie.movieYear} • {movie.movieRuntime} mins</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserSaved;
