import "./MovieFeed.css";
import { useEffect, useState } from "react";
import getMatchingMovies from "../utils/MovieFetcher";
import saveMovie from "../utils/MovieSaver";

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

function MovieFeed ({ isSent, thought, movies }: MovieFeedProps) {
    const [movieList, setMovieList] = useState<Movie[]>(movies);
    const [pageNumber, setPageNumber] = useState<number>(1);

    async function loadMoreMovies() {
        const newMovies = await getMatchingMovies(thought, pageNumber);
        setMovieList((prevMovieList) => [...prevMovieList, ...newMovies]);
        setPageNumber((prevPage) => prevPage + 1);
    }

    async function save(id: number, title: string, runtime: string, year: string) {
        const savedMovie = saveMovie(id, title, runtime, year);
    }

    // Set the movie list when the prompt is sent (to not have an empty list first)
    useEffect(() => {
        setMovieList(movies);
    }, [isSent])

    useEffect(() => {
        if (!isSent) return;
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    const progressBar = entry.target.querySelector('.progress-bar');
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
        return null
    }
    else {
        return <div className="feed-container">
            <div className="feed">
                <h2>Here are some suggestions for:</h2>
                <h2 id="prompt">{thought}</h2>
                <hr></hr>
                {movieList?.map((movie) => (
                <div key={movie.title} className="hidden">
                    <h3 id="movie-title">{movie.title}</h3>
                    <p id="runtime-year">{movie.release_year} • {movie.runtime} mins</p>
                    <div className="progress">
                        <div className="progress-container">
                            <div className="progress-bar" style={{ '--dynamic-width': `${movie.rating * 10}px` } as React.CSSProperties}></div>
                        </div>
                        <p>{movie.rating * 10}★</p>
                    </div>
                    <p>{movie.description}</p>
                    <button onClick={() => save(movie.id, movie.title, movie.runtime, movie.release_year)}><img className="save-icon" src="src/assets/save.png"/></button>
                    <hr></hr>
                </div>
            ))}
            <div id="button-container">
                <button id="load-button" onClick={loadMoreMovies}>Load More</button>
            </div>
            </div>
        </div>
    }
}

export default MovieFeed