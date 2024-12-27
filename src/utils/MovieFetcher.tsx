import { useState } from "react";


async function getMatchingMovies (thought : string, page : number = 0) {

    const movies = fetch(`http://127.0.0.1:5000/api/route?search=${thought}&page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Problem fetching movies");
            }
            return response.json()});

    return movies;

}

export default getMatchingMovies;