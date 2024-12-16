import { useState } from "react";


async function getMatchingMovies (thought : string) {

    const movies = fetch(`http://127.0.0.1:5000/api/route?search=${thought}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Problem fetching movies");
            }
            return response.json()});

    return movies;

}

export default getMatchingMovies;