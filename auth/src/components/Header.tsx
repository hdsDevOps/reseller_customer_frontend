import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
<<<<<<< HEAD
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
=======
    <nav className="navbar bg-gray-100 !w-full flex px-4 !py-4">
      <div className="navbar-start !w-0">
        <a className="text-xl font-bold" href="#">
          {/* <img src={logo} alt="logo"/> */}
          Hordanso
        </a>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <RxHamburgerMenu className="w-6 h-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/plans">Plan & Price</Link>
            </li>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">FAQ's</Link>
            </li>
            <li>
              <Link to="#">Services</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/plans">Plan & Price</Link>
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              FAQ's
            </Link>
          </li>
<<<<<<< HEAD
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
=======
          <li>
            <Link to="#">FAQ's</Link>
          </li>
          <li>
            <Link to="#">Services</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
      {/* <div className="navbar-end !w-0"> */}
        <Link to="/login" className="btn bg-gray-100 text-lg text-green-500 hover:bg-green-500 hover:text-white border-none ">
          Login
        </Link>
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
      </div>
    </nav>
  );
}