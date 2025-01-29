import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Bell, ShoppingCart, X } from "lucide-react";
import Dropdown from './DropdownMenu'
import NotificationCenter from "./Notification";
import { setAdminNameSlice, setDefaultCurrencySlice, setIsAdminSlice } from "store/authSlice";
import './adminNavbar.css';
import { removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { toast } from "react-toastify";

const logoImage = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo-2.png?alt=media&token=9315e750-1f5d-4032-ba46-1aeafa340a75';
const logoImageSmall = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899';

export default function AdminHeader() {
  const dispatch = useAppDispatch();
  const { isAdmin, adminName, userDetails, expirationTimeSlice } = useAppSelector(state => state.auth);

  const exitAccess = async() => {
    try {
      await dispatch(removeUserAuthTokenFromLSThunk());
      // window.location.href=`${process.env.}`;
      // window.location.href=`http://localhost:4000/customers`;
      window.location.href=`https://main.admin.gworkspace.withhordanso.com/`;
    } catch (error) {
      toast.error("Error exiting access");
    }
  };

  return (
    <header className="bg-white flex items-center z-50 fixed top-0 left-0 right-0 h-[70px]">
      {/* bg-white flex text-black px-2 items-center justify-between z-50 fixed top-[70px] left-0 right-0 h-[70px] */}
      <div className="admin-navbar">
        <h6 className="font-inter font-medium text-2xl text-white">{adminName} logged in as : {userDetails?.first_name} {userDetails?.last_name} </h6>

        <button
          type="button"
          className="w-fit flex items-center px-4 py-1 rounded-2xl border-[0.5px] border-[#12A833] bg-[#FFFFFF3D]"
          onClick={() => {exitAccess()}}
        >
          <X className="text-[#FF0000] w-4 h-4" />
          <span className="font-inter font-bold text-xs text-[#FF2B2B]">Exit Access</span>
        </button>
      </div>
    </header>
  );
}