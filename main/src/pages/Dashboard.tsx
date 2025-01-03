import React, { useEffect, useState } from "react";
import BusinessEmail from "../components/BusinessEmail";
import SubscriptionModal from "../components/SubscriptionModal";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getDomainsListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { Plus } from "lucide-react";

const Dashboard: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { customerId, userDetails } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(location.state) {
      console.log(location.state);
      if(location.state?.from === "otp") {
        toast.success("Successfully logged in");
      } else if(location.state?.from === "registration") {
        toast.success("Successfully registered");
      }
    }
  }, []);
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  const [selectedDomain, setSelectedDomain] = useState({});
  // console.log("selectedDomain...", selectedDomain);
  console.log("userDetails...", userDetails);
  const [activeStatus, setActiveStatus] = useState<Boolean>(false);

  useEffect(() => {
    const checkDate = () => {
      if(userDetails?.workspace) {
        const miliseconds = parseInt(userDetails?.workspace?.next_payment?._seconds) * 1000 + parseInt(userDetails?.workspace?.next_payment?._nanoseconds) / 1e6;
        const date = new Date(miliseconds);
        const today = new Date();
        if(today < date) {
          setActiveStatus(true);
        } else {
          setActiveStatus(false);
        }
      } else {
        setActiveStatus(false);
      }
    };

    checkDate();
  }, [userDetails]);

  const getDomainsList = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      if(result?.data) {
        result?.data?.find((item) => item?.domain_type === "primary" ? setSelectedDomain(item) : null);
      }
    } catch (error) {
      setSelectedDomain({});
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

  useEffect(() => {
    getDomainsList();
  }, []);

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
        {
          activeStatus ? (
            <React.Fragment>
              <div className="">
                <BusinessEmail data={selectedDomain} getDomainsList={getDomainsList} />
              </div>
              <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
            </React.Fragment>
          ) : (
            <div className="my-[10px] w-full bg-[#F8F7F7] rounded-[10px] drop-shadow-custom py-2 pb-4 px-4 flex flex-col">
              <h3 className="font-inter font-medium small:text-[28px] text-xl text-black text-nowrap">Add Subscription</h3>
              <p className="font-inter font-normal small:text-base text-sm text-black w-full pt-1 pb-3 border-b-2 border-black drop-shadow-custom">It seems you don’t have subscriptions</p>
              <button
                type="button"
                className="max-w-[220px] bg-[#12A833] rounded-[10px] font-plus-jakarta-sans font-bold small:text-base text-sm text-white gap-1 items-center flex justify-center small:px-4 px-1 py-2 mt-3 mb-2"
                onClick={() => {navigate('/upgrade-plan')}}
              >
                <Plus />
                <span>Add Subscription</span>
              </button>
            </div>
          )
        }
      </main>
    </div>
  );
};

export default Dashboard;
