import React, { useState } from "react";
import { Settings, ChevronDown } from "lucide-react";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";



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
  const { userDetails } = useAppSelector(state => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const getInitials = (name:string) => {
    return name?.split(' ').map(word => word.charAt(0).toUpperCase());
  };
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
              href="#"
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-xs"
            >
              <img
                src={flagList?.find(item => item.name === userDetails?.currency)?.flag}
                className="w-3 h-3"
              />

              <span>Default Currency</span>
            </a>
          </li>
        </ul>
      )}
      
    </div>
  );
};

export default DropdownMenu;