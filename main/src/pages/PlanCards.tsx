import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaClover } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { ArrowLeft, ChevronRight } from "lucide-react";

const PlanCard: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const toggleBilling = () => setIsYearly(!isYearly);

  const plans = [
    {
      name: "Business Starter",
      iconClass: "text-green-600",
      offers: [
        "Sync across devices",
        "5 workspaces",
        "Collaborate with 5 users",
      ],
      price: { monthly: "₹3.15", yearly: "₹36.00" },
      startingAt: { monthly: "₹6.99", yearly: "₹80.99" },
      nextRenewalDate: { monthly: "12-07-2024", yearly: "12-06-2025" },
      alternativePrice: { monthly: "₹5.00", yearly: "₹3.00" },
    },
    {
      name: "Business Plus",
      iconClass: "text-green-600",
      offers: [
        "Everything in Pro Plan",
        "Daily performance reports",
        "Dedicated assistant",
        "Artificial intelligence",
        "Marketing tools & automation",
        "Advance security",
      ],
      price: { monthly: "₹9.15", yearly: "₹108.00" },
      startingAt: { monthly: "₹20.99", yearly: "₹220.00" },
      nextRenewalDate: { monthly: "12-07-2024", yearly: "12-06-2025" },
      alternativePrice: { monthly: "18.00", yearly: "₹9.00" },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="self-start">
        <Link to="/payment-subscription">
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center mb-3">
            <ArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Upgrade Plan
          </h2>
        </Link>
        <div className="flex items-center gap-1 text-sm sm:text-md md:text-lg">
          <Link to="/domain">Payment subscription</Link>
          <ChevronRight />
          <p className="text-green-500">Upgrade Plan</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-1 text-center">
        <div className="flex items-center gap-2 mt-2">
          <p className="text-lg sm:text-xl font-medium">Monthly</p>
          <input
            type="checkbox"
            className="toggle border-2 border-green-500 bg-green-500 [--tglbg:white] hover:bg-green-700"
            checked={isYearly}
            onChange={toggleBilling}
          />
          <p className="text-lg sm:text-xl font-medium">Yearly</p>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row justify-center gap-2 mt-1">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative transition-transform transform hover:scale-[103px]"
          >
            <div
              className={`bg-white border border-gray-200 rounded-lg md:w-[380px] xsm-max:w-[340px] xsm-max:h-[550px] mb-1 md:h-[610px] md:mt-7 relative z-10`}
            >
              <div className="p-4 sm:p-6">
                <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-medium text-gray-900 mb-2 uppercase">
                  <FaClover className={plan.iconClass} /> {plan.name}
                </h1>

                {/* Pricing Information */}
                <p className="text-xs sm:text-sm text-gray-700 my-4">
                  {isYearly ? "Per user/year" : "Per user/month"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Starting at{" "}
                  <span className="text-red-500 line-through">
                    {isYearly
                      ? plan.startingAt.yearly
                      : plan.startingAt.monthly}
                  </span>
                </p>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <p className="text-3xl sm:text-5xl font-medium text-black">
                    {isYearly ? plan.price.yearly : plan.price.monthly}
                  </p>
                  <span className="text-[10px] sm:text-[12px] rounded-sm bg-green-700 text-black py-[2px] px-2 mt-2">
                    Save 55%
                  </span>
                </div>

                {/* Checkbox */}
                <div className="flex items-start mb-4 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id={`monthly-billing-${index}`}
                    className="checkbox checkbox-sm border-2 border-black [--chkbg:theme(colors.white)] rounded-[3px] mt-1 mr-2"
                  />
                  <label
                    htmlFor={`monthly-billing-${index}`}
                    className="text-gray-700"
                  >
                    {isYearly
                      ? `Or ${plan.alternativePrice.monthly} per user / month`
                      : `Or ${plan.alternativePrice.yearly} per user / month when billed monthly (without yearly commitment)`}
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-1">
                  <button className="bg-green-100 text-black py-1 px-2 sm:py-1 sm:px-4 rounded-lg mb-2 sm:mb-0 font-semibold text-[10px] sm:text-[12px]">
                    Gemini add-on available
                  </button>
                  <Link to="/subscribe">
                    <button className="bg-black text-white py-2 px-3 w-full sm:py-2 sm:px-4 rounded-lg">
                      Start Trial
                    </button>
                  </Link>
                </div>

                {/* Next Renewal Date */}
                <div className="text-gray-500 text-xs sm:text-xs text-right mt-1">
                  {isYearly
                    ? `Next renewal date: ${plan.nextRenewalDate.yearly}`
                    : `Next renewal date: ${plan.nextRenewalDate.monthly}`}
                </div>
              </div>

              {/* Offers */}
              <div className="px-4 sm:px-6">
                <div className="flex flex-col gap-1 sm:space-y-2 text-gray-700">
                  {plan.offers.map((offer, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <IoCheckmarkCircleSharp className="text-green-600" />
                      {offer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
