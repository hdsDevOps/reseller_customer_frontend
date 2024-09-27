import React from "react";
import { X } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center md:justify-end bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-gray-100 rounded-xl shadow-md p-6 w-1/2 max-w-md md:fixed md:bottom-12 md:right-6 md:w-80 relative">
        <button
          type="button"
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
            >
              Remove user account
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
            >
              Make admin
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
            >
              Reset user password
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
            >
              Rename user account
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionModal;
