import "./Navbar.css"

type NavbarProps = {
  currentPage: string;
};

function Navbar({ currentPage }: NavbarProps) {
  // Define a function to get the dynamic class name
  const getClassName = (page : string) =>
    page === currentPage ? "nav-element active" : "nav-element";

  return (
    <div className="navbar">
      <a href="/home" className={getClassName("home")}>Home</a>
      <a href="/user" className={getClassName("user")}>User</a>
    </div>
  );
}

export default Navbar;
