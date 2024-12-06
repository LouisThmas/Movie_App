import "./MovieFeed.css";

type MovieFeedProps = {
    isSent: boolean;
    thought: string;
};

function MovieFeed ({ isSent, thought }: MovieFeedProps) {

    if (!isSent) {
        return null
    }
    else {

        return <div className="feed-container">
            <div className="feed">
                <p>Movie 1</p>
                <img src="./src/assets/test.jpg" width="300px"/>
                <p>Movie 2</p>
                <img src="./src/assets/test.jpg" width="300px"/>
            </div>
        </div>
    }
}

export default MovieFeed