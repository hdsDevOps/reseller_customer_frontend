import React, { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import VoucherModal from './VoucherModal';
import "./Voucher.css";
// import '../styles/CustomStyle.css';

const VoucherCard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const voucherList = [
    {name: "coupon 1", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"},
    {name: "coupon 2", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"},
    {name: "coupon 1", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"},
    {name: "coupon 2", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"},
    {name: "coupon 1", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"},
    {name: "coupon 2", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"},
    {name: "coupon 1", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"},
    {name: "coupon 2", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"},
    {name: "coupon 1", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"},
    {name: "coupon 2", image: "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"},
  ]
  const handleOpenModal = () => {
    console.log("Opening modal");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-1 mb-6">
       <div className="flex items-center justify-between">
       <h1 className="text-green-500 text-3xl font-medium">Vouchers</h1>
        <button className="text-green-500 claim-btn border border-green-500 px-4 py-2 rounded-md flex items-center gap-2 "  onClick={handleOpenModal} >How to claim <GoChevronDown className="text-green-500 text-md"/></button>
       </div>
        <p className="text-gray-900 text-sm">
          Use your vouchers to build your brand and drive visitors to your site
        </p>
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        {
          voucherList.map((coupon, index) => (
            <div className="" key={index}>
              <img
                src={coupon.image}
                alt={coupon.name}
                className="max-w-[300px]"
              />
            </div>
          ))
        }
      </div>
      <VoucherModal isModalOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
};

export default VoucherCard;
