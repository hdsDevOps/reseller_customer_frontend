import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";

const currencyList = [
  { name: 'EUR', logo: '€',},
  { name: 'AUD', logo: 'A$',},
  { name: 'USD', logo: '$',},
  { name: 'NGN', logo: 'N₦',},
  { name: 'GBP', logo: '£',},
  { name: 'CAD', logo: 'C$',},
  { name: 'INR', logo: '₹',},
];
const SummaryDomainDetails = ({state}:any) => {
  console.log("state....", state);
  const defaulCurrency = "USD";
  
  const [today, setToday] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    const dayToday = new Date();
    setToday(format(dayToday, "MMMM dd, yyyy"));
    const trial = parseInt(state.plan.trial_period);
    
    const expiryDateValue = new Date();
    expiryDateValue.setDate(dayToday.getDate() + trial);

    setExpiryDate(format(expiryDateValue, "MMMM dd, yyyy"))
  }, []);
  
  const findAmount = async(array) => {
    const data = await array.find(item => item.currency_code === defaulCurrency).price;
    const amount = await data.find(item => item.type === state.period)?.discount_price;
    setAmount(amount);
  };
  
  useEffect(() => {
    findAmount(state.plan.amount_details);
  }, [state]);
  return (
    <div className="">
      {/* Plan Details */}
      <div>
        <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
          Plan details
        </h2>
        <div className="mb-3 w-[220px]">
          <p className="text-gray-500">{state.plan.plan_name}</p>
          <p className="text-gray-500">
            {currencyList.find(item => item.name === defaulCurrency)?.logo}
            {amount}
            {
              state.period === "Yearly" ? "user/year" : "user/month"
            }
          </p>
          <p className="text-gray-500">
            Your first {state.plan.trial_period} days are at no charge (limited to 10 users). You can{" "}
            <span className="text-blue-500 underline">cancel at any time</span>.
          </p>
          <p className="text-gray-500">
            Recurs at the end of every {
              state.period === "Yearly" ? "year" : "month"
            }.
          </p>
        </div>
      </div>
      {/* Domain Details */}
      <div>
        <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
          Domain details
        </h2>
        <div className="mb-3 w-[220px]">
          <p className="text-gray-500">domain.co.in</p>
          <p className="text-gray-500">₹ 648.00 per year</p>
          <p className="text-gray-500">
            Your annual plan will begin <strong>June 25, 2024</strong>. You can{" "}
            <span className="text-blue-500 underline">cancel at any time</span>.
          </p>
          <p className="text-gray-500">
            Charges today and recurs yearly on June 25.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
            Contact Information
          </h2>
          <button className="text-green-600 underline hover:text-green-800">
            <BiSolidEditAlt className="text-[30px] font-extrabold" />
          </button>
        </div>
        <div className="mb-3 w-[220px]">
          <p className="text-gray-500">Robert Clive</p>
          <p className="text-gray-500">robertclive@gmail.com</p>
          <p className="text-gray-500">9874761230</p>
        </div>
      </div>

      {/* Business Information */}
      <div>
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="pb-2 mb-3 text-[20px] font-extrabold border-b-2 border-black inline-block relative">
            Business information
          </h2>
          <button className="text-green-600 underline hover:text-green-800">
            <BiSolidEditAlt className="text-[30px] font-extrabold" />
          </button>
        </div>
        <div className="w-[220px]">
          <p className="text-gray-500">ABC Business</p>
          <p className="text-gray-500">
            Amherst St, College Row, College Street
          </p>
          <p className="text-gray-500">Kolkata 700009</p>
          <p className="text-gray-500">West Bengal</p>
          <p className="text-gray-500">India</p>
          <p className="text-gray-500">8777593945</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDomainDetails;
