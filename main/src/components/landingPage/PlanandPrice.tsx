import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCards";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
// import { SmallButton } from "../../utils/buttons/Button";
import ProductivityAndCollaboration from "./ProductivityTable";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { checkDomainThunk, domainAvailabilityThunk } from "store/reseller.thunk";
import { addToCartThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { setCart } from "store/authSlice";

const PlanandPrice = ({id}:any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { defaultCurrencySlice, userDetails, cartState, customerId } = useAppSelector(state => state.auth);
  // console.log("defaultCurrencySlice...", defaultCurrencySlice);

  const [domain, setDomain] = useState("");
  // console.log("domain...", domain);
  const [basePlans, setBasePlans] = useState([]);
  // console.log("basePlans...", basePlans);
  const [plans, setPlans] = useState([]);
  console.log("plans...", plans);

  const [plansLength, setPlansLength] = useState(0);
  // console.log("plansLength...", plansLength);
  const [activePlans, setActivePlans] = useState([]);
  console.log("activePlans...", activePlans);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  // console.log("activePlanIndex...", activePlanIndex);

  useEffect(() => {
    if(basePlans?.length > 0) {
      const currentPlans = basePlans?.filter(planName => planName?.amount_details?.some(detail => detail?.currency_code === defaultCurrencySlice));
      // console.log("currentPlans....", currentPlans);
      setPlans([...currentPlans]);
    } else {
      setPlans([]);
    }
  }, [basePlans, defaultCurrencySlice]);

  useEffect(() => {
    if(plans?.length > 0) {
      // if(plans?.length > 3) {
      //   const plansList = plans?.filter((_, index) => index < 3);
      //   setActivePlans(plansList);
      // } else {
      //   setActivePlans(plans);
      // }
      setActivePlanIndex(0);
      setPlansLength(plans?.length);
    };
  }, [plans]);

  const handleLeftPlan = () => {
    // console.log("left");
    if(activePlanIndex === 0) {
      setActivePlanIndex(plansLength-1);
    } else {
      setActivePlanIndex(prev => prev-1);
    }
  };

  const handleRightPlan = () => {
    if(activePlanIndex === plansLength -1) {
      setActivePlanIndex(0);
    } else {
      setActivePlanIndex(prev => prev+1);
    }
  };

  // useEffect(() => {
  //   if(plansLength - activePlanIndex >= 3) {
  //     setActivePlans(plans?.filter((_,index) => index >= activePlanIndex && index < activePlanIndex+3));
  //   } else if(plansLength - activePlanIndex < 3) {
  //     const diff = plansLength - activePlanIndex;
  //     // console.log("diff...", diff);
  //     if(diff === 2) {
  //       const customPlans = plans?.filter((_,index) => index >= activePlanIndex);
  //       customPlans?.push(plans[0]);
  //       setActivePlans(customPlans);
  //     } else if(diff === 1) {
  //       const customPlans = [plans[activePlanIndex]];
  //       console.log([plans[activePlanIndex]])
  //       customPlans?.push(plans[0], plans[1]);
  //       setActivePlans(customPlans);
  //     }
  //   }
  // }, [plans, plansLength, activePlanIndex]);
  
  useEffect(() => {
    if(plansLength === 0) {
      setActivePlans([]);
    } else {
      let newActivePlans = [];
      for(let i=0; i < Math.min(3, plansLength); i++) {
        newActivePlans.push(plans[(activePlanIndex + i) % plansLength]);
      }
      setActivePlans([...newActivePlans]);
    }
  }, [plans, plansLength, activePlanIndex]);

  const getPlansList = async() => {
    try {
      const result = await dispatch(plansAndPricesListThunk({subscription_id: ""})).unwrap();
      setBasePlans(result?.data);
    } catch (error) {
      setBasePlans([]);
    }
  };

  useEffect(() => {
    getPlansList();
  }, []);

  const handleDomainSearch = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(domainAvailabilityThunk(domain)).unwrap();
      console.log("result...", result);
      if(userDetails?.workspace) {
        navigate('/choose-domain', {state: {result, domain}});
      } else {
        if(result?.availablity_status === "false") {
          navigate('/choose-from-list', {state: { ...location.state, selectedDomain: domain, result: result, type: 'new', from: "home"}});
        } else{
          navigate('/choose-from-list', {state: {...location.state, selectedDomain: domain, result: result, type: 'new_error', from: "home"}});
        }
      }
      // navigate('/domainlist', {state: {selectedDomain: domain, result: result, from: 'home', type: 'new'}});
    } catch (error) {
      
      toast.error("Error finding domain");
    }
  };
  
  const handleAddToCart = async(e, item, isYearly, selectedCheckbox) => {
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
    <section className="w-full ms:px-16 px-4 max-w-screen-2xl mx-auto" id={id}>
      {
        plans?.length > 0 && (
          <>
            <form onSubmit={handleDomainSearch} className="py-[4.175rem] flex flex-col md:flex-row justify-center gap-4 items-center mx-auto">
              <div className="relative flex justify-center flex-1 w-full bg-white">
                <input className="bg-transparent border py-6 px-10  w-full rounded-md shadow-md font-normal text-2x" placeholder="Type your desired domain here." onChange={e => {setDomain(e.target.value)}} name="domain" value={domain} />
                {/* <div className="flex justify-center items-center absolute top-5 right-[2rem]">
                  <select onChange={handleDomainChange} name="domain_extension" value={domain?.domain_extension}>
                    <option value=".com">.com</option>
                    <option value=".co.in">.co.in</option>
                    <option value=".website">.website</option>
                    <option value=".net">.net</option>
                    <option value=".in">.in</option>
                    <option value=".co.uk">.co.uk</option>
                  </select>
                </div> */}
              </div>
              <button className="px-4 py-6 text-lg font-semibold text-white rounded-md bg-greenbase" type="submit">Search Domain</button>
            </form>
            <PlanCard plans={activePlans} handleLeftPlan={() => handleLeftPlan()} handleRightPlan={() => handleRightPlan()} plansLength={plansLength} handleAddToCart={(e, item, isYearly, selectedCheckbox) => {handleAddToCart(e, item, isYearly, selectedCheckbox)}} />
            <div className="flex flex-col items-center justify-center mx-auto mt-10">
              <p className="mb-2 text-xl font-medium text-greenbase">Compare plans in details</p>
              <FaArrowDownLong fill="#12A833"/>
            </div>
            
            <ProductivityAndCollaboration plans={activePlans} handleAddToCart={(e, item, isYearly, selectedCheckbox) => {handleAddToCart(e, item, isYearly, selectedCheckbox)}} />
          </>
        )
      }
    </section>
  );
};
export default PlanandPrice;
