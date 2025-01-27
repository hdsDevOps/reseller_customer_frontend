import { ArrowLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getDomainsListThunk, plansAndPricesListThunk } from 'store/user.thunk';

function ViewPaymentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { userDetails, customerId } = useAppSelector(state => state.auth);
  console.log("userDetails...", userDetails);

  const locationData = location.state?.payment_details;
  const [plan, setPlan] = useState<object|null>(null);
  console.log("plan...", plan);
  const [data, setData] = useState({});
  console.log("data...", data);
  const [primaryDomain, setPrimaryDomain] = useState<object|null>(null);
  console.log("primary domain...", primaryDomain);

  const getPrimaryDomain = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      const findPrimary = result?.data?.find(item => item?.domain_type === "primary");
      if(findPrimary) {
        setPrimaryDomain(findPrimary);
      } else {
        setPrimaryDomain(null);
      }
    } catch (error) {
      setPrimaryDomain(null);
    }
  };

  useEffect(() => {
    getPrimaryDomain();
  }, [customerId]);
  useEffect(() => {
    if(locationData.length > 0) {
      setData(locationData[locationData.length - 1]);
    } else {
      setData({});
    }
  }, [locationData]);

  console.log("data...", data);

  const getPlanData = async(id:string) => {
    try {
      const result = await dispatch(plansAndPricesListThunk({subscription_id: id})).unwrap();
      setPlan(result?.data[0]);
    } catch (error) {
      setPlan(null);
    }
  };

  useEffect(() => {
    if(data) {
      getPlanData(data?.plan_id);
    }
  }, [data]);

  useEffect(() => {
    if(!location.state) {
      navigate('/');
    }
  }, []);

  const maskeCardNumber = (cardNumber) => {
    const formattedCardNumber = cardNumber?.replace(/(.{4})/g, "$1 ").trim();
    const parts = formattedCardNumber?.split(" ");
    const maskedParts = parts?.map((part, index) => (index < 3 ? "****" : part));
    return maskedParts?.join(" ");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="self-start">
        <button
          type='button'
          onClick={() => {navigate(-1)}}
        >
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center mb-3">
            <ArrowLeft className="text-sm sm:text-md lg:text-2xl" /> View payment details
          </h2>
        </button>
        <div className="flex items-center gap-1 text-sm sm:text-md md:text-lg">
          <button type='button'>Payment subscription</button>
          <ChevronRight />
          <p className="text-green-500">View payment details</p>
        </div>
      </div>

      <div className='bg-[#F0F0F3] w-full grid grid-cols-1 gap-2 px-7 py-7 max-[385px]:px-2 rounded-lg'>
        <div className='flex max-[650px]:flex-col justify-between items-center'>
          <div className='flex max-[460px]:flex-col  items-center'>
            <h3 className='font-inter font-medium max-[385px]:text-[28px] text-[22px] text-[#5A5A5A]'>Payment Method</h3>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58'
              className='w-[60px] ml-4'
            />
          </div>
            <button
              type='button'
              className='font-inter font-normal text-base text-[#12A833] underline max-[650px]:mt-2'
              onClick={() => {navigate('/payment-method')}}
            >Change payment mathod</button>
        </div>

        <div className='flex flex-wrap my-2'>
          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>First Name</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={data?.first_name}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Last Name</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={data?.last_name}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px] relative'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Card Number</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={maskeCardNumber(data?.card_number)}
              disabled
            />
            {/* <img
              src={'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa.png?alt=media&token=793767a0-a14e-4f5a-a6e4-fc490119413a'}
              alt={'visa'}
              className='w-10 absolute right-4 mt-9'
            /> */}
          </div>
        </div>
      </div>

      <div className='bg-[#F0F0F3] w-full grid grid-cols-1 gap-2 px-7 py-7 max-[385px]:px-2 rounded-lg'>
      <h3 className='font-inter font-medium max-[385px]:text-[28px] text-[22px] text-[#5A5A5A]'>Billing Details</h3>

        <div className='flex flex-wrap my-2 max-w-[1000px]'>
          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Subscription Type</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={data?.plan_id?.plan_name || 'N/A'}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Domain Name</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={data?.plan_id ? primaryDomain?.domain_name : data?.domain}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Phone Number</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={"+"+data?.phone}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Email Address</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={data?.email}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Country</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={userDetails?.country}
              disabled
            />
          </div>

          <div className='flex flex-col w-full max-w-[280px] px-2 max-[385px]:px-[2px]'>
            <label className='font-jakarta-plus font-semibold text-sm text-[#14213D]'>Date Due</label>
            <input
              type='text'
              className='w-full py-2 px-3 border border-[#E4E4E4] bg-white rounded-lg font-jakarta-plus font-normal text-base text-gray-800 mt-1'
              value={data?.due_date}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPaymentDetails