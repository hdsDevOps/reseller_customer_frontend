import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoChevronBackSharp } from "react-icons/io5";
import "./cumtel.css";

const BusinessInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    streetName: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

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

  const handleSubmit = () => {
    // Handle form submission or navigate to another route
    navigate("/adddomain");
  };

  const isSubmitDisabled =
    !formData.businessName ||
    !formData.streetName ||
    !formData.city ||
    !formData.state ||
    !formData.zipCode ||
    !formData.phone;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <form
        action=""
        className="mt-8 w-full max-w-2xl flex flex-col items-center justify-center gap-4 bg-white shadow-none border-gray-200 rounded-lg border-2 p-7"
      >
        <div className="pb-4 self-start">
          <h1 className="text-3xl font-semibold xsm-max:text-[16px]">
            Enter your business information
          </h1>
          <p className="xsm-max:text-sm">
          Enter your business information to register your domain
          </p>
        </div>

        <div className="relative w-full mb-2">
          <input
            id="businessName"
            type="text"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="businessName"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Business Name
          </label>
        </div>

        <div className="relative w-full mb-2">
          <input
            id="streetName"
            type="text"
            placeholder="123 Main St"
            value={formData.streetName}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="streetName"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Street Name
          </label>
        </div>

        <div className="relative w-full mb-2">
          <input
            id="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="city"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            City*
          </label>
        </div>

        <div className="relative w-full mb-2">
          <input
            id="state"
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="state"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            State
          </label>
        </div>

        <div className="relative w-full mb-2">
          <input
            id="zipCode"
            type="text"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="zipCode"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Zip Code
          </label>
        </div>

        <div className="relative w-full mb-2">
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

        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
