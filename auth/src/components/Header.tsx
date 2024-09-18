import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
// import logo from "../images/hordansologo 1.png";

export default function Header() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-10">
      <div className="flex lg:gap-6 items-center justify-between">
        <Link to="#">
        <img
            src={process.env.BASE_URL + "/images/logo.jpeg"}
            alt="logo"
            className="w-16 h-16"
          />
        </Link>
        <ul className="lg:flex gap-4 hidden">
      <li>
              <Link to="#">Plan & Price</Link>
            </li>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">FAQ's</Link>
            </li>
            <li>
              <Link to="#">Resources</Link>
            </li>
            <li>
              <Link to="#">AI</Link>
            </li>
      </ul>
      </div>
      <div className="lg:flex gap-10 items-center hidden ">
      <p>
      <Link to="#">Contact Us</Link>
      </p>
        <button className="bg-gray-100 text-green-500 hover:bg-green-500 hover:text-white border-none px-4 py-2.5 rounded-lg font-semibold text-base"><Link to="/login">Login</Link></button>
      </div> 
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <RxHamburgerMenu size={24} />
      </div>
    </nav>
  );
}
