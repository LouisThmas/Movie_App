import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import MovieFeed from "../components/MovieFeed.tsx";
import getMatchingMovies from "../utils/MovieFetcher.tsx";
import "./Home.css";

type Movie = {
  title: string;
  description: string;
};

function Home () {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [hasFeed, setFeedStatus] = useState<boolean>(false);
  const [thought, setThought] = useState<string>("");
  const [movies, setMovies] = useState<Movie[] | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    setIsMoving(true);
    const m = await getMatchingMovies(thought);
    setMovies(m)
  };

  const handleAnimationEnd = () => {
    setFeedStatus(true);
  }

  //useEffect(() => {fetch("http://127.0.0.1:5000/api/route").then(res => res.json()).then(data => {setMessage(data.message);});}, [])

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
        <MovieFeed isSent={hasFeed} thought={`Here are some suggestions for ${thought}`} movies={movies}/>
    </div>
  </>
}

export default Home