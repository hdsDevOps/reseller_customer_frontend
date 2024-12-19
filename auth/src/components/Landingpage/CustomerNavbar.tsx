import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

export default function CustomerNavbar({width}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <div className={`flex lg:flex-row flex-col justify-between w-full bg-white lg:bg-transparent ${width<1024 ? "z-[1000] absolute" : ""}`}>
        <div className="flex lg:gap-6 items-center justify-between">
          
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
    </div>
  );
};