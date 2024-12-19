import React from "react";
import HeroSection from "../components/Landingpage/HeroSection";
import { FaArrowRightLong } from "react-icons/fa6";
import PlanandPrice from "../components/Landingpage/PlanandPrice";
import AboutUs from "../components/Landingpage/AboutUs";
import ContactUs from "../components/Landingpage/ContactUs";
import { BsChatLeftText } from "react-icons/bs";
import Resources from "../components/Landingpage/Resources/Resources";
import FrequentlyAskedQuestions from "../components/Landingpage/FrequentlyaskedQuestions";

const Home: React.FC = () => {
  return (
    <section className="w-full">
      <HeroSection />
      <PlanandPrice />
      <AboutUs/>
      <div className="max-w-screen-2xl mx-auto">
        <Resources />
      </div>
      <div className="max-w-screen-2xl mx-auto">
        <FrequentlyAskedQuestions />
      </div>
      <ContactUs/>
    </section>
  );
};

export default Home;
