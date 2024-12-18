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
};

function MovieFeed ({ isSent, thought, movies }: MovieFeedProps) {

    useEffect(() => {
        if (!isSent) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    entry.target.children[1].classList.add("display");
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
                <h2>{thought}</h2>
                <hr></hr>
                {movies?.map((movie) => (
                <div key={movie.title} className="hidden">
                    <h3>{movie.title}</h3>
                    <div className="progress-container">
                        <div className="hello"></div>
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