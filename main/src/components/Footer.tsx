import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Bell, ShoppingCart } from "lucide-react";
import Dropdown from './DropdownMenu'
import NotificationCenter from "./Notification";

export default function Footer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [pesentYear, setPresentYear] = useState<string|Number>('2025');
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    setPresentYear(year);
  }, []);

  return (
    <div className="w-full !h-10 bg-[#E3EFE5] items-center pt-2">
      <p className="font-inter font-normal text-[10px] text-[#848484] text-center">© {pesentYear.toString()} HORDANSO WORKSPACE. All rights reserved</p>
    </div>
  );
}