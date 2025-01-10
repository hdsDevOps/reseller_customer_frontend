import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Bell, ShoppingCart } from "lucide-react";
import Dropdown from './DropdownMenu'
import NotificationCenter from "./Notification";

const logoImage = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo-2.png?alt=media&token=9315e750-1f5d-4032-ba46-1aeafa340a75';
const logoImageSmall = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userDetails, cartState } = useAppSelector(state => state.auth);

  const[showNotification,setShowNotfication] = useState(false);

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
    <header className="bg-white flex text-black px-2 items-center justify-between z-50 fixed top-0 left-0 right-0 h-[70px]">
      <a
        href="#"
        className="flex items-center justify-center"
      >
        <img
          src={logoImage}
          alt="logo"
          className="h-10 object-contain"
        />
      </a>

      <div className="flex items-center space-x-4">
        <button onClick={openModal} className="relative p-2 bg-[#DCEBDFCC] hover:bg-opacity-90 rounded-md">
          <Bell className="w-6 h-6 text-black" />
          <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-black text-white rounded-full text-[8px] font-semibold">
            4
          </span>
        </button>
        {showNotification && <NotificationCenter onClose={closeModal}/> }
       

        <button className="relative p-2 bg-[#DCEBDFCC] hover:bg-opacity-90 rounded-md" onClick={()=> navigate('/add-cart')}>
          <ShoppingCart className="w-6 h-6 text-black" />
          <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-black text-white rounded-full text-[8px] font-semibold">
            {cartState?.length || 0}
          </span>
        </button>
        <div className="flex items-center justify-center space-x-2">
        <button className="relative p-2 bg-[#FF7272] hover:bg-opacity-90 rounded-full">
            <p className="text-white">{getInitials(userDetails?.first_name || "J")}{getInitials(userDetails?.last_name || "D")}</p>
          </button>
          <Dropdown />
        </div>
        
      </div>
    </header>
  );
}