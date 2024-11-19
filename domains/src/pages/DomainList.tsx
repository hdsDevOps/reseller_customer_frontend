import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import EmailModal from "./EmailModal";
import ActionModal from "../components/ActionModal";
import "../domain.css";

const DomainList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [actionModalStyle, setActionModalStyle] =
    useState<React.CSSProperties | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const headers: string[] = [
    "Domain",
    "Domain Types",
    "Business Email",
    "User Licenses",
    " ",
  ];
  const domainData = {
    "ABC Business": [
      {
        domain: "domain.co.in",
        domainType: "Primary",
        businessEmail: "Robertclive@domain.co.in",
        userLicenses: "02/05",
      },
    ],
    "Schemaphic System India Pvt.Ltd.": [
      {
        domain: "schemaphic.com",
        domainType: "Secondary",
        businessEmail: "Robertclive@schemaphic.com",
        userLicenses: "03/05",
      },
    ],
  };

  const handleOpenActionModal = (event: React.MouseEvent, domain: string) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get button position
    const style: React.CSSProperties = {
      position: "absolute",
      top: `${rect.bottom + window.scrollY}px`,
      right: "10px",
    };

    setIsActionModalOpen(true);
    setActionModalStyle(style);
    setSelectedDomain(domain);
  };

  return (
    <div>
      <main>
        <div className="mb-3 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between w-full">
          <h3 className="custom-title">Domain</h3>
          <div className="flex gap-2 md:gap-16">
            <Link to="/add-domain">
              <button className="h-[38px] px-2 py-[7px] bg-[#12A833] text-center text-white font-normal rounded-[10px] hover:bg-opacity-90 text-xs md:text-base">
                Add Existing Domain
              </button>
            </Link>
            <Link to="/add-domain">
              <button className="ml-0 md:ml-10 h-[38px] px-2 py-[7px] bg-[#12A833] text-center text-white font-normal rounded-[10px] hover:bg-opacity-90 text-xs md:text-base">
                Buy Domain
              </button>
            </Link>
            
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {Object.entries(domainData).map(([domainName, data], index) => (
            <div
              key={index}
              className="flex flex-col border border-[#E4E4E4] bg-[#f9f9f9] w-full p-2 md:p-4"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-2 md:gap-0 mb-4">
                <h3 className="text-[#5A5A5A] font-bold sm-max:text-sm md:text-base">
                  {domainName}
                </h3>
                <button
                  className=" h-[38px] px-4 py-[7px] bg-[#12A833] text-center text-white rounded-[10px] hover:bg-opacity-90 text-xs md:text-base font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Emails
                </button>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="border border-[#E4E4E4] mb-4">
                    <tr>
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          className="p-2 text-left text-[#5A5A5A] font-medium sm-max:text-xs md:text-base"
                        >
                          {header}
                        </th>
                      ))}
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2 text-[#5A5A5A] sm-max:text-xs md:text-base">
                          {row.domain}
                        </td>
                        <td className="p-2 text-[#5A5A5A] sm-max:text-xs md:text-base">
                          {row.domainType}
                        </td>
                        <td className="p-2 text-[#5A5A5A] sm-max:text-xs md:text-base">
                          {row.businessEmail}
                        </td>
                        <td className="p-2 text-[#5A5A5A] sm-max:text-xs md:text-base">
                          {row.userLicenses}
                        </td>
                        <td className="p-2 text-center">
                          <button className="relative w-6 h-6 rounded-full border-2 border-green-500 flex justify-center items-center">
                            <p
                              className="mb-2"
                              onClick={(e) =>
                                handleOpenActionModal(e, row.domain)
                              }
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

              <div className="my-4 border-t border-black"></div>
              <div className="flex self-end text-sm md:text-base">
                <Link
                  to={`/email?domain=${encodeURIComponent(data[0].domain)}`}
                  
                >
                  <button className="text-[#12A833]  hover:text-opacity-90 flex items-center text-sm md:text-base">
                  View More <ChevronRight size={20} />
                  </button>
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isActionModalOpen && actionModalStyle && (
        <ActionModal
          isOpen={isActionModalOpen}
          onClose={() => {
            setIsActionModalOpen(false);
            setActionModalStyle(null);
          }}
          style={actionModalStyle}
        />
      )}
    </div>
  );
};

export default DomainList;
