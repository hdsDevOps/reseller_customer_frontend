import React, { useState } from "react";
import { X } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isChangeTypeModalOpen, setIsChangeTypeModalOpen] = useState(false);
  const [domainType, setDomainType] = useState("Primary");

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleTransferClick = () => {
    setIsTransferModalOpen(true);
  };

  const handleChangeTypeClick = () => {
    setIsChangeTypeModalOpen(true);
  };

  const handleConfirmCancel = () => {
    console.log("Domain canceled");
    setIsCancelModalOpen(false);
    onClose();
  };

  const handleConfirmTransfer = () => {
    console.log("Domain transferred");
    setIsTransferModalOpen(false);
    onClose();
  };

  const handleChangeTypeSubmit = () => {
    console.log(`Domain type changed to: ${domainType}`);
    setIsChangeTypeModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-gray-100 rounded-xl shadow-md p-4 w-11/12 max-w-xs relative flex flex-col md:fixed md:bottom-12 md:right-6">
        <button
          type="button"
          aria-label="Close"
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <ul className="flex-grow space-y-2">
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
            >
              Update Payment Method
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
              onClick={handleCancelClick}
            >
              Cancel Domain
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
              onClick={handleTransferClick}
            >
              Transfer Domain
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-black hover:underline"
              onClick={handleChangeTypeClick}
            >
              Change Domain Type
            </button>
          </li>
        </ul>
      </div>
      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
          onClose();
        }}
        onConfirm={handleConfirmCancel}
        actionName="cancel your domain"
        title="Cancel Domain"
        showCloseButton={false}
      />
      <ConfirmationModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false);
          onClose();
        }}
        onConfirm={handleConfirmTransfer}
        actionName="transfer your domain"
        title="Transfer Domain"
        showCloseButton={false}
      />
      {isChangeTypeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-md p-6 w-11/12 max-w-xs relative">
            <button
              type="button"
              aria-label="Close"
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => {
                setIsChangeTypeModalOpen(false);
                onClose();
              }}
            >
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Change Domain Type</h2>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={(e) => { e.preventDefault(); handleChangeTypeSubmit(); }}
            >
              <div className="self-start flex flex-col space-y-4 mb-4">
                {["Primary", "Secondary", "Alice"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="domainType"
                      className="radio radio-success"
                      value={type}
                      checked={domainType === type}
                      onChange={(e) => setDomainType(e.target.value)}
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-1/2 mx-auto" 
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionModal;
