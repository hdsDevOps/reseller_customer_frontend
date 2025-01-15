import React, { useEffect, useState } from "react";
import { Settings, ChevronDown } from "lucide-react";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setDefaultCurrencySlice } from "store/authSlice";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RiCloseFill } from "react-icons/ri";
import { currencyList } from "./CurrencyList";



const flagList = [
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: 'N₦',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
];

const DropdownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userDetails, defaultCurrencySlice } = useAppSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrencySlice);
  // console.log("first...", defaultCurrencySlice);
  const [currencyModal, setCurrencyModal] = useState(false);

  useEffect(() => {
    setSelectedCurrency(defaultCurrencySlice);
  }, [defaultCurrencySlice]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const getInitials = (name:string) => {
    return name?.split(' ').map(word => word.charAt(0).toUpperCase());
  };
    
  const setDefaultCurrency = async() => {
    try {
      await dispatch(setDefaultCurrencySlice(selectedCurrency));
      setCurrencyModal(false);
    } catch (error) {
      //
    }
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-transparent hover:bg-opacity-90 rounded-md p-2 flex items-center"
      >
        <ChevronDown
          className={`transition-transform text-gray-600 ${
            isOpen ? "rotate-180" : ""
          } w-4 h-4`}
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md p-2">
          <li className="flex items-center space-x-2 p-2">
            <span className="w-8 h-8 rounded-full bg-[#FF7272] text-white flex items-center justify-center text-xs font-bold">
              {getInitials(userDetails?.first_name || "J")}{getInitials(userDetails?.last_name || "D")}
            </span>
            <div className="text-xs overflow-hidden whitespace-nowrap">
              <p className="font-medium">{userDetails?.first_name} {userDetails?.last_name}</p>
              <p className="text-gray-500 text-[10px]">
                {userDetails?.email}
              </p>
            </div>
          </li>
          <li className="border-t border-gray-200 my-1"></li>
          <li
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
          >
            <a
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-xs"
            >
              <Settings className="text-gray-500 w-4 h-4" />
              <span>Profile Settings</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {setCurrencyModal(true)}}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-xs"
            >
              <img
                src={flagList?.find(item => item.name === defaultCurrencySlice)?.flag}
                className="w-3 h-3"
              />

              <span>Default Currency</span>
            </a>
          </li>
        </ul>
      )}

      {
        currencyModal && (
          <Dialog
            open={currencyModal}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={() => {
              setCurrencyModal(false);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                      Select Default Currency
                    </DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setCurrencyModal(false);
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>
                  <select value={selectedCurrency} onChange={(e) => {setSelectedCurrency(e.target.value)}} className="w-full border border-black rounded-lg h-10">
                    {
                      currencyList.map((curr, index) => (
                        <option value={curr.name} key={index}>{curr.logo}-{curr.name}</option>
                      ))
                    }
                  </select>
                  <button
                    className="font-inter font-medium text-base text-white bg-[#12A833] items-center h-10 w-[79px] rounded-lg mt-2 mx-auto"
                    type="button"
                    onClick={() => {setDefaultCurrency()}}
                  >Update</button>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </div>
  );
};

export default DropdownMenu;