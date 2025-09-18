import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-items active" : "nav-items";
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img
          className="logo-img"
          src="/images/EMBER[1] 1 (2).png"
          alt="Ember Logo"
        />
      </div>
      <nav>
        <ul>
          <li>
            <Link className={isActive("/")} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={isActive("/login")} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="nav-items" to="#">
              Parental Ctrl
            </Link>
          </li>
          <li>
            <Link className="nav-items" to="#">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-items" to="#">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="menu-toggle">
        <img
          className="menuToggle-img"
          src="/images/menu.png"
          alt="menu"
        />
      </div>
    </header>
  );
}

export default Navbar;
