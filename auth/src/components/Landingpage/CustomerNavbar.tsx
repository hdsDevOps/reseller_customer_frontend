import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { currencyList } from '../CurrencyList';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toast } from "react-toastify";
import { setDefaultCurrencySlice } from "store/authSlice";

export default function CustomerNavbar({width, closeNav, navOpen, header}: { width: number, closeNav: () => void, navOpen: boolean, header:object }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  // console.log(location)

  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if(!navOpen) {
      setIsDropdownOpen(false);
    }
  }, [navOpen]);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleScroll = (sectionId:string) => {
    const section = document.getElementById(sectionId);
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const findDefaultFlag = () => {
    const data = currencyList.find(item => item.name === defaultCurrencySlice);
    if(data) {
      return data;
    } else {
      return currencyList.find(item => item.name === "USD");
    }
  };

  const setDefaultCurrencyNameOnSlice = async(name:string) => {
    try {
      const result = await dispatch(setDefaultCurrencySlice(name)).unwrap();
      // console.log("result...", result);
    } catch (error) {
      // toast.error("Error setting default currency");
    }
  }

  return (
    <div className={`flex lg:flex-row flex-col justify-between lg:gap-0 gap-2 w-full bg-white lg:bg-transparent ${width<1024 ? "z-[1000] absolute" : ""}`}>
      <ul className="lg:flex lg:gap-4 lg:pl-0 pl-3 items-center justify-between">
        <li className="py-1 lg:py-0">
          <button className=" hover:font-bold" onClick={() => {
            location.pathname.toLowerCase().includes('/home')
            ? handleScroll('plan_and_price')
            : navigate('/home', {state: 'plan_and_price'}); 
            closeNav();
          }}>{header?.menu1}</button>
        </li>
        <li className="py-1 lg:py-0">
          <button className=" hover:font-bold" onClick={() => {
            location.pathname.toLowerCase().includes('/home')
            ? handleScroll('about_us')
            : navigate('/home', {state: 'about_us'});
            closeNav();
          }}>{header?.menu2}</button>
        </li>
        <li className="py-1 lg:py-0">
          <button className=" hover:font-bold" onClick={() => {
            location.pathname.toLowerCase().includes('/home')
            ? handleScroll('faqs')
            : navigate('/home', {state: 'faqs'}); 
            closeNav();
          }}>{header?.menu3}</button>
        </li>
        <li className="py-1 lg:py-0">
          <button className=" hover:font-bold" onClick={() => {
            location.pathname.toLowerCase().includes('/home')
            ? handleScroll('resources')
            : navigate('/home', {state: 'resources'});
            closeNav();
          }}>{header?.menu4}</button>
        </li>
        <li className="py-1 lg:py-0">
          <button className={`hover:font-bold ${location.pathname === '/ai' ? "font-bold" : ""}`} onClick={() => {
            navigate('/ai');
            closeNav();
          }}>{header?.menu5}</button>
        </li>
      </ul>
      <div className="lg:flex lg:gap-10 items-center lg:pl-0 pl-3">
        <p className="my-2 lg:my-0">
          <button className=" hover:font-bold" onClick={() => {
            location.pathname.toLowerCase().includes('/home')
            ? handleScroll('plan_and_price')
            : navigate('/home', {state: 'plan_and_price'}); 
            handleScroll('contact_us');
            closeNav();
          }}>{header?.menu6}</button>
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
              src={findDefaultFlag()?.flag}
              alt={findDefaultFlag()?.name}
              className="w-8 h-8"
            />
            <p className="font-normal text-base">{findDefaultFlag()?.name}</p>
            <TiArrowSortedDown size={20} />
          </div>

          {isDropdownOpen && (
            <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-2 w-32 z-10">
              {
                currencyList.map((currency, index) => {
                  if(currency.name !== defaultCurrencySlice) {
                    return (
                      <li
                        className="flex gap-1 items-center hover:bg-gray-100 p-2"
                        key={index}
                        onClick={() => {
                          setDefaultCurrencyNameOnSlice(currency.name);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <img
                          src={currency.flag}
                          alt={currency.name}
                          className="w-8 h-8"
                        />
                        <p className="font-normal text-base">{currency.name}</p>
                      </li>
                    )
                  }
                })
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};