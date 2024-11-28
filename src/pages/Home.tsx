import Message from "../components/Message";

function Home () {
  //const [message, setMessage] = useState("");

  //useEffect(() => {fetch("http://127.0.0.1:5000/api/route").then(res => res.json()).then(data => {setMessage(data.message);});}, [])

  return <>
    <hr id="top-line"></hr>
    <Message />
    <hr id="bottom-line"></hr>
  </>;
}

export default Home