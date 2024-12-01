import Input from "../components/Input.tsx";
import Navbar from "../components/Navbar.tsx";
import "./Home.css";

function Home () {
  //const [message, setMessage] = useState("");

  //useEffect(() => {fetch("http://127.0.0.1:5000/api/route").then(res => res.json()).then(data => {setMessage(data.message);});}, [])

  return <>
    <Navbar currentPage="home"/>
    <div className="home-container">
      <Input />
    </div>
  </>
}

export default Home