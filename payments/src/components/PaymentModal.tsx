import React from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, position }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 rounded-xl shadow-md p-2 w-[13rem]"
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left - 150,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
      >
        <ul className="space-y-2 flex-grow flex-col items-start justify-center w-full">
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
              onClick={onClose}
            >
              Renew Plan
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
              onClick={onClose}
            >
              Turn off auto-renew
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
              onClick={onClose}
            >
              View payment details
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
              onClick={onClose}
            >
              View invoice
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
              onClick={onClose}
            >
              Cancel Subscription
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full text-left text-sm p-2 text-black hover:bg-green-100"
              onClick={onClose}
            >
              Transfer Subscription
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentModal;
