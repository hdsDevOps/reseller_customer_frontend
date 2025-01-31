import React, { useEffect, useState } from "react";
import PlanCard from "../components/PlanCards";
import { plansAndPricesListThunk } from "store/user.thunk";
import { useAppDispatch } from "store/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const Plans: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
        
  useEffect(() => {
    const section = document.getElementById("top_plans");
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if(!location.state) {
      navigate('/');
    }
  }, [location.state]);

  // console.log(location.state);

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
  return (
    <main className="h-full w-full flex flex-col justify-center items-center" id="top_plans">
      <PlanCard plans={plans} />
    </main>
  );
};

export default Plans;
