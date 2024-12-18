import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { GoArrowRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { checkDomainThunk } from 'store/reseller.thunk';

const BuyDomain: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  console.log("state...", location.state);
  const { userAuthStatus = "" } = useAppSelector((state: any) => state.auth);

  const domains = [
    { name: "domain.co.in", price: "₹648.00/year" },
    { name: "domain.website", price: "₹2,069.00/year" },
    { name: "domain.net", price: "₹5,069.00/year" },
    { name: "domain.website", price: "₹2,069.00/year" },
    { name: "domain.net", price: "₹2,069.00/year" },
    { name: "domain.net", price: "₹5,069.00/year" },
    { name: "domain.net", price: "₹5,069.00/year" },
  ];

  const [availableDomains, setAvailableDomains] = useState<string[]>([]);
  console.log("availableDomains...", availableDomains);

  useEffect(() => {
    const domainName = location.state.domain.domain;
    const domainLists = ['.com', '.co.in', '.website', '.net', '.in', '.co.uk'];

    const availableList = async() => {
      const lists: string[] = [];
      domainLists.map(async(extension) => {
        const fullDomainName = `${domainName}${extension}`;
        try {
          const result = await dispatch(checkDomainThunk(fullDomainName)).unwrap();
          if(result?.message === "Domain is Still Available for Purchase , doesn't belong to anyone yet"){
            lists.push(extension);
          } else {
            //
          }
        } catch (error) {
          //
        }
      });
      setAvailableDomains(lists);
    };

    availableList()
  }, []);

  return (
    <div>
      <main>
        <Link to="/domain">
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center mb-3">
            <ArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Choose a
            domain
          </h2>
        </Link>

        <div className="flex items-center gap-1 text-sm sm:text-md md:text-lg">
          <Link to="/b-uydomain">Domain</Link>
          <ChevronRight />
          <p className="">Buy a domain</p>
          <ChevronRight />
          <p className="text-green-500">Choose a domain</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <div className="relative flex gap-2 max-w-full lg:max-w-[85%] w-full">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="domain"
                className="w-full border-2 border-gray-200 bg-transparent rounded-lg p-[.8rem] pr-32 focus:border-green-500 focus:outline-none"
              />
              <select
                id="domain-select"
                className="absolute top-0 right-2 h-full border-0 bg-transparent text-black font-semibold"
                aria-label="Choose a domain extension"
              >
                <option value=".com">.com</option>
                <option value=".co">.co</option>
                <option value=".org">.org</option>
              </select>
            </div>
            <button className="bg-green-600 text-white p-2 rounded-lg text-sm sm:text-md md:text-lg">
              Search Domain
            </button>
          </div>
          <div className="text-red-600 text-sm left-0 lg:left-8 -bottom-16 md:-bottom-12">
              This domain name is already in use. If you own this domain and would
              like to use Google Workspace, <br /> please follow the steps <span className="text-green-500 cursor-pointer"> here.</span>
            </div>

          

          <div className="w-full max-w-3xl mt-8 md:mt-12">
            <h1 className="self-start text-sm sm:text-xl font-semibold mt-6 mb-2">
              Choose a domain
            </h1>

            <div className="bg-white border border-gray-300 rounded-lg overflow-x-auto">
              <table className="w-full table-auto font-semibold">
                <thead className="bg-[#12a83291] text-white text-left">
                  <tr>
                    <th className="py-2 px-4 text-black text-sm md:text-lg">Available Domain</th>
                    <th className="py-2 px-4 text-black text-sm md:text-lg">Price</th>
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
      </main>
    </div>
  );
};

export default BuyDomain;
