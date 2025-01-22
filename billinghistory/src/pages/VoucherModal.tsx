import React from 'react';

interface VoucherModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const VoucherModal: React.FC<VoucherModalProps> = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-green-500 mb-4 text-2xl font-medium text-center">
          Steps on how to claim Voucher
        </h2>

        <div className="flex flex-col gap-1 mb-4">
          <h3 className="font-semibold text-lg">Step 1:</h3>
          <p className="text-md">Copy the voucher code from here.</p>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="font-semibold text-lg">Step 2:</h3>
          <p className="text-md">Go to your cart during payment, and click on 'Have a Vouhcer Code' button.</p>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="font-semibold text-lg">Step 3:</h3>
          <p className="text-md">Paste the code and check.</p>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="font-semibold text-lg">Step 4:</h3>
          <p className="text-md">The voucher will be shown. Click on 'Apply' button.</p>
        </div>
        
      

        <div className="flex justify-center my-5">
          <button 
            className="mt-4 text-white bg-green-500 w-[12rem] h-10 rounded hover:bg-green-600"
            onClick={closeModal}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
