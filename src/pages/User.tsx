import "./User.css";
import UserSaved from "../components/UserSaved";
import Navbar from "../components/Navbar";

function User () {

  return <>
  <Navbar currentPage={"user"}/>
  <div className="user-container">
    <div className="user-info">
      <img className="user-icon" src="src/assets/icon.png"/>
      <p className="username">Username</p>
      <p className="email">Email</p>
    </div>
    <UserSaved/>
  </div>
</>
}

export default User