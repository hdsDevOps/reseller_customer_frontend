import React from "react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import "./cumtel.css";

const DomainList: React.FC = () => {
  const navigate = useNavigate();

  const domains = [
    { name: "domain.co.in", price: "₹648.00/year" },
    { name: "domain.website", price: "₹2,069.00/year" },
    { name: "domain.net", price: "₹5,069.00/year" },
    { name: "domain.website", price: "₹2,069.00/year" },
    { name: "domain.net", price: "₹2,069.00/year" },
    { name: "domain.net", price: "₹5,069.00/year" },
    { name: "domain.net", price: "₹5,069.00/year" },
  ];

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
            />
            <select className="absolute top-0 right-2 h-full border-0 bg-transparent text-black font-semibold">
              <option value=".com">.com</option>
              <option value=".co">.co</option>
              <option value=".org">.org</option>
            </select>
          </div>
          <button className="bg-green-600 text-white p-2 rounded-lg">
            Search Domain
          </button>
        </div>

        <div className="self-start text-red-600 text-sm">
          This domain name is already in use. If you own this domain and would like to use Google Workspace, <br /> please follow the steps here.
        </div>

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
                    <td className="py-2 px-4">{domain.name}</td>
                    <td className="py-2 px-4">{domain.price}</td>
                    <td className="py-2 px-4 text-right">
                      <GoArrowRight className="text-green-500 cursor-pointer text-xl" />
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
