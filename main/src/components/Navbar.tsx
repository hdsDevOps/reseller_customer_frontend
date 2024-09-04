import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { resetUserSlice } from "store/authSlice"; // Adjust the import path if necessary

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    dispatch(resetUserSlice());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto w-100">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/domain" className="nav-link">
              Domain
            </Link>
          </li>
        </ul>
        <div className="d-flex justify-content-end me-2">
          <button onClick={onLogoutHandler} className="btn btn-outline-primary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
