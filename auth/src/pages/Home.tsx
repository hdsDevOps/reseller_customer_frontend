import React, { useEffect, useState } from "react";
import HeroSection from "../components/Landingpage/HeroSection";
import { FaArrowRightLong } from "react-icons/fa6";
import PlanandPrice from "../components/Landingpage/PlanandPrice";
import AboutUs from "../components/Landingpage/AboutUs";
import ContactUs from "../components/Landingpage/ContactUs";
import { BsChatLeftText } from "react-icons/bs";
import Resources from "../components/Landingpage/Resources/Resources";
import FrequentlyAskedQuestions from "../components/Landingpage/FrequentlyaskedQuestions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { getLandingPageThunk } from "store/user.thunk";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [homeData, setHomeData] = useState({});
  // console.log("homeData...", homeData);

  const getLandingPageData = async() => {
    try {
      const result = await dispatch(getLandingPageThunk()).unwrap();
      setHomeData(result?.data);
    } catch (error) {
      console.log("error", error);
      setHomeData({});
    }
  };

  useEffect(() => {
    getLandingPageData();
  }, []);
  return (
    <section className="w-full">
      <HeroSection id="banner" />
      <PlanandPrice id="plan_and_price" />
      <AboutUs aboutUs={homeData?.about_us} id="about_us" />
      <div className="max-w-screen-2xl mx-auto" id="resources">
        <Resources resouces={homeData?.resources} />
      </div>
      <div className="max-w-screen-2xl mx-auto" id="faqs">
        <FrequentlyAskedQuestions />
      </div>
      <ContactUs contact={homeData?.contact_us} id="contact_us" />
    </section>
  );
};

export default Home;
