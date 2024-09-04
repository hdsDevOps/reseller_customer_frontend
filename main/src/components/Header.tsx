import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
//import { resetUserSlice } from "store/authSlice"; // Adjust the import path if necessary

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Header
      </a>
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
    </nav>
  );
}
