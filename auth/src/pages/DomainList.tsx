import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { checkDomainThunk } from "store/reseller.thunk";

const DomainList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  console.log("location state...", location.state);
  const domainExistance = location.state.type;
  const [domain_name, setDomainName] = useState(location.state.domain.domainName);

  // Array of domains with their prices
  const domains = [
    { name: ".co.in", price: "₹648.00/year" },
    { name: ".website", price: "₹2,069.00/year" },
    { name: ".net", price: "₹5,069.00/year" },
    { name: ".website", price: "₹2,069.00/year" },
    { name: ".net", price: "₹2,069.00/year" },
    { name: ".net", price: "₹5,069.00/year" },
    { name: ".net", price: "₹5,069.00/year" },
  ];

  const [newDomain, setNewDomain] = useState({
    name: location.state.domain.domainName,
    extention: location.state.domain.domainExtension
  });

  const handleDomainClick = (domain: { name: string; price: string }) => {
    navigate('/selected-domain', {state: {customer_id: location.state.customer_id, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: location.state.token, from: location.state.from, selectedDomain: `${domain_name}${domain?.name}`, type: 'new'}});
    navigate('/selected-domain', { state: {  } });
  };

  const handleCheckDomain = async(e) => {
    try {
      const result = await dispatch(checkDomainThunk(`${newDomain?.name}${newDomain?.extention}`)).unwrap();
      console.log("result...", result);
      if(result?.message === "Domain is Still Available for Purchase , doesn't belong to anyone yet" || result?.message === "Customer domain is Available to be used with a google workspace") {
        if(location.state.from === "business_info") {
          navigate('/selected-domain', {state: {customer_id: location.state.customer_id, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: location.state.token, from: location.state.from, selectedDomain: `${newDomain?.name}${newDomain?.extention}`, type: 'new'}});
        }
      } else {
        setDomainName(newDomain?.name);
        toast.warning("This domain name is already in use. If you own this domain and would like to use Google Workspace, please follow the steps:")
      }
    } catch (error) {
      toast.error("Error searching domain");
    }
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate(-1)}
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
              value={newDomain?.name}
              onChange={e => {setNewDomain({
                ...newDomain,
                name: e.target.value,
              })}}
            />
            <select
              className="absolute top-0 right-2 h-full border-0 bg-transparent text-black font-semibold"
              value={newDomain?.extention}
              onChange={e => {setNewDomain({
                ...newDomain,
                extention: e.target.value,
              })}}
            >
              <option value=".com">.com</option>
              <option value=".co">.co</option>
              <option value=".org">.org</option>
            </select>
          </div>
          <button
            type="button"
            onClick={(e) => {handleCheckDomain(e)}}
            className="bg-green-600 text-white p-2 rounded-lg"
          >
            Search Domain
          </button>
        </div>

        {domainExistance === "new" ? "text-[#12A833]" : (
          <p className={`self-start text-sm ${ domainExistance === "new" ? "text-[#12A833]" : "text-red-600"}`}>This domain name is already in use. If you own this domain and would like to use Google Workspace, please follow the steps <span className="text-[#12A833]">here</span>.</p>
        )}

        <div className="w-full max-w-3xl mt-8">
          <h1 className="self-start text-2xl font-semibold mt-6 mb-2">Choose a domain</h1>

          <div className="bg-white border border-gray-300 rounded-lg overflow-x-auto">
            <table className="w-full table-auto font-semibold">
              <thead className="bg-[#12a83291] text-white text-left">
                <tr>
                  <th className="py-2 px-4">Available Domain</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {domains.map((domain, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4">{domain_name}{domain.name}</td>
                    <td className="py-2 px-4">{domain.price}</td>
                    <td className="py-2 px-4 text-right">
                      <GoArrowRight
                        className="text-green-500 cursor-pointer text-xl"
                        onClick={() => handleDomainClick(domain)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainList;
