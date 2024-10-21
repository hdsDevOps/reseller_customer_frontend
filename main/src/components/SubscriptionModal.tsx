import React from "react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center md:justify-end bg-gray-600 bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-gray-100 rounded-xl shadow-md p-2 max-w-[14rem] fixed top-[17rem] md:top-[17.6rem] right-3 w-80">
        
        <ul className="space-y-2 flex-grow flex-col items-start justify-center w-full">
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              Upgrade plan
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              Update payment method
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              Renew Plan
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              Turn off auto-renew
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              View payment details
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              View invoice
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              Cancel Subscription
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
            >
              Transfer Subscription
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionModal;
