import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

function NavBar() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="navbar-container">
      <h2 className="main-title">Groove Burner</h2>
      {isAuthenticated() && (
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/groovelist">Start a Groovelist</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavBar;
