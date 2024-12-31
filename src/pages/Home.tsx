import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import MovieFeed from "../components/MovieFeed.tsx";
import getMatchingMovies from "../utils/MovieFetcher.tsx";
import "./Home.css";

type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  runtime: string;
  release_year: string;
};

function Home () {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [hasFeed, setFeedStatus] = useState<boolean>(false);
  const [thought, setThought] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    setIsMoving(true);
    const m = await getMatchingMovies(thought);
    setMovies(m);
    setMessage(thought);
  };

  const handleAnimationEnd = () => {
    setFeedStatus(true);
  }

  return <>
    <Navbar currentPage="home"/>
    <div id="main-border">
        <div className={`main-message ${isMoving ? "active" : ""}`} onTransitionEnd={handleAnimationEnd}>
            <h1>Movie Matcher</h1>
            <form onSubmit={handleSubmit}>
                <p id="input-text">What is on your mind...</p>
                <br></br>
                <input type="text" id="thought" name="thought" placeholder="Type here" value={thought} onChange={(e) => setThought(e.target.value)}/>
            </form>
        </div>
        <MovieFeed isSent={hasFeed} thought={message} movies={movies}/>
    </div>
  </>
}

export default Home