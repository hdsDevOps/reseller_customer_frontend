import React, { useEffect, useState } from "react";
import PlanCard from "../PlanCards";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowDownLong } from "react-icons/fa6";
import { SmallButton } from "../../utils/buttons/Button";
import ProductivityAndCollaboration from "./ProductivityTable";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { checkDomainThunk } from "store/reseller.thunk";
import { plansAndPricesListThunk } from "store/user.thunk";

const initialDomain = {
  domain: '',
  extention: '.com'
};

const PlanandPrice = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [domain, setDomain] = useState(initialDomain);
  // console.log("domain...", domain);
  const [plans, setPlans] = useState([]);
  // console.log("plans...", plans);

  const getPlansList = async() => {
    try {
      const result = await dispatch(plansAndPricesListThunk({subscription_id: ""})).unwrap();
      setPlans(result?.data);
    } catch (error) {
      setPlans([]);
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
      const result = await dispatch(checkDomainThunk({domain: `${domain?.domain}${domain?.extention}`})).unwrap();
      console.log("result...", result);
    } catch (error) {
      toast.error("Error finding domain");
    }
  }
  return (
    <section className="w-full ms:px-16 px-4 max-w-screen-2xl mx-auto">
      <form onSubmit={handleDomainSearch} className="py-[4.175rem] flex flex-col md:flex-row justify-center gap-4 items-center mx-auto">
          <div className="relative flex justify-center flex-1 w-full">
            <input className="bg-transparent border py-6 px-10  w-full rounded-md shadow-md font-normal text-2x" placeholder="Type your desired domain here." onChange={handleDomainChange} name="domain" value={domain?.domain} />
            <div className="flex justify-center items-center absolute top-5 right-[2rem]">
              <select onChange={handleDomainChange} name="extention" value={domain?.extention}>
                <option value=".com">.com</option>
                <option value=".co.in">.co.in</option>
                <option value=".website">.website</option>
                <option value=".net">.net</option>
                <option value=".in">.in</option>
                <option value=".co.uk">.co.uk</option>
              </select>
            </div>
          </div>
          <button className="px-4 py-6 text-lg font-semibold text-white rounded-md bg-greenbase" type="submit">Search Domain</button>
      </form>
      <PlanCard plans={plans} />
      <div className="flex flex-col items-center justify-center mx-auto mt-10">
        <p className="mb-2 text-xl font-medium text-greenbase">Compare plans in details</p>
        <FaArrowDownLong fill="#12A833"/>
      </div>
      
      <ProductivityAndCollaboration plans={plans} />
    </section>
  );
};
export default PlanandPrice;
