import React, { useEffect, useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import VoucherModal from './VoucherModal';
import "./Voucher.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { getVouchersListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
// import '../styles/CustomStyle.css';

const VoucherCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customerId } = useAppSelector(state => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [voucherList, setVouhcerList] = useState([]);
  console.log("voucher list...", voucherList);

  const getVouchersList = async() => {
    try {
      const result = await dispatch(getVouchersListThunk({
        customer_id: customerId
      })).unwrap();
      setVouhcerList(result?.joinedData);
    } catch (error) {
      setVouhcerList([]);
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getVouchersList();
  }, []);
  const handleOpenModal = () => {
    console.log("Opening modal");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const dateFormat = (date) => {
    const miliseconds = parseInt(date?._seconds) * 1000 + parseInt(date?._nanoseconds) / 1e6;
    const foundDate =  new Date(miliseconds);
    const today = new Date(Date.now());
    if(foundDate > today) {
      return true;
    } else {
      return false;
    }
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
      <div className="flex justify-center items-center gap-5 flex-wrap">
        {
          voucherList?.length > 0 && voucherList?.map((coupon, index) => (
            <div className="max-w-[400px] h-[200px] relative w-full items-center border border-black overflow-hidden" key={index}>
              <div className={`w-full h-full ${
                coupon?.status === "used"
                ? "bg-gray-600 text-white"
                : coupon?.status === "active"
                ? dateFormat(coupon?.expire_date)
                  ? ""
                  : "bg-gray-600 text-white"
                : ""
              }`} dangerouslySetInnerHTML={{__html: coupon?.voucher?.template_details}} />
              <div className={`absolute right-0 top-0 w-[80px] h-[30px] ${
                coupon?.status === "used"
                ? "bg-[#12A833]"
                : coupon?.status === "active"
                ? dateFormat(coupon?.expire_date)
                  ? "hidden"
                  : "bg-[#E02424]"
                : "hidden"
              } font-koulen font-normal text-base text-white transform rotate-0 flex justify-center items-center`}>
                {
                  coupon?.status === "used"
                  ? "APPLIED"
                  : coupon?.status === "active"
                  ? dateFormat(coupon?.expire_date)
                    ? ""
                    : "EXPIRED"
                  : ""
                }
              </div>
            </div>
          ))
        }
      </div>
      <VoucherModal isModalOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
};

export default VoucherCard;
