import "./User.css";
import UserSaved from "../components/UserSaved";

function User () {

  return <div className="user-container">
    <div className="user-info">
      <img className="user-icon" src="src/assets/icon.png"/>
      <p className="user-desc">This is a description of the present user</p>
    </div>
    <UserSaved/>
  </div>
}

export default User