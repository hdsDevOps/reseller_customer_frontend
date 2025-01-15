import React, { useEffect, useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { TbInfoTriangleFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addNewDomainThunk, addSubscriptionThunk, addToCartThunk, getDomainsListThunk, getPaymentMethodsThunk, getProfileDataThunk, makeDefaultPaymentMethodThunk, removeUserAuthTokenFromLSThunk, udpateProfileDataThunk, useVoucherThunk } from 'store/user.thunk';
import { setCart, setDomains, setUserDetails, staffStatus, staffId } from 'store/authSlice';
import { toast } from 'react-toastify';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RiCloseFill } from 'react-icons/ri';
import useData from 'rsuite/esm/InputPicker/hooks/useData';

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { customerId, domainsState, userDetails, sta } = useAppSelector(state => state.auth);
  // console.log("domainsState...", domainsState);
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState(userDetails);
  // console.log("userDetails...", userData);

  useEffect(() => {
    setUserData(userDetails);
  }, [userDetails]);

  const cart = location.state?.cart;
  // console.log("cart...", cart);
  const appliedVoucher = location.state.voucher_code;
  console.log("appliedVoucher...", appliedVoucher);

  const initialData = {
    customer_id: userDetails?.customer_id,
    domain_name: location.state[0]?.product_name || "Domain",
    domain_type: "secondary",
    subscription_id: "",
    business_name: userDetails?.business_name,
    business_email: userDetails?.business_email,
    license_usage: "0",
    plan: "",
    payment_method: "",
    domain_status: true,
    billing_period: location.state[0]?.payment_cycle,
    renew_status: true,
    subscription_status: true
  };

  const [data, setData] = useState(initialData);
  // console.log("data...", data);

  const initialPrimaryContact = {
    first_name: userData?.first_name,
    last_name: userData?.last_name
  }

  const [primaryContact, setPrimaryContact] = useState(initialPrimaryContact);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);

  useEffect(() =>{
    setData({
      ...data,
      customer_id: customerId,
    });
  }, [customerId]);

  const handleChangeContactFormData = () => {
    setUserData({
      ...userData,
      first_name: primaryContact?.first_name,
      last_name: primaryContact?.last_name
    });
    setIsOpenModal(false);
  };

  const getPaymentMethodsList = async() => {
    try {
      const result = await dispatch(getPaymentMethodsThunk({user_id: customerId})).unwrap();
      setPaymentMethods(result?.paymentMethods)
    } catch (error) {
      setPaymentMethods([]);
    }
  };

  useEffect(() => {
    getPaymentMethodsList();
  }, [customerId]);

  useEffect(() => {
    if(paymentMethods?.length > 0) {
      const defaultMethod = paymentMethods?.find(method  => method?.default);
      if(defaultMethod) {
        setPaymentMethod(defaultMethod?.method_name);
      } else {
        setPaymentMethod("");
      }
    } else {
      setPaymentMethod("");
    }
  }, [paymentMethods]);

  const today = new Date();
  const formattedDate = format(today, 'MMMM dd, yyyy');
  const formattedDate2 = format(today, 'MMMM dd');
  
  const formattedToday = format(today, 'yyyy-MM-dd');
  const yearFromToday = () => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setFullYear(today.getFullYear() + 1);
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  const customYearFromToday = (year) => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setFullYear(today.getFullYear() + parseInt(year));
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  const monthFromToday = () => {
    const aYaerFromNow = new Date(today);
    aYaerFromNow.setDate(today.getDate() + 30);
    return format(aYaerFromNow, "yyyy-MM-dd");
  };

  useEffect(() => {
    if(!location.state) {
      navigate('/dashboard')
    }
  }, [location.state]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const getUserDetails = async() => {
    try {
      const result = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
      await dispatch(setUserDetails(result?.customerData));
    } catch (error) {
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  }

  const topForm = [
    { label: 'Tax status', name: 'tax_status', placeholder: 'Select your text status', type: 'select', },
    { label: 'PAN (optional)', name: 'pan_number', placeholder: 'Enter your PAN number', type: 'text', },
    { label: 'TAN (optional)', name: 'tan_number', placeholder: 'Enter your TAN number', type: 'text', },
  ];
  const bottomForm = [
    { label: 'Business name', name: 'business_name', placeholder: 'Enter your Business Name', type: 'text', },
    { label: 'First Name', name: 'first_name', placeholder: 'Enter your First Name', type: 'text', },
    { label: 'Last Name', name: 'last_name', placeholder: 'Enter your Last Name', type: 'text', },
    { label: 'Address', name: 'address', placeholder: 'Enter your Address', type: 'text', },
    { label: 'Business Zip code', name: 'business_zip_code', placeholder: 'Enter your Zip Code', type: 'number', },
    { label: 'Business State', name: 'business_state', placeholder: 'Select your State', type: 'drowpdown', },
    { label: 'Business City*', name: 'business_city', placeholder: 'Select your City', type: 'drowpdown', },
  ];

  const getDomains = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      await dispatch(setDomains(result?.data));
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const addSubscriptionForWorkspace = async(item) => {
    try {
      const result = await dispatch(addSubscriptionThunk({
        product_type: item?.product_type,
        payment_cycle: item?.payment_cycle,
        customer_id: customerId,
        description: item?.description || "google workspace",
        domain: [""],
        last_payment: formattedToday,
        next_payment: item?.payment_cycle?.toLowerCase() === "yearly" ? yearFromToday() : monthFromToday(),
        payment_method: "VISA",
        subscription_status: "auto renewal",
        plan_name_id: item?.plan_name_id,
        payment_details: [{name: "asa", amount: location?.state?.price?.finalTotalPrice}],
        plan_name: item?.product_name,
        workspace_status: "active",
        is_trial: true,
        license_usage: item?.total_year
      })).unwrap();
      console.log("result1...", result);
    } catch (error) {
      console.log(error);
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const addSubscriptionForDomain = async(item) => {
    const data = {
      product_type: item?.product_type,
      payment_cycle: item?.payment_cycle,
      customer_id: customerId,
      description: item?.description || "domain",
      domain: [item?.product_name],
      last_payment: formattedToday,
      next_payment: customYearFromToday(item?.total_year),
      payment_method: "visa",
      subscription_status: "auto renewal",
      plan_name_id: "",
      payment_details: [{name: "asa", amount: location?.state?.price?.finalTotalPrice}],
      plan_name: "",
      workspace_status: "",
      is_trial: false
    };
    console.log(data);
    try {
      const result = await dispatch(addSubscriptionThunk(data)).unwrap();
      console.log("result2...", result);
    } catch (error) {
      console.log(error);
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const addSubscription = async(item) => {
    try {
      const result = await dispatch(addSubscriptionThunk({
        product_type: item?.product_type,
        payment_cycle: item?.payment_cycle,
        customer_id: customerId,
        description: item?.description || "google workspace",
        domain: [],
        last_payment: formattedToday,
        next_payment: item?.payment_cycle?.toLowerCase() === "yearly" ? yearFromToday() : monthFromToday(),
        payment_method: "VISA",
        subscription_status: "auto renewal",
        plan_name_id: "",
        payment_details: [{name: "asa", amount: location?.state?.price?.finalTotalPrice}],
        plan_name: "",
        workspace_status: "",
        is_trial: true
      })).unwrap();
      console.log("result3...", result);
    } catch (error) {
      console.log(error);
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const addDomain = async(item) => {
    try {
      const result = await dispatch(addNewDomainThunk({
        customer_id: customerId,
        domain_name: item?.product_name,
        domain_type: domainsState?.length > 0 ? "secondary" : "primary",
        subscription_id: "0",
        business_name: data?.business_name,
        business_email: data?.business_email || "casc@gmail.com",
        license_usage: domainsState?.length > 0 ? "0" : "1",
        plan: "0",
        payment_method: "visa",
        domain_status: true,
        billing_period: "yearly",
        renew_status: true,
        subscription_status: true
      })).unwrap();
      console.log("result...", result);
    } catch (error) {
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomains();
    }
  };

  const updateCart = async() => {
    try {
      await dispatch(addToCartThunk({
        user_id: customerId,
        products: []
      })).unwrap();
      dispatch(setCart([]));
      navigate('/add-cart');
    } catch (error) {
      console.log(error);
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const updateProfile = async() => {
    if(
      userData?.business_name !== "" && userData?.business_name?.trim() !== "" &&
      userData?.first_name !== "" && userData?.first_name?.trim() !== "" &&
      userData?.last_name !== "" && userData?.last_name?.trim() !== "" &&
      userData?.address !== "" && userData?.address?.trim() !== "" &&
      userData?.business_zip_code !== "" && userData?.business_zip_code?.trim() !== "" &&
      userData?.business_state !== "" && userData?.business_state?.trim() !== "" &&
      userData?.business_city !== "" && userData?.business_city?.trim() !== ""
    ) {
      try {
        await dispatch(udpateProfileDataThunk({
          user_id: customerId,
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          email: userData?.email,
          phone_no: userData?.phone_no,
          address: userData?.address,
          state: userData?.state,
          city: userData?.city,
          country: userData?.country,
          business_name: userData?.business_name,
          business_state: userData?.business_state,
          business_city: userData?.business_city,
          business_zip_code: userData?.business_zip_code,
          staff_id: staffId,
          is_staff: staffStatus
        })).unwrap();
      } catch (error) {
        //
      }
    } else {
      toast.warning("Input fields cannot be empty.");
    }
  };

  const updatePaymentMethod = async() => {
    const setDefaultPaymentMethod = paymentMethods?.find(method => method?.method_name === paymentMethod);
    if(!setDefaultPaymentMethod?.default) {
      try {
        const result = await dispatch(makeDefaultPaymentMethodThunk({
          user_id: customerId,
          payment_method_id: setDefaultPaymentMethod?.id
        })).unwrap();
        console.log("result...", result);
      } catch (error) {
        //
      }
    } else {
      //
    }
  };

  const useVoucher = async() => {
    if(appliedVoucher === null) {
      //
    } else {
      try {
        const result = await dispatch(useVoucherThunk({record_id: appliedVoucher?.id})).unwrap();
        console.log("result....", result);
      } catch (error) {
        //
      }
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(cart.length > 0) {
      if(paymentMethod !== "") {
        await cart?.map((item) => {
          if(item?.product_type === "google workspace") {
            addSubscriptionForWorkspace(item);
          } else if(item?.product_type.toLowerCase() === "domain") {
            addDomain(item);
            addSubscriptionForDomain(item);
          } else {
            addSubscription(item);
          }
        });
        await updateCart();
        await updateProfile();
        await updatePaymentMethod();
        await useVoucher();
        getUserDetails();
      } else {
        toast.warning("Please select a payment method");
      }
    }
    else {
      navigate('/');
    }
  };
  return (
    <>
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex max-[700px]:flex-col items-center justify-start min-[700px]:gap-10 max-[700px]:gap-2 mt-8">
          <button
            className="flex flex-row items-center justify-center gap-3"
            onClick={() => navigate(-1)}
            type='button'
          >
            <IoIosArrowBack />
            <h6 className="text-green-500 text-[15px]">
              Back to previous page
            </h6>
          </button>
          <h1 className="text-[30px] text-green-500 font-semibold ">
            Review and checkout
          </h1>
        </div>

        <div className='grid grid-cols-1 max-w-[961px] w-full mx-auto'>
          <div className='grid grid-cols-1 max-w-[961px] w-full'>
            {
              cart?.map((item, index) => (
                <div className='flex min-[768px]:flex-row max-[768px]:flex-col gap-2 justify-between w-full' key={index}>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-2'>
                      <h4 className="font-inter font-normal text-xl text-black">{item?.product_type}</h4>
                      {/* <h4 className="font-inter font-normal text-xl text-black">{item?.product_name}</h4> */}
                    </div>
                    <p>Your annual plan will begin {formattedDate}. You can <span className='text-[#12A833]'>cancel at any time</span>.</p>
                    <p>Charges today and recurs {item?.payment_cycle} on {formattedDate2}.</p>
                  </div>
                  <div className='w-[140px] max-[768px]:w-full flex flex-col items-end text-end'>
                    <p className='font-inter font-normal text-xl text-black'>{item?.price}</p>
                    <p className='font-inter font-medium text-base text-black'>+applicable tax</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="w-full grid grid-cols-1 items-start justify-start mt-[30px] col-span-1">
            <h1 className="font-inter font-semibold text-base text-black min-[500px]:pl-4 max-[500px]:pl-0">Customer Info</h1>
            <div className="mt-4 min-[500px]:pl-10 max-[500px]:pl-1 w-full flex flex-col justify-start items-start">
              {/* <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                Account Type
                <GoInfo className="ml-2" />
              </h1>
              <p className="font-inter font-normal text-xs text-[#8A8A8A] mt-2">Organization</p>
              <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                Tax information
                <GoInfo className="ml-2" />
              </h1> */}
              <div className="flex flex-col items-start justify-center w-full max-w-[600px] mt-3 gap-2">
                {/* {
                  topForm?.map((form, index) => {
                    if(form.type === "select") {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <select
                            name={form?.name}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setData({
                                ...data,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={data[form.name]}
                            required
                          >
                            <option value="Business" selected>Business</option>
                          </select>
                        </div>
                      )
                    } else {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <input
                            type={form.type}
                            name={form.name}
                            placeholder={form.placeholder}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setData({
                                ...data,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={data[form.name]}
                          />
                        </div>
                      )
                    }
                  })
                } */}

                <p className='font-inter font-normal text-xs text-[#12A833] py-3 border-b border-[#E4E4E4] w-full mb-2'>Add a GST identification number (GSTIN) (optional) </p>

                <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
                  Name and address
                  <GoInfo className="ml-2" />
                </h1>

                {
                  bottomForm.map((form, index) => {
                    if(form.name === "state") {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <select
                            name={form?.name}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={userData[form.name]}
                            required
                          >
                            <option value="West Bengal" selected>West Bengal</option>
                          </select>
                        </div>
                      )
                    } else if(form.name === "city") {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <select
                            name={form?.name}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={userData[form.name]}
                            required
                          >
                            <option value="Kolkata" selected>Kolkata</option>
                          </select>
                        </div>
                      )
                    } else {
                      return (
                        <div className='relative w-full flex flex-col h-[58px]' key={index}>
                          <label className='absolute -mt-[10px] ml-4 font-inter font-normal text-sm text-[#8A8A8A] bg-white'>{form.label}</label>
                          <input
                            type={form.type}
                            name={form.name}
                            placeholder={form.placeholder}
                            className='border border-[#E4E4E4] px-3 py-1 w-full rounded-[10px] font-inter font-normal text-base text-[#1E1E1E] h-[45px]'
                            onChange={(e) => {
                              setUserData({
                                ...userData,
                                [e.target.name]: e.target.value
                              })
                            }}
                            value={userData[form.name]}
                            required
                          />
                        </div>
                      )
                    }
                  })
                }

                <div className="flex flex-col items-start justify-start w-full gap-2 mb-4">
                  <h1 className="font-inter font-semibold text-sm flex flex-row items-center justify-center mr-2">
                    Primary Contact
                    <GoInfo className="ml-2 w-4 h-4" />
                    <BiSolidEditAlt
                      className="ml-2 w-4 h-4"
                      onClick={() => {
                        setPrimaryContact({
                          first_name: userData?.first_name,
                          last_name: userData?.last_name
                        });
                        setIsOpenModal(true);
                      }}
                    />
                  </h1>
                  <div className="flex flex-col">
                    <p className="font-inter font-normal texte-xs text-[#8A8A8A]">{userData?.first_name} {userData?.last_name}</p>
                    <p className="font-inter font-normal texte-xs text-[#8A8A8A]">{userData?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full relative">
            <h2 className="mb-4 text-lg font-bold">Payment method</h2>
            {/* Payment Options */}
            <div className="space-y-4">
              {
                paymentMethods?.length > 0 && paymentMethods?.map((method, index) => (
                  <label className="flex items-center justify-between p-2 cursor-pointer" key={index}>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="option"
                        value={method?.method_name}
                        checked={paymentMethod === method?.method_name}
                        onChange={() => setPaymentMethod(method?.method_name)}
                        className="hidden"
                      />
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method?.method_name
                            ? "bg-green-500 border-green-500"
                            : "border-green-400"
                        }`}
                      >
                        {paymentMethod === method?.method_name && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-base font-medium capitalize">{method?.method_name}</span>
                    </div>
                    <div
                      className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
                      style={{ backgroundImage: `url("${method?.method_image}")` }}
                    ></div>
                  </label>
                ))
              }
            </div>

            {/* WE ARE TAKING THIS INFO ON PAYMENT GATEWAY */}
            {/* Checkbox for Credit/Debit Card Address */}
            {/* <div className="flex items-center mb-4 space-x-3 ">
              <div
                className={`w-6 h-6 border-2 rounded-[5px] flex items-center justify-center cursor-pointer ${
                  isChecked ? "bg-green-500 border-green-500" : "border-green-500"
                }`}
                onClick={toggleCheckbox}
              >
                {isChecked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <label
                className="text-sm font-medium text-black cursor-pointer"
                onClick={toggleCheckbox}
              >
                Credit card or debit card details is the same as above
              </label>
            </div> */}

            {/* THIS SECTION IS COMMENTED OUT, cuz THE DATA ONLY REFLECTS FOR INDIA */}
            {/* Information Text */}
            {/* <div className="mb-4  w-[92%] ml-5 relative">
              <p className="text-[14px] text-gray-600 ">
                Reserve Bank of India requires that cards support automatic payments
                according to RBI regulations. If your card doesn't support automatic
                payments, you'll need to make manual payments or use a different card.
                We'll check your card in the next step.{" "}
                <a href="#" className="text-blue-600">
                  Learn more
                </a>
              </p>
              <TbInfoTriangleFilled className="absolute -left-8 top-1 text-[25px] text-yellow-400" />
            </div> */}

            {/* IRRELEVANT SECTION */}
            {/* Privacy Info */}
            {/* <div className="mb-4 w-[92%] ml-5 ">
              <p className="text-[11px] text-gray-400 ">
                The personal information that you provide here will be added to your
                payments profile. It will be stored securely and treated in accordance
                with the{" "}
                <a href="#" className="text-blue-600">
                  Google Privacy Policy
                </a>
                .
              </p>
            </div> */}

            {/* Terms and Conditions */}
            <div className="mb-6 w-[92%] ml-5 ">
              <p className="text-[15px]">
                By clicking{" "}
                <span className="font-bold text-black">Agree and continue</span>, you
                agree to the{" "}
                <a href="#" className="font-semibold text-green-500">
                  Google Workspace Agreement
                </a>
                ,{" "}
                <a href="#" className="font-semibold text-green-500">
                  Google Workspace purchase Agreement
                </a>
                , and{" "}
                <a href="#" className="font-semibold text-green-500 ">
                  Supplemental Terms and Conditions
                </a>{" "}
                for Google Workspace Free Trial Agreement.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-between w-full'>
          <button
            className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 mx-auto"
            type='submit'
          >
            Agree and continue
          </button>
          <div
            className="absolute right-0 w-10 h-10 bg-center bg-no-repeat bg-contain bottom-11"
            style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/messaageIcon.png?alt=media&token=a078fd41-6617-4089-b891-b54970394dbf")` }}
          ></div>
        </div>
      </form>
      {
        isOpenModal && (
          <Dialog
            open={isOpenModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setIsOpenModal(false);
              setPrimaryContact(initialPrimaryContact);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[700px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >Edit Primary Contact Information</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setIsOpenModal(false);
                          setPrimaryContact(initialPrimaryContact);
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8 grid grid-cols-1"
                  >
                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {
                          setPrimaryContact({
                            ...primaryContact,
                            [e.target.name]: e.target.value
                          })
                        }}
                        value={primaryContact?.first_name}
                        placeholder="Enter first name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {
                          setPrimaryContact({
                            ...primaryContact,
                            [e.target.name]: e.target.value
                          })
                        }}
                        value={primaryContact?.last_name}
                        placeholder="Enter last name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Email</label>
                      <input
                        type="email"
                        name="email"
                        disabled
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        value={useData?.email}
                        placeholder="Enter first name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14 gap-5"
                  >
                    <button
                      className="py-[10px] rounded-[10px] bg-[#12A833] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {handleChangeContactFormData()}}
                    >Update</button>
                    <button
                      className="py-[10px] rounded-[10px] bg-[#E02424] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {
                        setIsOpenModal(false);
                        setPrimaryContact(initialPrimaryContact);
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </>
  )
}

export default Review