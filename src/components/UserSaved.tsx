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
            <div className="icons">
                <button className="saved-icon">Saved</button>
            </div>
            <div id="saved-items">
                <div className="saved" style={{ display: "flex" }}>
                    {savedMovies.map((movie, index) => (
                        <p key={index}>{movie.movieTitle}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserSaved;
