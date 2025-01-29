import React, { useEffect, useState } from "react";
import PlanCard from "../PlanCards";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
import { SmallButton } from "../../utils/buttons/Button";
import ProductivityAndCollaboration from "./ProductivityTable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { checkDomainThunk, domainAvailabilityThunk } from "store/reseller.thunk";
import { plansAndPricesListThunk } from "store/user.thunk";
import { Base_URL } from "../../Constant";

const PlanandPrice = ({id}:any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);
  // console.log("defaultCurrencySlice...", defaultCurrencySlice);

  const [domain, setDomain] = useState("");
  // console.log("domain...", domain);
  const [basePlans, setBasePlans] = useState([]);
  // console.log("basePlans...", basePlans);
  const [plans, setPlans] = useState([]);
  // console.log("plans...", plans);

  const [plansLength, setPlansLength] = useState(0);
  // console.log("plansLength...", plansLength);
  const [activePlans, setActivePlans] = useState([]);
  // console.log("activePlans...", activePlans);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  // console.log("activePlanIndex...", activePlanIndex);

  useEffect(() => {
    if(basePlans?.length > 0) {
      const currentPlans = basePlans?.filter(planName => planName?.amount_details?.some(detail => detail?.currency_code === defaultCurrencySlice));
      // console.log("currentPlans....", currentPlans);
      setPlans(currentPlans);
    } else {
      setPlans([]);
    }
  }, [basePlans, defaultCurrencySlice]);

  useEffect(() => {
    if(plans?.length > 0) {
      const plansList = plans?.filter((_, index) => index < 3);
      setActivePlans(plansList);
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

  useEffect(() => {
    if(plansLength - activePlanIndex >= 3) {
      setActivePlans(plans?.filter((_,index) => index >= activePlanIndex && index < activePlanIndex+3));
    } else if(plansLength - activePlanIndex < 3) {
      const diff = plansLength - activePlanIndex;
      // console.log("diff...", diff);
      if(diff === 2) {
        const customPlans = plans?.filter((_,index) => index >= activePlanIndex);
        customPlans?.push(plans[0]);
        setActivePlans(customPlans);
      } else if(diff === 1) {
        const customPlans = [plans[activePlanIndex]];
        console.log([plans[activePlanIndex]])
        customPlans?.push(plans[0], plans[1]);
        setActivePlans(customPlans);
      }
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

  const handleDomainChange = e => {
    setDomain({
      ...domain,
      [e.target.name]: e.target.value,
    });
  };

  const handleDomainSearch = async(e) => {
    e.preventDefault();
    try {
      const result = await dispatch(domainAvailabilityThunk(domain)).unwrap();
      console.log("result...", result);
      navigate('/domainlist', {state: {selectedDomain: domain, result: result, from: 'home', type: 'new'}});
    } catch (error) {
      
      toast.error("Error finding domain");
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
            <PlanCard plans={activePlans} handleLeftPlan={() => handleLeftPlan()} handleRightPlan={() => handleRightPlan()} plansLength={plansLength} />
            <div className="flex flex-col items-center justify-center mx-auto mt-10">
              <p className="mb-2 text-xl font-medium text-greenbase">Compare plans in details</p>
              <FaArrowDownLong fill="#12A833"/>
            </div>
            
            <ProductivityAndCollaboration plans={activePlans} />
          </>
        )
      }
    </section>
  );
};
export default PlanandPrice;
