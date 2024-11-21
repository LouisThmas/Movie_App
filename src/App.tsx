import Message from "./Message";

function App () {
  //const [message, setMessage] = useState("");

  //useEffect(() => {fetch("http://127.0.0.1:5000/api/route").then(res => res.json()).then(data => {setMessage(data.message);});}, [])

  return <>
    <div id="main"><Message /></div>
  </>;
}

export default App