import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterX } from "lucide-react";
import EmailModal from "../components/EmailModal";
import ActionModal from "../components/ActionModal";
import AddLicense from "../components/AddLicense";
import { getDomainsListThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk'

import "../index.css";
import { useAppDispatch, useAppSelector } from "store/hooks";

const EmailList: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchRef = useRef();

  const { customerId } = useAppSelector(state => state.auth);
  // console.log("userId...", customerId);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<string | undefined>();
  const [actionModalStyle, setActionModalStyle] = useState<React.CSSProperties>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const params = new URLSearchParams(location.search);
  const domainName = params.get("domain") || "schemaphic.com";
  const [domains, setDomains] = useState([]);
  // console.log("domains...", domains);
  const [selectedDomain, setSelectedDomain] = useState({});
  const [emailData, setEmailData] = useState([
    { name: "Robert Clive > Admin", email: "robertclive@", status: true, role: ".Admin" },
    { name: "Michel Henry", email: "michelhenry@", status: false, role: "" },
  ]);

  useEffect(() => {
    const getDomainsList = async() => {
      try {
        const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
        setDomains(result?.data);
      } catch (error) {
        setDomains([]);
        if(error?.message == "Authentication token is required") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
    getDomainsList();
  }, []);

  useEffect(() => {
    if(domains.length > 0) {
      const result = domains.find(item => item?.domain_type === "primary");
      ////////////////////////////////
    }
  }, []);
  
  const handleClickOutside = (event: MouseEvent) => {
    if(searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setSearchDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(searchTerm !== "" && domains.length > 0) {
      setSearchDropdown(true);
    }
  }, [searchTerm, domains]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleStatus = (index: number) => {
    const updatedData = [...emailData];
    updatedData[index].status = !updatedData[index].status; // Toggle the status
    setEmailData(updatedData);
  };

  const navigate = useNavigate();

  const openActionModal = (event: React.MouseEvent<HTMLElement>, role: string) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get button position
    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${rect.bottom}px`,
      right: "10px",
    };
  
    setSelectedUserRole(role);
    setActionModalStyle(style);
    setIsActionModalOpen(true);
  };

  return (
    <div>
      <main>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex items-center justify-start">
            <div>
              <h2 className="text-green-500 text-sm sm:text-2xl">Email</h2>
              <p className="text-sm sm:text-md md:text-lg">
                Set up your email accounts here and you can add users and edit your admin details.
              </p>
            </div>
          </div>

          <div className="flex sm:justify-end justify-center">
            <div className="flex items-center space-x-1 relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search domain..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent border rounded px-2 py-1 relative"
                onFocus={() => {setSearchDropdown(true)}}
              />
              {
                searchDropdown && domains?.filter(item => item?.domain_name?.toLowerCase().includes(searchTerm?.toLowerCase())).length > 0 && (
                  <div className="absolute top-0 max-h-32 flex flex-col mt-8 bg-slate-200 py-1 w-[184px] overflow-y-auto">
                    {
                   // countries?.filter(name => name?.name?.toLowerCase().includes(countryName.toLowerCase()))
                      domains?.filter(item => item?.domain_name?.toLowerCase().includes(searchTerm?.toLowerCase())).map((item2, index) => (
                        <p key={index} className="px-2 first:border-0 border-t border-white">{item2?.domain_name}</p>
                      ))
                    }
                  </div>
                )
              }
              <FilterX className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-[#F7FAFF] flex items-start justify-start gap-8 md:gap-0 md:justify-between flex-col md:flex-row mt-2 py-4 px-2">
            <div className="flex items-start flex-col sm:flex-row h-fit sm:h-24">
              <div className="mr-4 flex-shrink-0 h-full">
                <img
                  src="/images/google.jpg"
                  alt="Domain"
                  className="h-full w-full sm:w-auto object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">{`${domainName}`}</p>
                <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">
                  3 users@{domainName}.{" "}
                  <span className="text-xs sm:text-sm text-green-500 ml-3 cursor-pointer" onClick={() => setIsLicenseModalOpen(true)}>
                    Add user license
                  </span>
                </p>
                <p className="text-sm md:text-md text-gray-600">
                  Google Workspace Starter.{" "}
                  <span className="text-xs sm:text-sm text-green-500 ml-3 cursor-pointer" onClick={() => navigate('/upgrade-plan')}>
                    Upgrade plan
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:ml-4">
              <button
                className="border-2 border-green-500 text-green-500 bg-white px-4 py-2 rounded-md mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setIsModalOpen(true)}
              >
                Add Email
              </button>
              <p className="text-sm md:text-md">User Licenses: 03/5</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#F7FAFF] mb-4">
                  <tr>
                    <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                      Name
                    </th>
                    <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                      Email
                    </th>
                    <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                      Status
                    </th>
                    <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emailData.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2 text-gray-600 font-semibold text-xs sm:text-sm md:text-md">
                        {row.name}
                      </td>
                      <td className="p-2 text-gray-500 text-xs sm:text-sm md:text-md">
                        {row.email}
                        {domainName}
                      </td>
                      <td className="p-2 text-gray-800 text-xs sm:text-sm md:text-md">
                        <button
                          className={`relative w-24 h-10 rounded-md border-2 flex justify-center items-center ${
                            row.status
                              ? "border-green-500 bg-green-500"
                              : "border-red-500 bg-red-500"
                          }`}
                          onClick={() => toggleStatus(index)}
                        >
                          <span className="text-white text-xs">
                            {row.status ? "Active" : "Inactive"}
                          </span>
                        </button>
                      </td>
                      <td className="p-2 text-center">
                        <button className="relative w-6 h-6 rounded-full border-2 border-green-500 flex justify-center items-center">
                          <p
                            className="mb-2"
                            onClick={(e) => openActionModal(e, row.role)}
                          >
                            ...
                          </p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <EmailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <ActionModal
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          userRole={selectedUserRole}
          style={actionModalStyle} // Pass the calculated style
        />
        <AddLicense
          isOpen={isLicenseModalOpen}
          onClose={() => setIsLicenseModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default EmailList;
