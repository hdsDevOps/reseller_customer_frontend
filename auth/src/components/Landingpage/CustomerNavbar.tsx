import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

export default function CustomerNavbar({width, closeNav, navOpen}: { width: number, closeNav: () => void, navOpen: boolean }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if(!navOpen) {
      setIsDropdownOpen(false);
    }
  }, [navOpen]);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className={`flex lg:flex-row flex-col justify-between lg:gap-0 gap-2 w-full bg-white lg:bg-transparent ${width<1024 ? "z-[1000] absolute" : ""}`}>
        <ul className="lg:flex lg:gap-4 lg:pl-0 pl-3 items-center justify-between">
          <li className="py-1 lg:py-0">
            <Link to="/plans">Plan & Price</Link>
          </li>
          <li className="py-1 lg:py-0">
            <Link to="/about-us">About Us</Link>
          </li>
          <li className="py-1 lg:py-0">
            <Link to="/faqs">FAQ's</Link>
          </li>
          <li className="py-1 lg:py-0">
            <Link to="/resources">Resources</Link>
          </li>
          <li className="py-1 lg:py-0">
            <Link to="#">AI</Link>
          </li>
        </ul>
        <div className="lg:flex lg:gap-10 items-center lg:pl-0 pl-3">
          <p className="my-2 lg:my-0">
            <Link to="#">Contact Us</Link>
          </p>
          <button
            className="bg-gray-100 text-green-500 hover:bg-green-500 hover:text-white border-none px-4 py-2.5 rounded-lg font-semibold text-base my-2 lg:my-0"
            type="button"
            onClick={() => {
              navigate('/login');
              closeNav();
            }}
          >Login</button>

          <div className="relative flex flex-col my-2 lg:my-0">
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