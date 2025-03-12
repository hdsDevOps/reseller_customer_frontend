import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { checkDomainThunk, domainAvailabilityThunk } from "store/reseller.thunk";
import { currencyList } from "../CurrencyList";

const DomainList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  console.log("location state...", location.state);

  const [newDomain, setNewDomain] = useState(location.state.selectedDomain);
  const [domainResult, setDomainResult] = useState(location.state.result);

  const handleCheckDomain = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(domainAvailabilityThunk(newDomain)).unwrap();
      setDomainResult(result);
    } catch (error) {
      console.log(error);
      setDomainResult(location.state.result);
    }
  };

  const handleDomainClick = (domain) => {
    navigate('/selected-domain-details', {state: {...location.state, selectedDomain: domain, preSelectedDomain: location.state.selectedDomain, type: 'new'}});
  };


  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate('/choose-your-domain', {state: location.state})}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <div className="mt-4 w-full max-w-5xl flex flex-col items-center justify-center gap-1 p-7 xsm-max:px-0">
        {/* Dropdown and Search Button */}
        <div className="relative flex gap-2 w-full">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="domain"
              className="w-full border-2 border-gray-200 bg-transparent rounded-md p-3 pr-32 focus:border-blue-500 focus:outline-none"
              value={newDomain}
              onChange={e => {setNewDomain(e.target.value)}}
            />
            {/* <select
              className="absolute top-0 right-2 h-full border-0 bg-transparent text-black font-semibold"
              value={newDomain?.domain_extension}
              onChange={e => {setNewDomain({
                ...newDomain,
                domain_extension: e.target.value,
              })}}
            >
              <option value=".com">.com</option>
              <option value=".co">.co</option>
              <option value=".org">.org</option>
            </select> */}
          </div>
          <button
            type="button"
            onClick={(e) => {handleCheckDomain(e)}}
            className="bg-green-600 text-white p-2 rounded-lg"
          >
            Search Domain
          </button>
        </div>

        {
          domainResult?.availablity_status === "true"
          ? (
            <p className={`self-start text-sm text-[#12A833]`}>This domain name is available.</p>
          ) : (
            <>
              <p className={`self-start text-sm text-red-600`}>This domain name is already in use. If you own this domain and would like to use Google Workspace, please follow the steps <span className="text-[#12A833] cursor-pointer" onClick={() => window.open("https://support.google.com/a/answer/80610")}>here</span>.</p>
              <p className={`self-start text-sm text-[#12A83291] underline cursor-pointer`}>Do you want to transfer your domain?</p>
            </>
          )
        }

        <div className="w-full max-w-3xl mt-8">
          <h1 className="self-start text-2xl font-semibold mt-6 mb-2">Choose a domain</h1>

          <div className="bg-white border border-gray-300 rounded-lg overflow-x-auto">
            <table className="w-full table-auto font-semibold">
              <thead className="bg-[#12A83291] text-white text-left">
                <tr>
                  <th className="py-2 px-4">Available Domain</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {
                  domainResult?.availablity_status === "true" && (
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-4">{domainResult?.available?.domain?.domain}</td>
                      <td className="py-2 px-4">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{domainResult?.available?.domain?.price[defaultCurrencySlice]}</td>
                      <td className="py-2 px-4 text-right">
                        <GoArrowRight
                          className="text-green-500 cursor-pointer text-xl"
                          onClick={() => handleDomainClick(domainResult?.available?.domain)}
                          cypress-name="domain-selector-button"
                        />
                      </td>
                    </tr>
                  )
                }
                {
                  domainResult?.suggestions?.map((domainList, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4">{domainList?.domain}</td>
                      <td className="py-2 px-4">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{domainList?.price[defaultCurrencySlice]}</td>
                      <td className="py-2 px-4 text-right">
                        <GoArrowRight
                          className="text-green-500 cursor-pointer text-xl"
                          onClick={() => handleDomainClick(domainList)}
                          cypress-name="domain-selector-button"
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainList;
