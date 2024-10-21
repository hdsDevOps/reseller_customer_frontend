import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { Bell, ShoppingCart } from "lucide-react";
import Dropdown from './DropdownMenu'
import NotificationCenter from "./Notification";

interface HeaderProps{
  onSetShowProfile:React.Dispatch<React.SetStateAction<boolean>>
}
export default function Header({ onSetShowProfile}:HeaderProps) {
  const[showNotification,setShowNotfication] = useState(false)


  const openModal = () => setShowNotfication(true);
  const closeModal = () => setShowNotfication(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    // dispatch(resetUserSlice());
    // localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white flex text-black px-2 items-center justify-between z-50 fixed top-0 left-0 right-0">
    <a
      href="#"
      className="flex items-center justify-center"
    >
      <img 
        src={process.env.BASE_URL + "/images/logo.jpeg"} 
        alt="logo" 
        className="w-16 h-16 object-cover" 
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
            4
          </span>
        </button>
        <div className="flex items-center justify-center space-x-2">
        <button className="relative p-2 bg-[#FF7272] hover:bg-opacity-90 rounded-full">
            <p className="text-white">RC</p>
          </button>
        <Dropdown onSetShowProfile={onSetShowProfile}/>
        </div>
        
      </div>
    </header>
  );
}