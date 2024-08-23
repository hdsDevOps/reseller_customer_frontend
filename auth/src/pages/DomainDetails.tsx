import React, { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "./cumtel.css";

const DomainDetails: React.FC = () => {
  const navigate = useNavigate();
  const [domainName, setDomainName] = useState("");
  const [domainError, setDomainError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDomainName(event.target.value);
  };

  const handleToDomain = () => {
    if (domainName.trim() === "") {
      setDomainError(true);
      return;
    }
    setDomainError(false);
    navigate('/domainlist');
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <div className="w-full flex flex-col items-center justify-center gap-6 p-7">
        <div className="pb-4 text-center">
          <h1 className="text-3xl font-semibold xsm-max:text-[16px]">
            Next, We'll Setup Your Domain
          </h1>
          <p className="text-gray-600 mt-2 xsm-max:text-xs">
            Your domain will be your website's address.
          </p>
          <p className="text-gray-600 mt-2 xsm-max:text-xs xsm-max:mt-0">
            You can create a new domain, use one you already own, or make one later.
          </p>
        </div>

        <div className="w-full max-w-5xl flex gap-12 xsm-max:flex-col">
          {/* Form for Creating a New Domain */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col">
            <div className="bg-gray-100 p-3 rounded-t-md">
              <h2 className="text-xl font-semibold xsm-max:text-sm">Create a New Domain</h2>
            </div>
            <form className="p-3 mt-8 flex flex-col gap-4 bg-white flex-1">
              <div className="flex gap-4 xsm-max:flex-col">
                <input
                  type="text"
                  placeholder="Enter your domain"
                  className={`flex-1 border-2 ${domainError ? 'border-red-500' : 'border-gray-200'} bg-transparent rounded-md p-3 focus:border-blue-500 focus:outline-none`}
                  value={domainName}
                  onChange={handleInputChange}
                />
                <select
                  className="border-2 border-gray-200 bg-transparent rounded-md p-3 focus:border-blue-500 focus:outline-none"
                >
                  <option>.com</option>
                  <option>.cc</option>
                  <option>.org</option>
                </select>
              </div>
              <p className="text-gray-400 text-sm">
                Search a domain name.
              </p>
              {domainError && (
                <p className="text-red-500 text-sm">Enter your domain</p>
              )}
            </form>
            <div className="p-3 flex flex-start">
              <button
                type="button"
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ease-in-out"
                onClick={handleToDomain}
              >
                Next
              </button>
            </div>
          </div>

          {/* Form for Using an Existing Domain */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col">
            <div className="bg-gray-100 p-3 rounded-t-md">
              <h2 className="text-xl font-semibold xsm-max:text-sm">Use a Domain You Own</h2>
            </div>
            <form className="p-3 mt-8 flex flex-col gap-4 bg-white flex-1">
              <input
                type="text"
                placeholder=""
                className="border-2 border-gray-200 bg-transparent rounded-md p-3 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-gray-400 text-sm">
                Enter your existing domain name.
              </p>
            </form>
            <div className="p-4 flex flex-start">
              <button
                type="button"
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 ease-in-out"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full max-w-5xl">
          <p className="text-black xsm-max:text-sm text-md flex items-start gap-1">
            <FaTriangleExclamation className="text-2xl inline-block text-red-500" />
            Please note that if you have an existing domain, you won't be charged. but if you don't have a domain, then you have to pay for the domain only for trial version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DomainDetails;
