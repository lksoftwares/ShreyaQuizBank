import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav className="navb">
        <center>
          <span className="clr"> Welcome</span>
          <Link to="/">
            <button
              className="btnnn"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </Link>
        </center>
      </nav>
    </div>
  );
}

export default Navbar;
