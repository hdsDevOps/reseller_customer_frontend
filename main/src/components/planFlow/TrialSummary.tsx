import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { format } from "date-fns";
import { currencyList } from "../CurrencyList";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { plansAndPricesListThunk } from "store/user.thunk";

const TrialSummary: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // console.log("location state...", location.state);
  // const plan = location.state.plan;
  const [plan, setPlan] = useState(location.state.plan);
  // console.log("plan...", plan?.amount_details);
  const { defaultCurrencySlice, userDetails } = useAppSelector(state => state.auth);

  const [today, setToday] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getPlans = async() => {
      try {
        const result = await dispatch(plansAndPricesListThunk({subscription_id: location.state.plan.id})).unwrap();
        setPlan(result?.data[0]);
      } catch (error) {
        setPlan(location.state.plan);
      }
    };

    getPlans();
  }, [location.state]);
  
  useEffect(() => {
    const dayToday = new Date();
    setToday(format(dayToday, "MMMM dd, yyyy"));
    const trial = parseInt(location.state.plan.trial_period);
    
    const expiryDateValue = new Date();
    expiryDateValue.setDate(dayToday.getDate() + trial);

    setExpiryDate(format(expiryDateValue, "MMMM dd, yyyy"))
  }, []);

  const findAmount = async(array, defaultCurrencySlice) => {
    const data = await array?.find(item => item?.currency_code === defaultCurrencySlice)?.price;
    console.log(data)
    const amount = await data?.find(item => item?.type === location.state.period)?.discount_price;
    // console.log(amount);
    setAmount(amount);
  };
  
  useEffect(() => {
    findAmount(plan?.amount_details,defaultCurrencySlice);
  }, [plan, defaultCurrencySlice]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
    <p
      className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
      onClick={() => navigate('/how-you-will-sign-in-to-domain', {state: location.state})}
    >
      <IoChevronBackSharp /> Back to previous page
    </p>


      <div className="w-full max-w-lg p-6 border border-gray-300 rounded-xl bg-white mt-4">
        <h1 className="text-3xl font-medium mb-2">Trial Summary</h1>
        <hr className="border-gray-400 mb-4" />

        <div className="flex items-start gap-3 mb-4">
          <img
            src={plan?.icon_image}
            alt={plan?.plan_name}
            className="w-8 h-8 my-auto"
          />
          <div>
            <h2 className="text-3xl uppercase xsm-max:text-xl font-medium flex items-start gap-2 flex-col-reverse">
            <p className="text-xs text-gray-500 font-normal normal-case ">{location.state.period}</p>{plan?.plan_name}</h2>
            
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-8 mt-14 mb-10">
          <div className="absolute left-1 top-[23%] bottom-0 h-[3rem] w-[2px] bg-green-600 xsm-max:h-[2.5rem] xsm-max:top-[22%]">
          </div>
          <div className="w-full flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 text-white rounded-full">
              </div>
              <div className="w-full flex items-center justify-between">
              <p className="text-xl xsm-max:text-sm">Starting Today</p>
              <p className="text-xl xsm-max:text-sm">{plan?.trial_period}-days free trial</p>
              </div>
            </div>
          <div className="w-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white border-2 border-green-600 text-white rounded-full">
              </div>
              <div className="w-full flex items-center justify-between">
              <p className="text-xl xsm-max:text-sm">Starting {expiryDate}</p>
              <p className="text-xl xsm-max:text-sm">
                {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}
                {amount*location.state.license_usage}
                  {
                    location.state.period === "Yearly" ? "/year" : "/month"
                  }
                </p>
              </div>
            </div>
        </div>

        <ul className="text-xs text-gray-500 list-disc pl-5 mb-4">
          <li className="mb-6">To verify your payment method, you will be charged 2 {defaultCurrencySlice}, which will be refunded in 10 days.</li>
          <li className="mb-6">Cancel anytime in Subscription on Hordanso.</li>
          <li className="mb-6">You won't be charged if you cancel before your free trial ends, and we'll remind you 2 days before.</li>
          <li className="mb-6">We'll charge {amount} {defaultCurrencySlice} every { location.state.period === "Yearly" ? "/year" : "/month" } until you cancel. You can cancel renewal anytime before expire.</li>
        </ul>

        <p className="text-xs text-gray-500 mb-4">
          By clicking <span className="text-black">Start Free Trial</span> 
            you agree to the{" "}
            <a href="#" className="text-green-600 cursor-pointer">
              Google Workspace Agreement, Google Workspace purchase Agreement
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 cursor-pointer">
              Supplemental Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 cursor-pointer">
              Conditions for Google Workspace Free Trial Agreement.
            </a>.
        </p>

        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg" onClick={()=>navigate('/gemini-summary', { state: { ...location.state, plan: plan, } })}>
          Start Free Trial
        </button>
      </div>
    </div>
  );
};

export default TrialSummary;
