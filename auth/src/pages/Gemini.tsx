import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaClover } from "react-icons/fa6";
import { IoChevronBackSharp } from "react-icons/io5";

const PlanCard: React.FC = () => {
  const geminiPlan = {
    name: "Gemini Standard",
    iconClass: "text-green-600",
    offers: [
      "Gemini in Gmail, Docs, Sheets, Slides, and Meet",
      "Access to Gemini with Google's most capable AI models",
      "Enterprise-grade security and privacy",
      "Meets the needs of typical business users",
    ],
    price: "₹1,520",
    startingAt: "₹2100",
    nextRenewalDate: "12-07-2024",
    alternativePrice: "₹1.824",
  };

  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>
      <div className="mt-6 flex flex-col items-center justify-center mb-8 xsm-max:mb-2 text-center">
        <h2 className="text-5xl font-bold xsm-max:text-[20px]">Add Gemini to Your Workspace Plan</h2>
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg w-full max-w-sm h-fit pb-10 mb-4 relative z-10">
          <div className="p-4 sm:p-6">
            <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-gray-900 mb-2 uppercase">
              <FaClover className={geminiPlan.iconClass} /> {geminiPlan.name}
            </h1>

            {/* Pricing Information */}
            <p className="text-xs sm:text-sm text-gray-700 my-4">
              Per user/month, one-year commitment
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Starting at{" "}
              <span className="text-red-500 line-through">
                {geminiPlan.startingAt}
              </span>
            </p>
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <p className="text-3xl sm:text-5xl font-medium text-black">
                {geminiPlan.price}
              </p>
              <span className="text-[10px] sm:text-[12px] rounded-sm bg-green-700 text-black py-[2px] px-2 mt-2">
                SAVE 55%
              </span>
            </div>

            {/* Checkbox */}
            <div className="flex items-start mb-4 text-sm sm:text-base">
              <input
                type="checkbox"
                id={`monthly-billing`}
                className="checkbox checkbox-sm border-2 border-black [--chkbg:theme(colors.white)] rounded-[3px] mt-1 mr-2"
              />
              <label
                htmlFor={`monthly-billing`}
                className="text-gray-700"
              >
                {`${geminiPlan.alternativePrice} INR per user/month, when billed monthly`}
              </label>
            </div>

              
                <button className="bg-black text-white py-2 px-3 w-full sm:py-2 sm:px-4 rounded-lg">
                  Start Trial
                </button>

            <div className="text-gray-500 text-xs sm:text-xs text-right">
              {`Next renewal date: ${geminiPlan.nextRenewalDate}`}
            </div>
          </div>

          {/* Offers */}
          <div className="px-4 sm:px-6">
            <div className="flex flex-col gap-1 sm:space-y-2 text-gray-700">
              {geminiPlan.offers.map((offer, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className=""><IoCheckmarkCircleSharp className="text-green-600 text-xl" /></div>
                  <p className="text-gray-700">{offer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        className="self-end bg-[#12a83c9d] uppercase text-black py-2 px-8 rounded-lg font-semibold"
        onClick={() => navigate('/summary')} 
      >
        Skip
      </button>
    </div>
  );
};

export default PlanCard;
