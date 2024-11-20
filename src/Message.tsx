import { useState, useEffect } from "react";

function Message () {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter > 2)
            console.log("Helo!")
    }, [counter])

    return <>
        <h1>Hello brother</h1>
        <button onClick={() => setCounter(counter + 2)}>Click Me!</button>
        <p>{counter}</p>
    </>;
}

export default Message