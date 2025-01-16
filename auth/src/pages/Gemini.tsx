import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaClover } from "react-icons/fa6";
import { IoChevronBackSharp } from "react-icons/io5";
import { useAppSelector } from "store/hooks";
import { currencyList } from "../components/CurrencyList";

const PlanCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  const geminiPlan = {
    name: "Gemini Standard",
    iconClass: "text-green-600",
    offers: [
      "Gemini in Gmail, Docs, Sheets, Slides, and Meet",
      "Access to Gemini with Google's most capable AI models",
      "Enterprise-grade security and privacy",
      "Meets the needs of typical business users",
    ],
    price: `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}1,520`,
    startingAt: `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}2100`,
    nextRenewalDate: "12-07-2024",
    alternativePrice: `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}1.824`,
  };


  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate('/free-trial', {state: location.state})}
        // '/', {state: location.state}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      {/* COULND't BE COMMENTED OUT, SO COPIED TO Gemini-copy.tsx */}

      {/* THIS SECTION IS MADE FOR TEMPORARY, WHEN COMMENTED OUT SECTION IS IN WORKS, TAKE THE CODE FROM Gemini-copy.tsx AND USE THAT AND REMOVE THIS ONE */}
      <div className="mt-6 flex flex-col items-center justify-center mb-8 xsm-max:mb-2 text-center">
        <h2 className="text-5xl font-bold xsm-max:text-[20px]">Gemini will be available soon</h2>
      </div>

      <button
        className="self-end bg-[#12a83c9d] uppercase text-black py-2 px-8 rounded-lg font-semibold"
        onClick={() => navigate('/summary', {state: location.state})}
      >
        Skip
      </button>
    </div>
  );
};

export default PlanCard;
