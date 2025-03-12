import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClover } from "react-icons/fa6";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addToCartThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { format, parse } from "date-fns";
import { setCart } from "store/authSlice";

const flagList = [
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/european-flag.png?alt=media&token=bb4a2892-0544-4e13-81a6-88c3477a2a64', name: 'EUR', logo: '€',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/australia-flag.png?alt=media&token=5a2db638-131e-49c7-be83-d0c84db8d440', name: 'AUD', logo: 'A$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/us-flag.png?alt=media&token=c8bc35ae-de58-4a91-bf00-05a3fc9dd85a', name: 'USD', logo: '$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/nigeria-flag.png?alt=media&token=80438147-6c10-4b4b-8cf9-181c7c8ad4d2', name: 'NGN', logo: '₦',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/england-flag.png?alt=media&token=64f093ef-b2a9-4b35-b510-a5943039ae5c', name: 'GBP', logo: '£',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/canada-flag.png?alt=media&token=4f660f4d-0f72-495c-bad4-7b8681f1c936', name: 'CAD', logo: 'C$',},
  {flag: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/India-flag.png?alt=media&token=2c9bf400-34b3-42ae-9f2b-1548c32d0345', name: 'INR', logo: '₹',},
];

const PlanCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customerId, cartState, defaultCurrencySlice, userDetails } = useAppSelector(state => state.auth);
  const [isYearly, setIsYearly] = useState(false);
  const [renewalDate, setRenewalDate] = useState(format(new Date(), "dd-MM-yyyy"));
  // console.log("renewal date...", renewalDate);
  // console.log("cartState...", cartState);
  console.log("userDetails...", userDetails);

  const toggleBilling = () => setIsYearly(!isYearly);
  const subscription_status = false;
  const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);
  console.log("check...", selectedCheckbox);
  const [currentPlan, setCurrentPlan] = useState<object|null>(null);
  console.log("currentPlan...", currentPlan);

  const [currencyLogo, setCurrencyLogo] = useState("$");
  // console.log("currency logo...", currencyLogo);

  const [plansList, setPlansList] = useState([]);
  console.log("plans list...", plansList);
  const [renewalStatus, setRenewalStatus] = useState(false);

  useEffect(() => {
    const current = plansList?.find(item => item?.id === userDetails?.workspace?.plan_name_id);
    if(current){
      setCurrentPlan(current);
    } else {
      setCurrentPlan(null);
    }
  }, [plansList, userDetails]);

  const getPlansAndPricesList = async() => {
    try {
      const result = await dispatch(plansAndPricesListThunk({subscription_id: ""})).unwrap();
      setPlansList(result?.data);
    } catch (error) {
      setPlansList([]);
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
    getPlansAndPricesList();
  }, []);

  const renewalDateTime = (datee) => {
    const miliseconds = parseInt(datee?._seconds) * 1000 + parseInt(datee?._nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();
    const today = new Date();
    console.log({date, today})

    if(date < today) {
      setRenewalStatus(true);
    } else {
      setRenewalStatus(false);
    }
  };

  useEffect(() => {
    renewalDateTime(userDetails?.workspace?.next_payment);
  }, [userDetails?.workspace?.next_payment]);

  useEffect(() => {
    if(userDetails?.workspace?.workspace_status === "trial") {
      navigate('/');
    };
  }, [userDetails]);

  useEffect(() => {
    const today = new Date();
    const futureDate = new Date();
    isYearly ? futureDate.setFullYear(today.getFullYear() + 1) : futureDate.setDate(today.getDate() + 30);
    
    setRenewalDate(format(futureDate, "dd-MM-yyyy"));
  }, [isYearly]);

  const getAmount = (amount, period) => {
    const amountDetails =  amount?.find(item => item?.currency_code === defaultCurrencySlice);
    if(amountDetails === undefined) {
      return {type: '', price: 0, discount_price: 0};
    } else {
      return amountDetails?.price?.find(item => item?.type === period);
    }
  };

  useEffect(() => {
    getAmount(plansList[0]?.amount_details, "Monthly");
  }, [plansList])

  const discountPercentage = (price, discountedPrice) => {
    return (((parseInt(price) - parseInt(discountedPrice)) / parseInt(price)) * 100).toFixed(0);
  };

  useEffect(() => {
    setCurrencyLogo(
      flagList.find(item => item.name === defaultCurrencySlice) === undefined ? "$" : flagList.find(item => item.name === defaultCurrencySlice)?.logo
    )
  }, [defaultCurrencySlice]);

  const cartAddAmount = (item, period) => {
    const data = getAmount(item?.amount_details, period);
    return data;
  };

  const handleAddToCart = async(e, item) => {
    e.preventDefault();
    const cartItems = cartState?.filter(item => item?.product_type === "google workspace" ? !item : item);
    const newCart = [
      ...cartItems,
      {
        payment_cycle: isYearly ? "Yearly" : selectedCheckbox === null ? "Yearly Subscription with monthly billing" : "Monthly",
        price: item?.amount_details,
        currency: defaultCurrencySlice,
        product_name: item?.plan_name,
        product_type: "google workspace",
        total_year: userDetails?.license_usage,
        plan_name_id: item?.id,
        workspace_status: "active",
        is_trial: true
      }
    ];
    console.log({newCart, item});
    try {
      await dispatch(addToCartThunk({
        user_id: customerId,
        products: newCart
      })).unwrap();
      dispatch(setCart(newCart));
      navigate('/add-cart');
    } catch (error) {
      // console.log(error);
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

  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <div className="self-start">
        <button type="button" onClick={() => {navigate(-1)}}>
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center mb-3">
            <ArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Update Plan
          </h2>
        </button>
        <div className="flex items-center gap-1 text-sm sm:text-md md:text-lg">
          <Link to="/domain">Payment subscription</Link>
          <ChevronRight />
          <p className="text-green-500">Update Plan</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-1 text-center">
        {
          plansList.length > 0 ? (
            <div className="flex items-center gap-2 mt-2">
              <p className="text-lg sm:text-xl font-medium">Monthly</p>
              <label className="relative cursor-pointer flex items-center">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isYearly}
                  onChange={toggleBilling}
                />
                <div
                  className={`w-14 sm:h-8 h-7 rounded-full ${
                    isYearly ? "bg-green-500" : "bg-gray-300"
                  } flex items-center transition-all`}
                  // onClick={toggleBilling} // Ensures the toggle works even when clicking the container
                >
                  <div
                    className={`sm:w-6 w-5 sm:h-6 h-5 bg-white rounded-full shadow-md transform transition-all ${
                      isYearly ? "sm:translate-x-7 translate-x-8" : "translate-x-1"
                    }`}
                  ></div>
                </div>
              </label>
              <p className="text-lg sm:text-xl font-medium">Yearly</p>
            </div>
          ) : ""
        }
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
      {
        plansList?.length > 0 ? (
          plansList?.map((plan, index) => (
            <div
              className={`bg-white border border-gray-200 rounded-lg  max-w-[384px] w-full mb-1 md:h-[610px] md:mt-7 relative z-10`}
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={plan?.icon_image}
                    className="w-6 h-6"
                  />
                  <h4 className="font-inter font-medium xl:text-2xl lg:text-base text-2xl text-cBlue3 text-nowrap uppercase">{plan?.plan_name}</h4>
                </div>
  
                {/* Pricing Information */}
                <p className="text-xs sm:text-sm text-gray-700 my-4">
                  {isYearly ? "Per user/year" : "Per user/month"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Starting at{" "}
                  <span className="text-red-500 line-through">
                    {currencyLogo}{isYearly
                      ? getAmount(plan?.amount_details, "Yearly")?.price || 0
                      : getAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.price || 0}
                  </span>
                </p>
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <p className="text-3xl sm:text-5xl font-medium text-black">
                  {currencyLogo}{isYearly ? getAmount(plan?.amount_details, "Yearly")?.discount_price || 0 : getAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.discount_price || 0}
                  </p>
                  <span className="text-[10px] sm:text-[12px] rounded-sm bg-green-700 text-black py-[2px] px-2 mt-2">
                    Save {discountPercentage(getAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.price || 0, getAmount(plan?.amount_details, "Yearly Subscription with monthly billing")?.discount_price || 0)}%
                  </span>
                </div>
  
                {/* Checkbox */}
                {
                  isYearly ? "" : (
                    <div className="flex items-start mb-4 text-sm sm:text-base">
                      <input
                        type="checkbox"
                        // id={`monthly-billing-${index}`}
                        className="w-6 h-6 border-2 border-black rounded-[3px] mr-2"
                        onClick={() => {setSelectedCheckbox(prev => prev === index ? null : index)}}
                        checked={selectedCheckbox === index ? true : false}
                      />
                      <label
                        htmlFor={`monthly-billing-${index}`}
                        className="text-gray-700"
                      >Or {currencyLogo}{getAmount(plan?.amount_details, "Monthly")?.discount_price || 0} per user / month when billed monthly (without yearly commitment)</label>
                    </div>
                  )
                }
  
                {/* Buttons */}
                <div className="flex flex-col gap-1">
                  <button className="bg-green-100 text-black py-1 px-2 sm:py-1 sm:px-4 rounded-lg mb-2 sm:mb-0 font-semibold text-[10px] sm:text-[12px]">
                    Gemini add-on available
                  </button>
                  <button
                    type="button"
                    className="bg-black text-white py-2 px-3 w-full sm:py-2 sm:px-4 rounded-lg"
                    onClick={(e) => handleAddToCart(e, plan)}
                  >
                    Add to cart
                  </button>
                </div>
  
                {/* Next Renewal Date */}
                <div className="text-gray-500 text-xs sm:text-xs text-right mt-1">
                  <p className="font-inter font-normal text-xs text-[#555555]">
                    Next renewal date {renewalDate}
                  </p>
                </div>
              </div>
  
              {/* Offers */}
              <div className="px-4 sm:px-6">
                <div className="flex flex-col gap-1 sm:space-y-2 text-gray-700">
                  {plan?.top_features?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <IoCheckmarkCircleSharp className="text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No Data Available</div>
        )
      }
      </div>
    </div>
  );
};

export default PlanCard;
