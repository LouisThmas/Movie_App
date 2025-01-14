import "./MovieFeed.css";
import { useEffect, useState } from "react";
import getMatchingMovies from "../utils/MovieFetcher";
import saveMovie from "../utils/MovieSaver";
import SavedFetcher from "../utils/SavedFetcher";
import deleteMovie from "../utils/MovieDeleter";

type MovieFeedProps = {
    isSent: boolean;
    thought: string;
    movies: Movie[];
};

type Movie = {
    id: number;
    title: string;
    description: string;
    rating: number;
    runtime: string;
    release_year: string;
};

function MovieFeed({ isSent, thought, movies }: MovieFeedProps) {
    const [movieList, setMovieList] = useState<Movie[]>(movies);
    const [pageNumber, setPageNumber] = useState<number>(1);
    // Stores the ids of the movies that are saved
    const [savedMovies, setSavedMovies] = useState<number[]>([]);

    async function loadMoreMovies() {
        const newMovies = await getMatchingMovies(thought, pageNumber);
        setMovieList((prevMovieList) => [...prevMovieList, ...newMovies]);
        setPageNumber((prevPage) => prevPage + 1);
    }

    function removeSavedMovie(id: number) {
        return savedMovies.filter((movieId) => movieId !== id);
    }

    async function save(id: number, title: string, runtime: string, year: string) {
        if (savedMovies.includes(id)) {
            await deleteMovie(id);
            setSavedMovies(removeSavedMovie(id));
        } else {
            await saveMovie(id, title, runtime, year);
            setSavedMovies((savedMovies) => [...savedMovies, id]);
        }
    }

    // Set the movie list when the prompt is sent (to not have an empty list first)
    // Get the movies that are saved by the user aswell
    useEffect(() => {
        if (isSent) {
            setMovieList(movies);
            setPageNumber(1);
        }
    }, [isSent, thought, movies]);

    useEffect(() => {
        async function fetchSavedMovies() {
            try {
                const saved = await SavedFetcher();
                setSavedMovies(saved.map((movie) => movie.movieId));
            } catch (error) {
                console.error("Error fetching saved movies:", error);
            }
        }
        fetchSavedMovies();
    }, []);

    useEffect(() => {
        if (!isSent) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    const progressBar = entry.target.querySelector(".progress-bar");
                    if (progressBar) {
                        progressBar.classList.add("display");
                    }
                    observer.unobserve(entry.target);
                }
            });
        });

        const elements = document.querySelectorAll(".hidden");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isSent, movieList]);

    if (!isSent) {
        return null;
    }

    return (
        <div className="feed-container">
            <div className="feed">
                <h2>Here are some suggestions for:</h2>
                <h2 id="prompt">{thought}</h2>
                <hr></hr>
                {movieList?.map((movie) => (
                    <div key={movie.id} className="hidden">
                        <h3 id="movie-title">{movie.title}</h3>
                        <p id="runtime-year">{movie.release_year} • {movie.runtime} mins</p>
                        <div className="progress">
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ "--dynamic-width": `${movie.rating * 10}px` } as React.CSSProperties}
                                ></div>
                            </div>
                            <p>{movie.rating * 10}★</p>
                        </div>
                        <p>{movie.description}</p>
                        <button className="save-icon" onClick={() => save(movie.id, movie.title, movie.runtime, movie.release_year)}><img className={`save-icon ${savedMovies.includes(movie.id)}`}/></button>
                        <hr></hr>
                    </div>
                ))}
                <div id="button-container">
                    <button id="load-button" onClick={loadMoreMovies}>Load More</button>
                </div>
            </div>
        </div>
    );
}

export default MovieFeed;
