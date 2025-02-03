import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaClover } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { currencyList } from "./CurrencyList";
import { useAppSelector } from "store/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PlanCard: React.FC = ({plans, handleLeftPlan, handleRightPlan, plansLength}:any) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  const [isYearly, setIsYearly] = useState(false);
  const [checkbox, setCheckbox] = useState<null|string>(null);
  console.log("checkbox...", checkbox);
  const [currentPlans, setCurrentPlans] = useState([]);
  // console.log("plans...", currentPlans);
  const [initialIndex, setInitialIndex] = useState(0);
  const toggleBilling = () => {
    setIsYearly(!isYearly);
    setCheckbox(null);
  };
  const [isHovering, setIsHovering] = useState<Number|null>(null);

  // console.log("plans...", plans);

  useEffect(() => {
    if(plans?.length > 0) {
      const data = plans?.filter((plan, index) => index < 3 );
      setCurrentPlans(data);
    }
  }, [plans]);

  const trialExpirationDate = (count) => {
    const today = new Date();
    const monthFromToday = new Date();
    monthFromToday.setDate(today?.getDate() + parseInt(count));
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
          {/* <input
            type="checkbox"
            className="toggle border-2 border-green-500 bg-green-500 [--tglbg:white] hover:bg-green-700"
            checked={isYearly}
            onChange={toggleBilling}
          /> */}
          {/* <label className="relative cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={isYearly} onClick={toggleBilling} />
            <div
              className="sm:w-[70px] w-[40px] sm:h-[40px] h-[18px] flex items-center bg-white rounded-full sm:text-[7px] text-[6px] peer-checked:text-[#00D13B] text-[#00D13B] font-extrabold after:flex after:items-center after:justify-center peer sm:peer-checked:after:translate-x-full peer-checked:after:translate-x-[0px] after:absolute sm:after:left-[2px] after:left-[0px] peer-checked:after:border-[#00D13B] border-[#00D13B] after:bg-[#00D13B] after:border after:border-[#00D13B] after:rounded-full sm:after:h-7 after:h-7 sm:after:w-7 after:w-7 after:transition-all peer-checked:bg-[#00D13B]">
            </div>
          </label> */}
          <label className="relative cursor-pointer flex items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isYearly}
              onChange={toggleBilling}
            />
            <div
              className={`w-14 sm:h-8 h-7 rounded-full ${
                isYearly ? "bg-green-500" : "bg-gray-300"
              } flex items-center transition-all`}
              // onClick={toggleBilling} // Ensures the toggle works even when clicking the container
            >
              <div
                className={`sm:w-6 w-5 sm:h-6 h-5 bg-white rounded-full shadow-md transform transition-all ${
                  isYearly ? "sm:translate-x-7 translate-x-8" : "translate-x-1"
                }`}
              ></div>
            </div>
          </label>
          <p className="text-lg sm:text-xl font-medium">Yearly</p>
        </div>
      </div>

      {/* <div className="flex min-sm:flex-row  items-end justify-center gap-2 w-full max-sm:flex-col max-sm:items-center   mt-6"> */}
      <div className="flex flex-col xl:flex-row lg:flex-row  lg:items-stretch justify-start gap-2 w-full sm:flex-col sm:items-center mt-6 bg-white relative">
      {/* <div className="grid   md:grid-cols-3  grid-cols-1 w-full    mt-6"> */}
        {
          plansLength > 3 && (
            <button
              type="button"
              className="absolute left-0 top-[300px] transform -translate-y-1/2 p-1 rounded-full z-50"
              onClick={() => {handleLeftPlan()}}
            >
              <ChevronLeft className="w-10 h-10 text-white bg-black bg-opacity-50 rounded-full" />
            </button>
          )
        }
        
        {
          plansLength > 3 && (
            <button
              type="button"
              className="absolute right-0 top-[300px] transform -translate-y-1/2 p-1 rounded-full z-50"
              onClick={() => {handleRightPlan()}}
            >
              <ChevronRight className="w-10 h-10 text-white bg-black bg-opacity-50 rounded-full" />
            </button>
          )
        }
        
        {
          currentPlans?.length > 0 && currentPlans?.map((plan, index) => {
            return (
              <div
                key={index}
                className="relative transition-transform transform lg:w-1/3  md:w-3/4 sm:w-full mb-5"
                //className="col-span-1"
              >
                <div className={`${plan?.sticker_exists ? "border-green-600" : "border-transparent"} border-2 border-solid p-0 rounded-lg relative flex flex-col justify-start w-full shadow-md h-full`}>
                  <div className={`${plan?.sticker_exists ? "opacity-100" : "opacity-0"} bg-green-600 text-white text-md text-left pl-4 rounded-t-lg relative z-20`}>
                    <h1 className="leading-9">{plan?.sticker_text || "noo"}</h1>
                  </div>
                  <div className="bg-white rounded-lg rounded-l-none rounded-r-none xsm-max:mb-1 relative z-10 h-[600px] lg:h-[620px] sm:h-auto h-auto">
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
                              className="checkbox checkbox-sm border-2 border-black rounded-[3px] mt-1 mr-2"
                              checked={checkbox === plan?.id}
                              onChange={() => {setCheckbox(prev => prev === plan?.id ? null : plan?.id)}}
                            />
                          )
                        }
                        <label
                          htmlFor={`monthly-billing-${index}`}
                          className="text-gray-700"
                        >
                          {isYearly
                            ? `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}${getParticularAmount(plan?.amount_details, "Yearly")?.discount_price} per user / month`
                            : `Or ${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}${getParticularAmount(plan?.amount_details, "Monthly")?.discount_price} per user / month when billed monthly (without yearly commitment)`}
                        </label>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col gap-1">
                        <button
                          className="bg-green-100 text-black py-1 px-2 sm:py-1 sm:px-4 rounded-lg mb-2 sm:mb-0 font-semibold text-[10px] sm:text-[12px]"
                          onMouseEnter={() => {setIsHovering(index)}}
                          onMouseLeave={() => {setIsHovering(null)}}
                          onClick={() => {navigate('/ai')}}
                        >
                          Gemini add-on available
                        </button>
                        <button type="button" onClick={() => {navigate('/subscribe', { state: { ...location.state, plan: plan, period: `${
                          isYearly ? 'Yearly' : 
                          checkbox ? 'Monthly' :
                          'Yearly Subscription with monthly billing'
                        }`} })}}className="bg-black text-white py-2 px-3 w-full sm:py-2 sm:px-4 rounded-lg">
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
                        Next renewal date: {trialExpirationDate(plan?.trial_period || 0)}
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
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PlanCard;
