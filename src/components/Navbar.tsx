import React from "react";
import "./Navbar.css"

function Navbar({ currentPage }) {
  // Define a function to get the dynamic class name
  const getClassName = (page) =>
    page === currentPage ? "nav-element active" : "nav-element";

  return (
    <div className="navbar">
      <a href="/home" className={getClassName("home")}>Home</a>
      <a href="/user" className={getClassName("user")}>User</a>
    </div>
  );
}

export default Navbar;
