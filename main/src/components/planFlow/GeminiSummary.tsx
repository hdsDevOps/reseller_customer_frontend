import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaClover } from "react-icons/fa6";
import { IoChevronBackSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { currencyList } from "../CurrencyList";
import { format } from "date-fns";
import { addToCartThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
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

const GeminiSummary: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  console.log("location state...", location.state);

  const { defaultCurrencySlice, userDetails, cartState, customerId } = useAppSelector(state => state.auth);

  const geminiPlan = {
    name: "Gemini Standard",
    iconClass: "text-green-600",
    offers: [
      "Gemini in Gmail, Docs, Sheets, Slides, and Meet",
      "Access to Gemini with Google's most capable AI models",
      "Enterprise-grade security and privacy",
      "Meets the needs of typical business users",
    ],
    price: `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}1,520`,
    startingAt: `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}2100`,
    nextRenewalDate: "12-07-2024",
    alternativePrice: `${currencyList.find(item => item.name === defaultCurrencySlice)?.logo}1.824`,
  };

  const [renewalDate, setRenewalDate] = useState(format(new Date(), "dd-MM-yyyy"));
  
  const [plansList, setPlansList] = useState([]);
  console.log("plans list...", plansList);
    const [currencyLogo, setCurrencyLogo] = useState("$");
  
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
  
  useEffect(() => {
    const today = new Date();
    const futureDate = new Date();
    location.state.period?.toLowerCase() === "yearly" ? futureDate.setFullYear(today.getFullYear() + 1) : futureDate.setDate(today.getDate() + 30);
    
    setRenewalDate(format(futureDate, "dd-MM-yyyy"));
  }, [location.state.period]);

  const getAmount = (amount, period) => {
    const amountDetails =  amount?.find(item => item?.currency_code === defaultCurrencySlice);
    if(amountDetails === undefined) {
      return {type: '', price: 0, discount_price: 0};
    } else {
      return amountDetails?.price?.find(item => item?.type === period);
    }
  };

  useEffect(() => {
    getAmount(plansList[0]?.amount_details, location.state.period);
  }, [plansList, location.state.period]);

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

  const handleAddToCart = async(e) => {
    e.preventDefault();
    const cartItems = cartState?.filter(item => item?.product_type === "google workspace" ? !item :  item?.product_type === "domain" ? !item : item);
    const newCart = [
      ...cartItems,
      {
        payment_cycle: location.state.period,
        price: location.state.plan.amount_details,
        currency: defaultCurrencySlice,
        product_name: location.state.plan.plan_name,
        product_type: "google workspace",
        total_year: location.state.license_usage,
        plan_name_id: location.state.plan.id,
        workspace_status: "trial",
        is_trial: true,
        emails: location.state.emailData
      },
      {
        product_name: location.state.selectedDomain.domain,
        product_type: "domain",
        price: location.state.selectedDomain.price,
        payment_cycle: "Yearly",
        total_year: 1,
        currency: defaultCurrencySlice,
        is_trial: false,
        workspace_status: "new"
      }
    ];
    console.log({newCart});
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
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate('/free-trial-page', {state: location.state})}
        // '/', {state: location.state}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      {/* COULND't BE COMMENTED OUT, SO COPIED TO Gemini-copy.tsx */}

      {/* THIS SECTION IS MADE FOR TEMPORARY, WHEN COMMENTED OUT SECTION IS IN WORKS, TAKE THE CODE FROM Gemini-copy.tsx AND USE THAT AND REMOVE THIS ONE */}
      <div className="mt-6 flex flex-col items-center justify-center mb-8 xsm-max:mb-2 text-center">
        <h2 className="text-5xl font-bold xsm-max:text-[20px]">Gemini will be available soon</h2>
      </div>

      <button
        className="self-end bg-[#12a83c9d] uppercase text-black py-2 px-8 rounded-lg font-semibold"
        onClick={(e) => handleAddToCart(e)}
        cypress-name="gemini-skip-button"
      >
        Skip
      </button>
    </div>
  );
};

export default GeminiSummary;
