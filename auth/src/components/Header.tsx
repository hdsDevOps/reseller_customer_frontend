import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiArrowSortedDown } from "react-icons/ti";

interface NavProps {
  toggleDropdown: () => void;
  isCurrencyDropdownOpen: boolean;
}

function DesktopNav({ toggleDropdown, isCurrencyDropdownOpen }: NavProps) {
  return (
    <div className="max-lg:hidden lg:flex justify-between items-center w-full px-10">
      {/* Logo */}
      <Link to="/home">
        <img
          src={process.env.BASE_URL + "/images/logo.jpeg"}
          alt="logo"
          className="w-16 h-16"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="flex gap-6 items-center">
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
        <li>
          <Link to="#">Contact Us</Link>
        </li>
        <li className="relative">
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={process.env.BASE_URL + "/images/usflag.png"}
              alt="flag"
              className="w-6 h-6"
            />
            <p className="font-normal">USD</p>
            <TiArrowSortedDown size={20} />
          </div>
          {isCurrencyDropdownOpen && (
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
        </li>
      </ul>

      {/* Login Button */}
      <button className="bg-gray-100 text-green-500 hover:bg-green-500 hover:text-white border-none px-4 py-2.5 rounded-lg font-semibold">
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}

function MobileNav({ toggleDropdown, isCurrencyDropdownOpen }: NavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="lg:hidden w-full flex items-center justify-between px-5 py-2 bg-white shadow-md">
      {/* Logo */}
      <Link to="/home">
        <img
          src={process.env.BASE_URL + "/images/logo.jpeg"}
          alt="logo"
          className="w-12 h-12"
        />
      </Link>

      {/* Hamburger Icon */}
      <div role="button" className="p-2" onClick={toggleMobileMenu}>
        <RxHamburgerMenu size={24} />
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10">
          <ul className="flex flex-col items-start p-4 gap-4">
            <li>
              <Link to="#" onClick={toggleMobileMenu}>
                Plan & Price
              </Link>
            </li>
            <li>
              <Link to="#" onClick={toggleMobileMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" onClick={toggleMobileMenu}>
                FAQ's
              </Link>
            </li>
            <li>
              <Link to="#" onClick={toggleMobileMenu}>
                Resources
              </Link>
            </li>
            <li>
              <Link to="#" onClick={toggleMobileMenu}>
                AI
              </Link>
            </li>
            <li>
              <Link to="#" onClick={toggleMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li className="relative">
              <div
                className="flex items-center gap-1.5 cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={process.env.BASE_URL + "/images/usflag.png"}
                  alt="flag"
                  className="w-6 h-6"
                />
                <p className="font-normal">USD</p>
                <TiArrowSortedDown size={20} />
              </div>
              {isCurrencyDropdownOpen && (
                <ul className="mt-2 bg-white shadow-lg rounded-lg p-2 w-32 z-10">
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
            </li>
            <button
              onClick={toggleMobileMenu}
              className="bg-gray-100 text-green-500 hover:bg-green-500 hover:text-white border-none px-4 py-2.5 rounded-lg mt-2 font-semibold"
            >
              <Link to="/login">Login</Link>
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const toggleDropdown = () =>
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);

  return (
    <nav className="w-full bg-white shadow-md">
      {/* Render Desktop Navigation */}
      <DesktopNav
        toggleDropdown={toggleDropdown}
        isCurrencyDropdownOpen={isCurrencyDropdownOpen}
      />

      {/* Render Mobile Navigation */}
      <MobileNav
        toggleDropdown={toggleDropdown}
        isCurrencyDropdownOpen={isCurrencyDropdownOpen}
      />
    </nav>
  );
}
