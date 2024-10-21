import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmailModal from "../components/EmailModal";
import ActionModal from "../components/ActionModal";
import AddLicense from "../components/AddLicense";
import "../index.css";

const EmailList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLicenseModalOpen, setisLicenseModalOpen] = useState<boolean>(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<string | undefined>();
  const [actionModalStyle, setActionModalStyle] = useState<React.CSSProperties>({
    position: 'absolute', // Specify the initial position
  });

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const domainName = params.get("domain") || "schemaphic.com";

  const EmailData = [
    {
      name: "Robert Clive",
      role: ".Admin",
      email: "robertclive@",
      status: true,
    },
    { name: "Michel Henry", role: "", email: "michelhenry@", status: false },
    { name: "Alice Johnson", role: "", email: "alicejohnson@", status: true },
  ];

  const [emailData, setEmailData] = useState(EmailData);

  const toggleStatus = (index: number) => {
    const updatedData = [...emailData];
    updatedData[index].status = !updatedData[index].status;
    setEmailData(updatedData);
  };

  const handleOpenActionModal = (row: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect(); // Get button position
    const style: React.CSSProperties = {
      position: 'absolute',
      top: `${rect.bottom}px`,
      right: "10px",
    };

    setIsActionModalOpen(true);
    setSelectedUserRole(row.role);
    setActionModalStyle(style); // Set the calculated style
  };

  return (
    <div>
      <main>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="flex items-center justify-start">
            <div>
              <h2 className="text-gray-700 text-sm sm:text-lg lg:text-2xl xl:text-3xl font-semibold">
                Business Email
              </h2>
              <p className="text-xs sm:text-sm md:text-md">
                Set up your business email accounts right here. You can also add
                users and edit your admin details.
              </p>
            </div>
          </div>

          <div className="flex flex-col border-2 border-gray-200 rounded-md mt-2">
            <div className="flex items-start justify-start gap-14 sm:gap-0 md:justify-between flex-col md:flex-row py-4 px-2">
              <div className="flex items-start flex-col md:flex-row h-fit sm:h-24">
                <div className="md:mr-4 flex-shrink-0 h-full">
                  <img
                    src="/images/google.jpg"
                    alt="Domain"
                    className="h-full w-full sm:w-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm md:text-md lg:text-lg font-semibold text-gray-600">
                    3 users@{domainName}.{" "}
                    <span
                      className="text-xs sm:text-sm text-green-500 ml-3 font-normal cursor-pointer"
                      onClick={() => setisLicenseModalOpen(true)}
                    >
                      Add user license
                    </span>
                  </p>
                  <p className="text-sm md:text-md text-gray-600">
                    Google Workspace Starter.{" "}
                    <span
                      className="text-xs sm:text-sm text-green-500 ml-3 cursor-pointer"
                      onClick={() => navigate("/upgrade-plan")}
                    >
                      Upgrade plan
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:ml-4">
                <button className="border-2 border-green-500 text-green-500 bg-white px-4 py-2 rounded-3xl mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105">
                  Go to Gmail
                </button>
                <button
                  className="border-2 border-green-500 text-green-500 bg-white px-4 py-2 rounded-3xl mb-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
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
                  <thead className="bg-gray-200 mb-4">
                    <tr>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Name
                      </th>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Email
                      </th>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Status
                      </th>
                      <th className="p-2 text-left text-xs sm:text-base md:text-lg text-gray-600 font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailData.map((row, index) => (
                      <tr key={index}>
                        <td
                          className={`px-2 py-6 ${index === emailData.length - 1 ? "border-b-0" : "border-b border-gray-100"} text-gray-600 font-semibold text-xs sm:text-sm md:text-md`}
                        >
                          {row.name}
                          {row.role}
                        </td>
                        <td
                          className={`px-2 py-6 ${index === emailData.length - 1 ? "border-b-0" : "border-b border-gray-100"} text-gray-500 text-xs sm:text-sm md:text-md`}
                        >
                          {row.email}
                          {domainName}
                        </td>
                        <td
                          className={`px-2 py-6 ${index === emailData.length - 1 ? "border-b-0" : "border-b border-gray-100"} text-gray-800 text-xs sm:text-sm md:text-md`}
                        >
                          <button
                            className={`relative w-24 h-8 rounded-3xl border-2 flex justify-center items-center ${row.status ? "border-green-500 bg-green-500" : "border-red-500 bg-red-500"}`}
                            onClick={() => toggleStatus(index)}
                          >
                            <span className="text-white text-xs">
                              {row.status ? "Active" : "Inactive"}
                            </span>
                          </button>
                        </td>
                        <td
                          className={`px-2 py-6 ${index === emailData.length - 1 ? "border-b-0" : "border-b border-gray-100"} text-right`}
                        >
                          <button className="relative w-8 h-8 rounded-full border-2 border-green-500 flex justify-center items-center text-md">
                            <p
                              className="mb-2"
                              onClick={(event) => handleOpenActionModal(row, event)} // Pass event to the handler
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
        </div>
        <EmailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <ActionModal
          isOpen={isActionModalOpen}
          onClose={() => setIsActionModalOpen(false)}
          userRole={selectedUserRole}
          style={actionModalStyle} // Pass the style here
        />
        <AddLicense
          isOpen={isLicenseModalOpen}
          onClose={() => setisLicenseModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default EmailList;
