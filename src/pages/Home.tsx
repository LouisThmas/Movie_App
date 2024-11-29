import Message from "../components/Message";
import "./Home.css";

function Home () {
  //const [message, setMessage] = useState("");

  //useEffect(() => {fetch("http://127.0.0.1:5000/api/route").then(res => res.json()).then(data => {setMessage(data.message);});}, [])

  return <div className="home-container">
    <Message />
  </div>;
}

export default Home