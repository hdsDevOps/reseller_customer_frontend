import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Bell, ShoppingCart } from "lucide-react";
import Dropdown from './DropdownMenu'
import NotificationCenter from "./Notification";
import { setDefaultCurrencySlice } from "store/authSlice";
import { getLandingPageThunk } from "store/user.thunk";
import CustomerNavbar from "./landingPage/CustomerNavbar";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const initialHeader = {
  menu1: 'Plan & Price',
  menu2: 'About Us',
  menu3: 'FAQ’s',
  menu4: 'Resources',
  menu5: 'AI',
  menu6: 'Contact Us',
};

const logoImage = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c';
const logoImageSmall = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899';

export default function LaningPageHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  // console.log("location...", location);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [header, setHeader] = useState(initialHeader);
  // console.log("header...", header);

  const getLandingPageData = async() => {
    try {
      const result = await dispatch(getLandingPageThunk()).unwrap();
      setHeader(result?.data?.header);
    } catch (error) {
      setHeader(initialHeader);
    }
  }
  
  useEffect(() => {
    getLandingPageData();
  }, []);

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

  const handleScroll = (sectionId:string) => {
    const section = document.getElementById(sectionId);
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if(location.state) {
      handleScroll(location.state);
    }
  }, [location.state]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="w-full flex items-center py-2 px-10 relative bg-white" id="home">
      <button
        type="button"
        onClick={() => {
          location.pathname.toLowerCase().includes('/home-page')
          ? handleScrollTop()
          : navigate('/home-page');
        }}
      >
        <img
          src={logoImage}
          alt="logo"
          className="h-10 object-contain"
        />
      </button>

      <div className="lg:block hidden w-full ml-6">
        <CustomerNavbar header={header} width={width} closeNav={toggleNavOpen} navOpen={isNavOpen} />
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
        <div className={isNavOpen ? 'block absolute left-0 right-0 top-[60px]' : 'hidden'}>
          <CustomerNavbar header={header} width={width} closeNav={toggleNavOpen} navOpen={isNavOpen} />
        </div>
        : null
      }
    </nav>
  );
}