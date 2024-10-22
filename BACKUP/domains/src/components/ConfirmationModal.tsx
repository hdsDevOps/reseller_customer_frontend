import React from "react";
import { X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionName: string;
  title: string; // Add title prop
  showCloseButton?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  actionName,
  title,
  showCloseButton = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-md p-6 w-11/12 max-w-md relative">
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close"
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        )}
        <h2 className="text-lg font-semibold mb-4">{title}</h2> {/* Display title here */}
        <h3 className="mb-4">
          Are you sure you want to {actionName}?
        </h3>
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
