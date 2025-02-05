import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Bell, ShoppingCart } from "lucide-react";
import Dropdown from './DropdownMenu'
import NotificationCenter from "./Notification";
import { setDefaultCurrencySlice } from "store/authSlice";

const logoImage = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c';
const logoImageSmall = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userDetails, cartState, defaultCurrencySlice, notificationsList, isAdmin, rolePermission } = useAppSelector(state => state.auth);

  const[showNotification,setShowNotfication] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWidthChange);
    return () => window.removeEventListener('resize', handleWidthChange);
  }, []);

  const openModal = () => setShowNotfication(true);
  const closeModal = () => setShowNotfication(false);

  const onLogoutHandler = () => {
    // dispatch(resetUserSlice());
    // localStorage.clear();
    navigate("/login");
  };
  
  const getInitials = (name:string) => {
    return name?.split(' ').map(word => word.charAt(0).toUpperCase());
  };

  return (
    <header className={`bg-white flex text-black px-2 items-center justify-between z-50 fixed ${isAdmin ? "top-[70px]" : "top-0"} left-0 right-0 h-[70px]`}>
      <button
        type="button"
        onClick={() => {
          navigate('/home-page');
        }}
        className="flex items-center justify-center"
      >
        <img
          src={width < 640 ? logoImageSmall : logoImage}
          alt="logo"
          className="sm:h-10 h-14 object-contain"
        />
      </button>

      <div className="flex items-center space-x-4">
        {
          !isAdmin && (
            <button onClick={openModal} className="relative p-2 bg-[#DCEBDFCC] hover:bg-opacity-90 rounded-md">
              <Bell className="w-6 h-6 text-black" />
              <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-black text-white rounded-full text-[8px] font-semibold">
                {notificationsList?.length}
              </span>
            </button>
          )
        }
        {showNotification && <NotificationCenter onClose={closeModal}/> }
       

        {
          !isAdmin && (
            <button className="relative p-2 bg-[#DCEBDFCC] hover:bg-opacity-90 rounded-md" onClick={()=> navigate('/add-cart')}>
              <ShoppingCart className="w-6 h-6 text-black" />
              <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-black text-white rounded-full text-[8px] font-semibold">
                {cartState?.length || 0}
              </span>
            </button>
          )
        }
        <div className="flex items-center justify-center space-x-2">
          {
            userDetails?.profile_image
            ? (
              <button className="relative p-2 hover:bg-opacity-90 rounded-full">
                <img
                  src={userDetails?.profile_image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
                />
              </button>
            ) : (
              <button className="relative p-2 bg-[#FF7272] hover:bg-opacity-90 rounded-full" type="button">
                <p className="text-white">{getInitials(userDetails?.first_name || "J")}{getInitials(userDetails?.last_name || "D")}</p>
              </button>
            )
          }
          <Dropdown />
        </div>
        
      </div>
    </header>
  );
}