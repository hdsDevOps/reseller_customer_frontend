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
  const { customerId,rolePermission } = useAppSelector(state => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [voucherList, setVouhcerList] = useState([]);
  console.log("voucher list...", voucherList);
  
  useEffect(() => {
    const checkPermission = (label:String) => {
      if(rolePermission?.length > 0) {
        const permissionStatus = rolePermission?.find(item => item?.name === label)?.value;
        if(permissionStatus) {
          //
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    checkPermission("Vouchers");
  }, [rolePermission]);

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
    // console.log("foundDate///", foundDate);
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
          voucherList?.length > 0
          ? voucherList?.map((coupon, index) => (
            <div className="max-w-[400px] h-[200px] relative w-full items-center border border-black overflow-hidden" key={index}>
              <div dangerouslySetInnerHTML={{__html: coupon?.voucher?.template_details}} />
              <div
                className={`absolute top-0 bottom-0 left-0 right-0 z-10 ${
                  // coupon?.used_date !== null
                  // ? "#4B556340 text-white"
                  // : dateFormat(coupon?.expire_date)
                  // ? ""
                  // : "#4B556340 text-white"
                  ""
                }`}
                style={
                  coupon?.used_date !== null
                  ? {backgroundColor: "#4B556340", color: "white"}
                  : dateFormat(coupon?.expire_date)
                  ? {opacity: 0}
                  : {backgroundColor: "#4B556340", color: "white"}
                }
              ></div>
              {/* <div className={`absolute right-0 top-0 w-[80px] h-[30px] ${
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
              </div> */}
              <div
                className={
                  `absolute top-[10px] right-0 ${
                    coupon?.used_date !== null
                    ? "bg-[#12A833]"
                    : dateFormat(coupon?.expire_date)
                    ? "hidden"
                    : "bg-[#E02424]"
                  } bg-[#12A833] text-white text-xs font-bold px-[25px] py-[5px] rotate-45 object-left-bottom uppercase z-20`
                }
              >
                {
                  coupon?.used_date !== null
                  ? "APPLIED"
                  : dateFormat(coupon?.expire_date)
                  ? ""
                  : "EXPIRED"
                }
              </div>
            </div>
          )) : (
            <div className="">
              Vouchers not available
            </div>
          )
        }
      </div>
      <VoucherModal isModalOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
};

export default VoucherCard;
