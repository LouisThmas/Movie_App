import { useState, useEffect } from "react";

function Message () {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter > 2)
            console.log("Helo!")
    }, [counter])

    return <div id="main-message">
        <h1>The Movie Matcher</h1>
        <button onClick={() => setCounter(counter + 2)}>Click Me!</button>
        <p>{counter}</p>
        <form>
            <label>What is on your mind?</label><br></br>
            <input type="text" id="thought" name="thought" size="70"/>
        </form>
    </div>;
}

export default Message