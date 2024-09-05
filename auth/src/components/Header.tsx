import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/home">
        Hordanso
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto w-100">
          <li className="nav-item">
            <Link to="#" className="nav-link">
              Plan & Price
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              FAQ's
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              Resources
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              AI
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              Contact Us
            </Link>
          </li>
        </ul>
        
        {/* Right-aligned login button */}
        <div className="d-flex justify-content-end">
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
