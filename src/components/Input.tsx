import { useState, useEffect } from "react";
import "./Input.css";

function Input () {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter > 2)
            console.log("Helo!")
    }, [counter])

    return <div id="main-border">
        <div id="main-message">
        <h1>The Movie Matcher</h1>
        <button onClick={() => setCounter(counter + 2)}>Click Me!</button>
        <p>{counter}</p>
        <form>
            <p id="input-text">What is on your mind...</p>
            <br></br>
            <input type="text" id="thought" name="thought" placeholder="Type here"/>
        </form>
    </div>
    </div>
}

export default Input