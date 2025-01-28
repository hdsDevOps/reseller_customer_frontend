import React, { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "./cumtel.css";
import { useAppDispatch } from "store/hooks";
import { toast } from "react-toastify";
import { checkDomainThunk, domainAvailabilityThunk } from "store/reseller.thunk";

const DomainDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  console.log("location state....", location.state);

  const navigatedFrom = location.state.from;
  // console.log("navigated from...", navigatedFrom);
  const [domainName, setDomainName] = useState("");
  const [domainExtension, setDomainExtension] = useState(".com");
  const [domainError, setDomainError] = useState(false);
  console.log({domainName, domainExtension});

  // State for "Use a Domain You Own" form
  const [existingDomainName, setExistingDomainName] = useState("");
  // console.log("existing...", existingDomainName);
  const [existingDomainError, setExistingDomainError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDomainName(event.target.value);
  };

  const handleExistingDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExistingDomainName(event.target.value);
  };

  const handleToDomain = async(e) => {
    e.preventDefault()
    if (domainName.trim() === "") {
      setDomainError(true);
      return;
    } else {
      setDomainError(false);
      try {
        const result = await dispatch(domainAvailabilityThunk( `${domainName}${domainExtension}`)).unwrap();
        console.log("result...", result);
        if(result?.availablity_status === "false") {
          if(location.state.from === "business_info") {
            navigate('/domainlist', {state: {customer_id: location.state.customer_id, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: location.state.token, from: location.state.from, selectedDomain: domainName, result: result, type: 'new'}});
          }
        } else{
          if(location.state.from === "business_info") {
            navigate('/domainlist', {state: {customer_id: location.state.customer_id, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: location.state.token, from: location.state.from, selectedDomain: domainName, result: result, type: 'new_error'}});
          }
        }
      } catch (error) {
        
        toast.error("Error searching for the domain");
      }
    }
  };

  const handleExistingDomainSubmit = async(e) => {
    e.preventDefault();
    if (existingDomainName.trim() === "") {
      setExistingDomainError(true);
      return;
    }
    else {
      setExistingDomainError(false);
      // navigate('/signin-domain');
      try {
        const result = await dispatch(checkDomainThunk( existingDomainName)).unwrap();
        console.log("result...", result);
        if(result?.available) {
          
          toast.warning("Domain is Still Available for Purchase , doesn't belong to anyone yet");
        } else{
          if(location.state.from === "business_info") {
            navigate('/signin-domain', {state: {customer_id: location.state.customer_id, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: location.state.token, from: location.state.from, domain_name: existingDomainName, type: 'existing'}});
          }
        }
      } catch (error) {
        
        toast.error("Error searching domain");
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full gap-6 p-4">
      <p
        className="absolute flex items-center gap-1 text-green-600 cursor-pointer left-4 top-2"
        onClick={() => navigate('/businessinfo', {state: location.state})}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <div className="flex flex-col items-center justify-center w-full gap-6 p-7">
        <div className="pb-4 text-center">
          <h1 className="text-3xl font-semibold xsm-max:text-[16px]">
            Next, We'll Setup Your Domain
          </h1>
          <p className="mt-2 text-gray-600 xsm-max:text-xs">
            Your domain will be your website's address.
          </p>
          <p className="mt-2 text-gray-600 xsm-max:text-xs xsm-max:mt-0">
            You can create a new domain, use one you already own, or make one later.
          </p>
        </div>

        <div className="flex w-full max-w-5xl gap-12 xsm-max:flex-col">
          {/* Form for Creating a New Domain */}
          <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-xl">
            <div className="p-3 bg-gray-100 rounded-t-md">
              <h2 className="text-xl font-semibold xsm-max:text-sm">Create a New Domain</h2>
            </div>
            <form className="flex flex-col flex-1 gap-4 p-3 mt-8 bg-white">
              <div className="flex gap-4 xsm-max:flex-col">
                <input
                  type="text"
                  placeholder="Enter your domain"
                  className={`flex-1 border-2 ${domainError ? 'border-red-500' : 'border-gray-200'} bg-transparent rounded-md p-3 focus:border-blue-500 focus:outline-none`}
                  value={domainName}
                  onChange={handleInputChange}
                />
                {/* <select
                  className="p-3 bg-transparent border-2 border-gray-200 rounded-md focus:border-blue-500 focus:outline-none"
                  onChange={(e) => {setDomainExtension(e.target.value)}}
                  value={domainExtension}
                >
                  <option>.com</option>
                  <option>.cc</option>
                  <option>.org</option>
                </select> */}
              </div>
              <p className="text-sm text-gray-400">
                Search a domain name.
              </p>
              {domainError && (
                <p className="text-sm text-red-500">Enter your domain</p>
              )}
            </form>
            <div className="flex p-3 flex-start">
              <button
                type="button"
                className="px-4 py-2 text-white transition duration-200 ease-in-out bg-green-600 rounded-md hover:bg-green-700"
                onClick={handleToDomain}
              >
                Next
              </button>
            </div>
          </div>

          {/* Form for Using an Existing Domain */}
          <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-xl">
            <div className="p-3 bg-gray-100 rounded-t-md">
              <h2 className="text-xl font-semibold xsm-max:text-sm">Use a Domain You Own</h2>
            </div>
            <form className="flex flex-col flex-1 gap-4 p-3 mt-8 bg-white">
              <input
                type="text"
                placeholder="Enter your existing domain"
                className={`border-2 ${existingDomainError ? 'border-red-500' : 'border-gray-200'} bg-transparent rounded-md p-3 focus:border-blue-500 focus:outline-none`}
                value={existingDomainName}
                onChange={handleExistingDomainChange}
              />
              <p className="text-sm text-gray-400">
                Enter your existing domain name.
              </p>
              {existingDomainError && (
                <p className="text-sm text-red-500">Enter your existing domain</p>
              )}
            </form>
            <div className="flex p-4 flex-start">
              <button
                type="button"
                className="px-4 py-2 text-white transition duration-200 ease-in-out bg-green-600 rounded-md hover:bg-green-700"
                onClick={handleExistingDomainSubmit}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl mt-4">
          <p className="flex items-start gap-1 text-black xsm-max:text-sm text-md">
            <FaTriangleExclamation className="inline-block w-5 h-5 text-red-500" />
            Please note that if you have an existing domain, you won't be charged. But if you don't have a domain, then you have to pay for the domain only for trial version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DomainDetails;
