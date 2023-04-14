import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

function NavBar() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="navbar-container">
      <h2 className="main-title">Groove Burner</h2>
      <ul>
        {isAuthenticated() ? (
          <li>
            <Link to="/home">home</Link>
          </li>
        ) : null}
        {isAuthenticated() ? (
          <li>
            <Link to="/groovelist">start a Groovelist</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default NavBar;
