import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiArrowSortedDown } from "react-icons/ti";
import CustomerNavbar from "./Landingpage/CustomerNavbar";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNavOpen = () => {
    setIsNavOpen(false);
  }

  useEffect(() => {
    // Function to update the width state
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <nav className="w-full flex items-center py-2 px-10 relative">
      <Link to="/home">
        <img
          src={process.env.BASE_URL + "/images/logo.jpeg"}
          alt="logo"
          className="w-16 h-16"
        />
      </Link>

      <div className="lg:block hidden w-full">
        <CustomerNavbar width={width} closeNav={toggleNavOpen} navOpen={isNavOpen} />
      </div>
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ml-auto" onClick={() => { setIsNavOpen(!isNavOpen) }}>
        {
          isNavOpen ?
          <IoMdClose size={24} /> :
          <RxHamburgerMenu size={24} />
        }
      </div>
      {
        width < 1024 ?
        <div className={isNavOpen ? 'block absolute left-0 right-0 top-[80px]' : 'hidden'}>
          <CustomerNavbar width={width} closeNav={toggleNavOpen} navOpen={isNavOpen} />
        </div>
        : null
      }
    </nav>
  );
}
