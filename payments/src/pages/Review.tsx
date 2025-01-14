import React, { useEffect, useState } from 'react'
import { BiSolidEditAlt } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'
import { TbInfoTriangleFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addNewDomainThunk, addSubscriptionThunk, addToCartThunk, getDomainsListThunk, getProfileDataThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { setCart, setDomains, setUserDetails } from 'store/authSlice';
import { toast } from 'react-toastify';

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { customerId, domainsState, userDetails } = useAppSelector(state => state.auth);
  // console.log("domainsState...", domainsState);
  const [isChecked, setIsChecked] = useState(false);

  const cart = location.state?.cart;
  console.log("cart...", cart);

  const initialData = {
    customer_id: "",
    domain_name: location.state[0]?.product_name || "Domain",
    domain_type: "secondary",
    subscription_id: "",
    business_name: "",
    business_email: "ascasc@gmail.com",
    license_usage: "0",
    plan: "",
    payment_method: "",
    domain_status: true,
    billing_period: location.state[0]?.payment_cycle,
    renew_status: true,
    subscription_status: true
  };

  const [data, setData] = useState(initialData);
  console.log("data...", data);

  useEffect(() =>{
    setData({
      ...data,
      customer_id: customerId,
    });
  }, [customerId]);

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
    { label: 'Name', name: 'name', placeholder: 'Enter your Name', type: 'text', },
    { label: 'Address', name: 'address', placeholder: 'Enter your Address', type: 'text', },
    { label: 'Zip code', name: 'zip_code', placeholder: 'Enter your Zip Code', type: 'number', },
    { label: 'State', name: 'state', placeholder: 'Select your State', type: 'drowpdown', },
    { label: 'City*', name: 'city', placeholder: 'Select your City', type: 'drowpdown', },
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
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(cart.length > 0) {
      if(data?.payment_method !== "") {
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
        getUserDetails();
      } else {
        toast.warning("Please select a payment method");
      }
    }
    else {
      navigate('/');
    }
  }
  return (
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
            <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
              Account Type
              <GoInfo className="ml-2" />
            </h1>
            <p className="font-inter font-normal text-xs text-[#8A8A8A] mt-2">Organization</p>
            <h1 className="font-inter font-medium text-[14px] text-black flex flex-row items-center justify-center mr-2">
              Tax information
              <GoInfo className="ml-2" />
            </h1>
            <div className="flex flex-col items-start justify-center w-full max-w-[600px] mt-3 gap-2">
              {
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
              }

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
                            setData({
                              ...data,
                              [e.target.name]: e.target.value
                            })
                          }}
                          value={data[form.name]}
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
                            setData({
                              ...data,
                              [e.target.name]: e.target.value
                            })
                          }}
                          value={data[form.name]}
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
                            setData({
                              ...data,
                              [e.target.name]: e.target.value
                            })
                          }}
                          value={data[form.name]}
                          required
                        />
                      </div>
                    )
                  }
                })
              }

              <div className="flex flex-col items-start justify-start w-full gap-2 mb-4">
                <h1 className="font-semibold text-[15px] flex flex-row items-center justify-center mr-2">
                  Primary Contact
                  <GoInfo className="ml-2" />
                  <BiSolidEditAlt className="ml-2" />
                </h1>
                <h1 className="text-gray-500">Robert Clive</h1>
                <h1 className="text-gray-500">Robertclive@gmail.com</h1>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full relative">
          <h2 className="mb-4 text-lg font-bold">Payment method</h2>
          {/* Payment Options */}
          <div className="space-y-4">
            <label className="flex items-center justify-between p-2 cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="stripe"
                  checked={data?.payment_method === "stripe"}
                  onChange={() => setData({
                    ...data,
                    payment_method: "stripe"
                  })}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    data?.payment_method === "stripe"
                      ? "bg-green-500 border-green-500"
                      : "border-green-400"
                  }`}
                >
                  {data?.payment_method === "stripe" && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-base font-medium">Stripe</span>
              </div>
              <div
                className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
                style={{ backgroundImage: `url("/images/stripe.png")` }}
              ></div>
            </label>

            <label className="flex items-center justify-between p-2 cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="paypal"
                  checked={data?.payment_method === "paypal"}
                  onChange={() => setData({
                    ...data,
                    payment_method: "paypal"
                  })}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    data?.payment_method === "paypal"
                      ? "bg-green-500 border-green-500"
                      : "border-green-400"
                  }`}
                >
                  {data?.payment_method === "paypal" && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-base font-medium">PayPal</span>
              </div>
              <div
                className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
                style={{ backgroundImage: `url("/images/paypal.png")` }}
              ></div>
            </label>

            <label className="flex items-center justify-between p-2 cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="paystack"
                  checked={data?.payment_method === "paystack"}
                  onChange={() => setData({
                    ...data,
                    payment_method: "paystack"
                  })}
                  className="hidden"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    data?.payment_method === "paystack"
                      ? "bg-green-500 border-green-500"
                      : "border-green-400"
                  }`}
                >
                  {data?.payment_method === "paystack" && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-base font-medium">Paystack</span>
              </div>
              <div
                className="w-16 h-16 bg-center bg-no-repeat bg-contain sm:w-20 sm:h-20"
                style={{ backgroundImage: `url("/images/paystack.png")` }}
              ></div>
            </label>
          </div>

          {/* Checkbox for Credit/Debit Card Address */}
          <div className="flex items-center mb-4 space-x-3 ">
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
          </div>

          {/* Information Text */}
          <div className="mb-4  w-[92%] ml-5 relative">
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
          </div>

          {/* Privacy Info */}
          <div className="mb-4 w-[92%] ml-5 ">
            <p className="text-[11px] text-gray-400 ">
              The personal information that you provide here will be added to your
              payments profile. It will be stored securely and treated in accordance
              with the{" "}
              <a href="#" className="text-blue-600">
                Google Privacy Policy
              </a>
              .
            </p>
          </div>

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
      <div className='flex justify-between'>
        <button
          className="w-[30%] px-2 py-2 mb-5 ml-5 font-medium text-white bg-green-500 rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          type='submit'
        >
          Agree and continue
        </button>
        <div
          className="absolute right-0 w-10 h-10 bg-center bg-no-repeat bg-contain bottom-11"
          style={{ backgroundImage: `url("/images/messaageIcon.png")` }}
        ></div>
      </div>
    </form>
  )
}

export default Review