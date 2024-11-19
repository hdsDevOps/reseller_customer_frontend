import React, { useState } from "react";
import BusinessEmail from "../components/BusinessEmail";
import SubscriptionModal from "../components/SubscriptionModal";

const Dashboard: React.FC = () => {
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  return (
    <div>
      <main className="min-h-screen  pb-32">
        <h3 className="custom-title">
          Welcome to your Dashboard
        </h3>
        <p className="text-xs sm:text-base mt-1">Hi, Robert here's take a look at your analytics</p>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-[1030px] h-[62px] rounded-t-md border-b border-[#E1EFFE]">
            <thead>
              <tr className="dashboard-table-header">
                <th className="py-2 text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Product Type
                </th>
                <th className="py-3 px-2 text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Payment Cycle
                </th>
                <th className="py-3 px-2 text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Description
                </th>
                <th className="py-3 px-2 text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Domain
                </th>
                <th className="py-3 px-2 text-left sm:text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Last Payment
                </th>
                <th className="py-3 px-2 text-left sm:text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Next Payment
                </th>
                <th className="py-3 px-2 text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Billing Status
                </th>
                <th className="py-3 px-2 text-center text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Payment Method
                </th>
                <th className="py-3 px-2 text-left text-xs sm:text-sm font-semibold text-[#00163B] text-opacity-60">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs font-normal text-[#434D64] text-opacity-60">
                <td className="px-2 pb-10 pt-3 text-center">Google workspace + domain</td>
                <td className="px-2 pb-10 pt-3 text-center">Yearly</td>
                <td className="px-2 pb-10 pt-3 text-center">
                  Purchase google workspace <br /> standard plan & 2 domains
                </td>
                <td className="px-2 pb-10 pt-3 text-center">
                  myownpersonaldomain.com, schemaphic.com
                </td>
                <td className="px-2 pb-10 pt-3">Jan 30 2024</td>
                <td className="px-2 pb-10 pt-3">Jan 30 2025</td>
                <td className="px-2 pb-10 pt-3">
                  <button className="text-[#12A833] w-[70px] sm:w-[82px] h-[29px] border-2 border-[#12A833] px-[7px] py-[[7px]] rounded-[5px] hover:bg-[#12A833] hover:text-white">
                    Free trial
                  </button>
                </td>
                <td className="px-2 pb-10 pt-3">
                  <span className="flex items-center">
                    <img
                      src="/images/visa.png"
                      alt="Visa"
                      className="h-4 mr-1"
                    />
                    <span className="text-[0.75rem] text-gray-600 font-semibold">
                      ...2354
                    </span>
                  </span>
                </td>
                <td className="px-2 pb-10 pt-3 text-right">
                  <button className="w-6 h-6 rounded-full border-2 border-green-500 flex justify-center items-center">
                    <p className="mb-2" onClick={() => setSubscriptionModalOpen(true)}>...</p>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <BusinessEmail />
        </div>
        <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
      </main>
    </div>
  );
};

export default Dashboard;
