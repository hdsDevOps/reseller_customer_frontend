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
import { ArrowBigUp } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


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
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-1 bg-green-100 text-white rounded-full shadow-lg hover:bg-green-200 transition-all duration-300 z-50"
        >
          <ArrowBigUp className="text-[#12A833] w-10 h-10" />
        </button>
      )}
    </section>
  );
};

export default Home;
