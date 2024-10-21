import React, { useState } from "react";
import BusinessEmail from "../components/BusinessEmail";
import SubscriptionModal from "../components/SubscriptionModal";

const Dashboard: React.FC = () => {
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  return (
    <div>
      <main className="min-h-screen  pb-32">
        <h2 className="text-sm sm:text-xl lg:text-4xl font-medium text-green-500">
          Welcome to your Dashboard
        </h2>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full  rounded-t-md border-b border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Product Type
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Payment Cycle
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Description
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Domain
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Last Payment
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Next Payment
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Billing Status
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Payment Method
                </th>
                <th className="p-3 text-center text-xs sm:text-[0.8rem] font-semibold text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs text-gray-400">
                <td className="px-2 pb-10 pt-3">Google workspace + domain</td>
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
                  <button className="text-green-500 border-2 border-green-500 px-2 py-1 rounded hover:bg-green-500 hover:text-white">
                    Auto-renew
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
