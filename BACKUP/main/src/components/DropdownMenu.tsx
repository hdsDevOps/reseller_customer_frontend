import React, { useState } from "react";
import { Settings, ChevronDown } from "lucide-react";
import Flag from "react-world-flags";

interface HeaderProps{
  onSetShowProfile:React.Dispatch<React.SetStateAction<boolean>>
}
const DropdownMenu = ({onSetShowProfile}:HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onShowProfile =()=>{
    onSetShowProfile((prev)=>!prev)
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
              RC
            </span>
            <div className="text-xs overflow-hidden whitespace-nowrap">
              <p className="font-medium">Robert Clive</p>
              <p className="text-gray-500 text-[10px]">
                RobertClive@domain.co.in
              </p>
            </div>
          </li>
          <li className="border-t border-gray-200 my-1"></li>
          <li onClick={onShowProfile}>
            <a
              href="#"
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
              <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center">
                <Flag
                  code="USA"
                  size={10}
                  className="object-cover w-full h-full"
                />
              </div>

              <span>Default Currency</span>
            </a>
          </li>
        </ul>
      )}
      
    </div>
  );
};

export default DropdownMenu;