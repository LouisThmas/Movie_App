import "./MovieFeed.css";
import { useEffect } from "react";

type MovieFeedProps = {
    isSent: boolean;
    thought: string;
    movies: Movie[] | null;
};

type Movie = {
    title: string;
    description: string;
    rating: number;
    runtime: string;
    release_year: string;
};

function MovieFeed ({ isSent, thought, movies }: MovieFeedProps) {

    useEffect(() => {
        if (!isSent) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    entry.target.children[2].children[0].children[0].classList.add("display");
                }
            });
        });

        const elements = document.querySelectorAll(".hidden");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [isSent, movies]);

    if (!isSent) {
        return null
    }
    else {
        return <div className="feed-container">
            <div className="feed">
                <h2>Here are some suggestions for:</h2>
                <h2 id="prompt">{thought}</h2>
                <hr></hr>
                {movies?.map((movie) => (
                <div key={movie.title} className="hidden">
                    <h3 id="movie-title">{movie.title}</h3>
                    <p id="runtime-year">{movie.release_year} • {movie.runtime} mins</p>
                    <div className="progress">
                        <div className="progress-container">
                            <div className="progress-bar" style={{ '--dynamic-width': `${movie.rating * 10}px` }}></div>
                        </div>
                        <p>{movie.rating * 10}%</p>
                    </div>
                    <p>{movie.description}</p>
                    <hr></hr>
                </div>
            ))}
            </div>
        </div>
    }
}

export default MovieFeed