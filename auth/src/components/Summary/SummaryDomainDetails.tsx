import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { currencyList } from "../CurrencyList";
import { useAppSelector } from "store/hooks";

const SummaryDomainDetails = ({state, handleContactModalOpen, handleBusinessModalOpen, plan}:any) => {
  // console.log("state....", state);
  // console.log("plan...", plan);
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);
  
  const [today, setToday] = useState("");
  const [todayMinusYear, setTodayMinusYear] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    const dayToday = new Date();
    setToday(format(dayToday, "MMMM dd, yyyy"));
    setTodayMinusYear(format(dayToday, "MMMM dd"));
    const trial = parseInt(state.plan.trial_period || 0);
    
    const expiryDateValue = new Date();
    expiryDateValue.setDate(dayToday.getDate() + trial);

    setExpiryDate(format(expiryDateValue, "MMMM dd, yyyy"))
  }, [plan]);
  
  const findAmount = async(array) => {
    const data = await array.find(item => item.currency_code === defaultCurrencySlice)?.price;
    const amount = await data.find(item => item.type === state.period)?.discount_price;
    setAmount(amount);
  };
  
  useEffect(() => {
    findAmount(plan?.amount_details);
  }, [plan]);
  return (
    <div className="w-full grid grid-cols-1">
      {/* Plan Details */}
      <div className="w-full">
        <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
          Plan details
        </h2>
        <div className="mb-3 w-full max-w-[600px]">
          <p className="text-gray-500">{state.plan.plan_name}</p>
          <p className="text-gray-500">
            {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}
            {amount}{" "}
            {
              state.period === "Yearly" ? "user/year" : "user/month"
            }
          </p>
          <p className="text-gray-500">
            Your first {state.plan.trial_period} days are at no charge (limited to 10 users). You can{" "}
            <span className="text-[#12A833] underline">cancel at any time</span>.
          </p>
          <p className="text-gray-500">
            Recurs at the end of every {
              state.period === "Yearly" ? "year" : "month"
            }.
          </p>
        </div>
      </div>
      {/* Domain Details */}
      <div className="w-full">
        <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
          Domain details
        </h2>
        <div className="mb-3 w-full max-w-[600px]">
          <p className="text-gray-500">{state?.selectedDomain?.domain}</p>
          <p className="text-gray-500">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{state?.selectedDomain?.price[defaultCurrencySlice]}</p>
          <p className="text-gray-500">
            Your annual plan will begin <strong>{today}</strong>. You can{" "}
            <span className="text-[#12A833] underline">cancel at any time</span>.
          </p>
          <p className="text-gray-500">
            Charges today and recurs yearly on {todayMinusYear}.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
            Contact Information
          </h2>
          <button
            type="button"
            className="text-green-600 underline hover:text-green-800"
            onClick={handleContactModalOpen}
          >
            <BiSolidEditAlt className="text-[30px] font-extrabold" />
          </button>
        </div>
        <div className="mb-3 w-[220px]">
          <p className="text-gray-500">{state.formData.first_name} {state.formData.last_name}</p>
          <p className="text-gray-500">{state.formData.email}</p>
          <p className="text-gray-500">+{state.formData.phone_no}</p>
        </div>
      </div>

      {/* Business Information */}
      <div className="w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
            Business information
          </h2>
          <button
            type="button"
            className="text-green-600 underline hover:text-green-800"
            onClick={handleBusinessModalOpen}
          >
            <BiSolidEditAlt className="text-[30px] font-extrabold" />
          </button>
        </div>
        <div className="w-[220px]">
          <p className="text-gray-500">{state.formData.business_name}</p>
          <p className="text-gray-500">
            {/* {state.formData.address} */}
          </p>
          <p className="text-gray-500">{state.formData.business_city} {state.formData.business_zip_code}</p>
          <p className="text-gray-500">{state.formData.business_state}</p>
          <p className="text-gray-500">{state.formData.region}</p>
          {/* <p className="text-gray-500">8777593945</p> */}
        </div>
      </div>
    </div>
  );
};

export default SummaryDomainDetails;
