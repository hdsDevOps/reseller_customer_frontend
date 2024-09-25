import React, { useState } from "react";
import { CirclePlus, Trash2 } from "lucide-react";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleSubmit = () => {
       onClose();
    setTimeout(() => {
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-gray-100 rounded-xl shadow-md p-6 w-11/12 max-w-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Add Email</h1>
          <div className="flex items-center">
            <p className="text-sm text-green-500 mr-1">Add 2/3</p>
            <button aria-label="Add Email" className="text-green-500">
              <CirclePlus size={28} />
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="bg-white p-4 rounded-xl shadow-inner flex-grow max-w-2xl border">
            <form className="grid grid-cols-1 gap-4">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-grow">
                  <input
                    id="firstName"
                    type="text"
                    placeholder=" "
                    className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative flex-grow">
                  <input
                    id="lastName"
                    type="text"
                    placeholder=" "
                    className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  placeholder=" "
                  className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  @domain.co.in
                </span>
                <label
                  htmlFor="username"
                  className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder=" "
                  className="peer border-2 border-gray-200 rounded-xl p-[.63rem] bg-transparent w-full placeholder-transparent focus:border-blue-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={
                    passwordVisible ? "Hide Password" : "Show Password"
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? (
                    <HiOutlineEye size={20} />
                  ) : (
                    <RiEyeCloseLine size={20} />
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="ml-1 flex items-stretch">
            <button
              type="button"
              aria-label="Delete"
              className="bg-white border shadow-sm text-white p-4 rounded-xl flex items-center justify-center"
            >
              <Trash2 size={24} className="text-red-500" />
            </button>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            aria-label="Delete"
            className="px-4 py-2 md:px-3 sm-max:px-2 sm-max:text-xs bg-green-600 text-white font-medium rounded-md hover:bg-opacity-90" onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            aria-label="Delete"
            className="px-4 py-2 md:px-6 sm-max:px-2 sm-max:text-xs bg-red-500 text-white font-medium rounded-md hover:bg-opacity-90"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
