import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaClover } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { currencyList } from "./CurrencyList";
import { useAppSelector } from "store/hooks";

const PlanCard: React.FC = ({plans}:any) => {
  const navigate = useNavigate();
  
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  const [isYearly, setIsYearly] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const toggleBilling = () => {
    setIsYearly(!isYearly);
    setCheckbox(false);
  };
  const [isHovering, setIsHovering] = useState<Number|null>(null);

  // console.log("plans...", plans);

  const trialExpirationDate = (count) => {
    const today = new Date();
    const monthFromToday = new Date();
    monthFromToday.setDate(today.getDate() + parseInt(count));
    return format(monthFromToday, "dd-MM-yyyy");
  };
  
  const getParticularAmount = (array, period) => {
    const amountArray = array?.find(item => item?.currency_code === defaultCurrencySlice);
    const amount = amountArray?.price?.find(item => item?.type === period);
    return amount;
  };

  const discountPercentage = (array, period) => {
    const amountArray = array?.find(item => item?.currency_code === defaultCurrencySlice);
    const amount = amountArray?.price?.find(item => item?.type === period);
    const discount = parseFloat((((parseFloat(amount?.price) - parseFloat(amount?.discount_price)) / parseFloat(amount?.price)) * 100).toFixed(2));
    return discount;
  };


  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h2 className="text-2xl font-medium">Choose your plan</h2>
        <p className="text-sm text-gray-500">
          Choose a plan that suits your business needs
        </p>
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

      {/* <div className="flex min-sm:flex-row  items-end justify-center gap-2 w-full max-sm:flex-col max-sm:items-center   mt-6"> */}
      <div className="flex flex-col xl:flex-row  lg:flex-row  lg:items-stretch   justify-center gap-2 w-full sm:flex-col sm:items-center   mt-6">
      {/* <div className="grid   md:grid-cols-3  grid-cols-1 w-full    mt-6"> */}
      
        {
          plans?.length > 0 && plans?.map((plan, index) => {
            if(index < 3) {
              return (
                <div
                  key={index}
                  className="relative transition-transform transform lg:w-1/3  md:w-3/4 sm:w-full mb-5"
                  //className="col-span-1"
                >
                  {/* Conditionally render the parent div for the second plan only */}
                  {index === 1 && (
                    <div className=" p-0 rounded-lg relative flex   flex-col justify-start w-full   border-2 border-solid border-green-600  h-full  ">
                      <div className="bg-green-600   text-white text-md text-left pl-4 rounded-t-lg relative -top-8 z-20 ">
                        <h1 className="leading-9">Popular</h1>
                      </div>
                      <div className="bg-white   rounded-lg rounded-l-none rounded-r-none  xsm-max:mb-1 relative z-10 h-[600px] lg:h-[620px] sm:h-auto h-auto mt-[-39px]">
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src={plan?.icon_image}
                              alt={plan?.plan_name}
                              className="w-5 h-5"
                            />
                            <h4 className="text-xl sm:text-2xl font-medium text-gray-900 uppercase whitespace-nowrap">{plan?.plan_name}</h4>
                          </div>

                          {/* Pricing Information */}
                          <p className="text-xs sm:text-sm text-gray-700 my-4">
                            {isYearly ? "Per user/year" : "Per user/month"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">
                            Starting at{" "}
                            <span className="text-red-500 line-through">
                              {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}{isYearly ? getParticularAmount(plan?.amount_details, "Yearly")?.price : getParticularAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.price}
                            </span>
                          </p>
                          <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <p className="text-3xl sm:text-5xl font-medium text-black">
                              {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}{isYearly ? getParticularAmount(plan?.amount_details, "Yearly")?.discount_price : getParticularAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.discount_price}
                            </p>
                            <span className="text-[10px] sm:text-[12px] rounded-sm bg-green-700 text-black py-[2px] px-2 mt-2">
                              Save {isYearly ? discountPercentage(plan?.amount_details, "Yearly") : discountPercentage(plan?.amount_details, "Yearly Subscription with monthly billing")}%
                            </span>
                          </div>

                          {/* Checkbox */}
                          <div className="flex items-start mb-4 text-sm sm:text-base">
                            {
                              isYearly ? "" : (
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-sm border-2 border-black [--chkbg:theme(colors.white)] rounded-[3px] mt-1 mr-2"
                                  checked={checkbox}
                                  onClick={() => {setCheckbox(!checkbox)}}
                                />
                              )
                            }
                            <label
                              htmlFor={`monthly-billing-${index}`}
                              className="text-gray-700"
                            >
                              {isYearly
                                ? `${getParticularAmount(plan?.amount_details, "Yearly")?.discount_price} per user / month`
                                : `Or ${getParticularAmount(plan?.amount_details, "Monthly")?.discount_price} per user / month when billed monthly (without yearly commitment)`}
                            </label>
                          </div>

                          {/* Buttons */}
                          <div className="flex flex-col gap-1">
                            <button
                              className="bg-green-100 text-black py-1 px-2 sm:py-1 sm:px-4 rounded-lg mb-2 sm:mb-0 font-semibold text-[10px] sm:text-[12px]"
                              onMouseEnter={() => {setIsHovering(index)}}
                              onMouseLeave={() => {setIsHovering(null)}}
                            >
                              Gemini add-on available
                            </button>
                            <button type="button" onClick={() => {navigate('/subscribe', { state: {plan: plan, period: `${
                              isYearly ? 'Yearly' : 
                              checkbox ? 'Monthly' :
                              'Yearly Subscription with monthly billing'
                            }`} })}} className="bg-black text-white py-2 px-3 w-full sm:py-2 sm:px-4 rounded-lg">
                              Start Trial
                            </button>
                            {
                              isHovering === index && (
                                <div
                                  className="absolute w-full top-5 left-0 right-0"
                                  onMouseEnter={() => setIsHovering(index)}
                                  onMouseLeave={() => setIsHovering(null)}
                                >
                                  <p className="font-inter font-medium text-base text-white w-full max-w-[300px] bg-[#12A833] border-2 border-black h-[200px] mx-auto">Gemini for Workspace now available Use generative AI to create or modify emails, documents, spreadsheets and more, directly in Google Workspace. Get started with a 14-day no-cost trial. <span className="text-black">See how it works</span></p>
                                  <div className="w-1 h-3 bg-[#12A833] border-2 border-black mx-auto"></div>
                                </div>
                              )
                            }
                          </div>

                          {/* Next Renewal Date */}
                          <div className="text-gray-500 text-xs sm:text-xs text-right mt-1">
                            Next renewal date: {trialExpirationDate(plan?.trial_period)}
                          </div>
                        </div>

                        {/* Offers */}
                        <div className="px-4 sm:px-6">
                          <div className="flex flex-col gap-1 sm:space-y-2 text-gray-700">
                            {plan?.top_features?.map((offer, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <IoCheckmarkCircleSharp className="text-green-600" />
                                {offer}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-3"></div>
                      </div>
                    </div>
                  )}
                  {/* Rendering the card without the background for other plans */}
                  {index !== 1 && (
                    <div className="bg-white border border-gray-200 rounded-lg   mb-1 w-full   relative z-10 h-full    "> 
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={plan?.icon_image}
                            alt={plan?.plan_name}
                            className="w-5 h-5"
                          />
                          <h4 className="text-xl sm:text-2xl font-medium text-gray-900 uppercase whitespace-nowrap">{plan?.plan_name}</h4>
                        </div>

                        {/* Pricing Information */}
                        <p className="text-xs sm:text-sm text-gray-700 my-4">
                          {isYearly ? "Per user/year" : "Per user/month"}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">
                          Starting at{" "}
                          <span className="text-red-500 line-through">
                            {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}{isYearly ? getParticularAmount(plan?.amount_details, "Yearly")?.price : getParticularAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.price}
                          </span>
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <p className="text-3xl sm:text-5xl font-medium text-black">
                            {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}{isYearly ? getParticularAmount(plan?.amount_details, "Yearly")?.discount_price : getParticularAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.discount_price}
                          </p>
                          <span className="text-[10px] sm:text-[12px] rounded-sm bg-green-700 text-black py-[2px] px-2 mt-2">
                            Save {isYearly ? discountPercentage(plan?.amount_details, "Yearly") : discountPercentage(plan?.amount_details, "Yearly Subscription with monthly billing")}%
                          </span>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start mb-4 text-sm sm:text-base">
                          {
                            isYearly ? "" : (
                              <input
                                type="checkbox"
                                className="checkbox checkbox-sm border-2 border-black [--chkbg:theme(colors.white)] rounded-[3px] mt-1 mr-2"
                                checked={checkbox}
                                onClick={() => {setCheckbox(!checkbox)}}
                              />
                            )
                          }
                          <label
                            htmlFor={`monthly-billing-${index}`}
                            className="text-gray-700"
                          >
                            {isYearly
                              ? `${getParticularAmount(plan?.amount_details, "Yearly")?.discount_price} per user / month`
                              : `Or ${getParticularAmount(plan?.amount_details, "Monthly")?.discount_price} per user / month when billed monthly (without yearly commitment)`}
                          </label>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-1">
                          <button className="bg-green-100 text-black py-1 px-2 sm:py-1 sm:px-4 rounded-lg mb-2 sm:mb-0 font-semibold text-[10px] sm:text-[12px]">
                            Gemini add-on available
                          </button>
                          <button type="button" onClick={() => {navigate('/subscribe', { state: {plan: plan, period: `${
                              isYearly ? 'Yearly' : 
                              checkbox ? 'Monthly' :
                              'Yearly Subscription with monthly billing'
                            }`} })}} 
                            className="bg-black text-white py-2 px-3 w-full sm:py-2 sm:px-4 rounded-lg">
                            Start Trial
                          </button>
                        </div>

                        {/* Next Renewal Date */}
                        <div className="text-gray-500 text-xs sm:text-xs text-right mt-1">
                          Next renewal date: {trialExpirationDate(plan?.trial_period)}
                        </div>
                      </div>

                      {/* Offers */}
                      <div className="px-4 sm:px-6">
                        <div className="flex flex-col gap-1 sm:space-y-2 text-gray-700">
                          {plan?.top_features?.map((offer, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <IoCheckmarkCircleSharp className="text-green-600" />
                              {offer}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3"></div>
                    </div>
                  )}
                </div>
              )
            }
          })
        }
      </div>
    </div>
  );
};

export default PlanCard;
