import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiArrowSortedDown } from "react-icons/ti";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="w-full flex justify-between items-center py-2 px-10">
      <div className="flex lg:gap-6 items-center justify-between">
        <Link to="#">
          <img
            src={process.env.BASE_URL + "/images/logo.jpeg"}
            alt="logo"
            className="w-16 h-16"
          />
        </Link>
        <ul className="lg:flex gap-4">
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
      <div className="lg:flex gap-10 items-center">
        <p>
          <Link to="#">Contact Us</Link>
        </p>
        <button className="bg-gray-100 text-green-500 hover:bg-green-500 hover:text-white border-none px-4 py-2.5 rounded-lg font-semibold text-base">
          <Link to="/login">Login</Link>
        </button>

        <div className="relative flex flex-col">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={toggleDropdown}>
            <img
              src={process.env.BASE_URL + "/images/usflag.png"}
              alt="logo"
              className="w-8 h-8"
            />
            <p className="font-normal text-base">USD</p>
            <TiArrowSortedDown size={20} />
          </div>

          {isDropdownOpen && (
            <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-2 w-32 z-10">
              <li className="flex gap-1 items-center hover:bg-gray-100 p-2">
                <img
                  src={process.env.BASE_URL + "/images/flag.png"}
                  alt="logo"
                  className="w-8 h-8"
                />
                <p className="font-normal text-base">INR</p>
              </li>
              <li className="flex gap-1 items-center hover:bg-gray-100 p-2">
                <img
                  src={process.env.BASE_URL + "/images/ukflag.png"}
                  alt="logo"
                  className="w-8 h-8"
                />
                <p className="font-normal text-base">GBP</p>
              </li>
              <li className="flex gap-1 items-center hover:bg-gray-100 p-2">
                <img
                  src={process.env.BASE_URL + "/images/euroflag.png"}
                  alt="logo"
                  className="w-8 h-8"
                />
                <p className="font-normal text-base">EUR</p>
              </li>
              <li className="flex gap-1 items-center hover:bg-gray-100 p-2">
                <img
                  src={process.env.BASE_URL + "/images/canadaflag.png"}
                  alt="logo"
                  className="w-8 h-8 !bg-white"
                />
                <p className="font-normal text-base">CAD</p>
              </li>
              <li className="flex gap-1 items-center hover:bg-gray-100 p-2">
                <img
                  src={process.env.BASE_URL + "/images/australianflag.jpg"}
                  alt="logo"
                  className="w-8 h-8"
                />
                <p className="font-normal text-base">AUD</p>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <RxHamburgerMenu size={24} />
      </div>
    </nav>
  );
}
