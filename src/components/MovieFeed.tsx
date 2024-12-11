import "./MovieFeed.css";

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

    if (!isSent) {
        return null
    }
    else {

        return <div className="feed-container">
            <div className="feed">
                <h2>{thought}</h2>
                <p>Movie 1</p>
                <img src="./src/assets/test.jpg" width="300px"/>
                <p>Movie 2</p>
                <img src="./src/assets/test.jpg" width="300px"/>
                {movies?.map((movie) => (
                <>
                    <p>{movie.title}</p>
                    <p>{movie.description}</p>
                </>
            ))}
            </div>
        </div>
    }
}

export default MovieFeed