import React, { useState } from 'react';
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import EmailModal from './EmailModal';
import ActionModal from '../components/ActionModal';
import "../domain.css";

const DomainList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);

  const headers: string[] = ["Domain", "Domain Types", "Business Email", "User Licenses", " "];
  const domainData = {
    "ABC Business": [
      {
        domain: "domain.co.in",
        domainType: "Primary",
        businessEmail: "Robertclive@domain.co.in",
        userLicenses: "02/05"
      }
    ],
    "Schemaphic System India Pvt.Ltd.": [
      {
        domain: "schemaphic.com",
        domainType: "Secondary",
        businessEmail: "Robertclive@schemaphic.com",
        userLicenses: "03/05"
      }
    ]
  };

  return (
    <div>
      <main>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between w-full">
          <div className="text-sm text-green-500 sm:text-2xl">Domain</div>
          <div className="flex gap-2 md:gap-8">
            <Link
              to="add-domain"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs"
            >
              Add Existing Domain
            </Link>
            <Link
              to="/buy-domain"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-opacity-90 sm-max:text-xs"
            >
              Buy Domain
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {Object.entries(domainData).map(([domainName, data], index) => (
            <div key={index} className="flex flex-col bg-gray-100 rounded-sm w-full p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 font-semibold text-xl md:text-lg sm-max:text-xs">{domainName}</h3>
                <button
                  className="px-4 py-2 md:px-3 sm-max:px-2 sm-max:text-xs bg-green-600 text-white font-medium rounded-md hover:bg-opacity-90"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Emails
                </button>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="border border-gray-300 mb-4">
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index} className="p-2 text-left text-gray-600 font-medium sm-max:text-xs">
                          {header}
                        </th>
                      ))}
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2 text-gray-800 sm-max:text-xs">{row.domain}</td>
                        <td className="p-2 text-gray-800 sm-max:text-xs">{row.domainType}</td>
                        <td className="p-2 text-gray-800 sm-max:text-xs">{row.businessEmail}</td>
                        <td className="p-2 text-gray-800 sm-max:text-xs">{row.userLicenses}</td>
                        <td className="p-2 text-center">
                          <button className="relative w-6 h-6 rounded-full border-2 border-green-500 flex justify-center items-center">
                            <p className="mb-2" onClick={() => setIsActionModalOpen(true)}>...</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="my-4 border-t border-black"></div>
              <div className="flex self-end text-xs sm:text-sm">
                <Link to={`/email?domain=${encodeURIComponent(data[0].domain)}`} className="text-green-600 font-medium hover:text-opacity-90 flex items-center">
                  View More <ChevronRight size="20" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ActionModal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)} />
    </div>
  );
};

export default DomainList;
