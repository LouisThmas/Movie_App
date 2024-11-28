import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import NoPage from "./pages/NoPage";

function App () {
  //const [message, setMessage] = useState("");

  //useEffect(() => {fetch("http://127.0.0.1:5000/api/route").then(res => res.json()).then(data => {setMessage(data.message);});}, [])

  return <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App