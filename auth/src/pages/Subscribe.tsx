import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import "./cumtel.css"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "South Korea",
];

const Subscribe: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    country: "India",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [count, setCount] = useState(1);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, phone: value }));
  };

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1); // Ensure count doesn't go below 1

  const handleNext = () => {
    if (step === 1 && formData.businessName) {
      setStep(2);
    } else if (step === 2) {
      navigate("/subscribeotp");
      
      // Handle form submission or final step logic here
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const isNextDisabled =
    step === 1
      ? !formData.businessName
      : !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
  
  
        <p className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2" onClick={handleBack}>
          <IoChevronBackSharp /> Back to previous page
        </p>
      {step === 1 && (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">Let's Begin</h1>
          <p className="mt-2 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            accusamus!
          </p>
        </div>
      )}

      {step === 1 && (
        <form action="" className="flex items-center justify-between flex-col w-full gap-20 xsm-max:flex xsm-max:flex-col xsm-max:gap-4">
          <div className="flex items-center gap-10 justify-center w-3/5 xsm-max:flex-col">
          <div className="relative w-full">
            <input
              id="businessName"
              type="text"
              placeholder=" "
              value={formData.businessName}
              onChange={handleChange}
              className="peer border-2 border-gray-300 rounded-md p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
            />
            <label
              htmlFor="businessName"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Business Name
            </label>
          </div>

          <div className="relative w-full">
            <select
              id="country"
              value={formData.country}
              onChange={handleChange}
              className="peer border-2 border-gray-300 rounded-md p-[.8rem] bg-transparent w-full focus:border-blue-500 focus:outline-none uppercase"
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country.toUpperCase()}
                </option>
              ))}
            </select>
            <label
              htmlFor="country"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Country
            </label>
          </div>
          </div>

          <div className="flex items-center w-3/5 gap-20 xsm-max:flex-col xsm-max:gap-10 ">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium">
              Number of employees, including you
            </h1>
            <p className="text-sm">
              Your first 30 days are at no charge (limited to 10 users)
            </p>
          </div>

          <div className="flex items-center justify-center border-2 rounded-md  w-1/5 h-11 border-green-600 xsm-max:w-full">
            <button
              type="button"
              onClick={decrement}
              className="w-1/3 h-full flex items-center justify-center border-r border-transparent bg-transparent hover:bg-green-100 transition duration-200 ease-in-out"
            >
              <TfiMinus className="text-green-600 text-2xl" />
            </button>
            <div className="w-1/3 h-full flex items-center justify-center bg-gray-300 text-gray-700 text-lg font-medium">
              {count}
            </div>
            <button
              type="button"
              onClick={increment}
              className="w-1/3 h-full flex items-center justify-center border-l border-transparent bg-transparent hover:bg-green-100 transition duration-200 ease-in-out"
            >
              <TfiPlus className="text-green-600 text-2xl" />
            </button>
          </div>
          </div>

          <div className=" mt-6">
            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
                isNextDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          action=""
          className="flex flex-col items-center justify-center gap-4 bg-white shadow-sm border-gray-300 rounded-lg border-2 p-7"
        >
          <div className="py-4">
            <h1 className="text-2xl font-semibold">
              What's your contact info?
            </h1>
            <p>
              You'll be the Google workspace account admin since you are
              creating the account.
            </p>
          </div>
          <div className="relative w-full mb-2">
            <input
              id="firstName"
              type="text"
              placeholder="Robert"
              value={formData.firstName}
              onChange={handleChange}
              className="peer form-input"
            />
            <label
              htmlFor="firstName"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              First Name
            </label>
          </div>

          <div className="relative w-full mb-2">
            <input
              id="lastName"
              type="text"
              placeholder="Clive"
              value={formData.lastName}
              onChange={handleChange}
              className="peer form-input"
            />
            <label
              htmlFor="lastName"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Last Name
            </label>
          </div>

          <div className="relative w-full mb-2">
            <input
              id="email"
              type="email"
              placeholder="robertclive@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="peer form-input"
            />
            <label
              htmlFor="email"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Current Email Address
            </label>
          </div>

          <div className="relative w-full mb-2">
            <div className="relatve"></div>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="react-tel-input outline-none"
              dropdownClass="peer"
              containerClass="relative outline-none w-full"
            />
            <label
              htmlFor="phone"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Business Phone Number
            </label>
          </div>

          <div className="col-span-2 flex justify-between mt-6">
            
            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
                isNextDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Subscribe;
