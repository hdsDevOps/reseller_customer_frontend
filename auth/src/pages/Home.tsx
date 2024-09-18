import React from "react";
import HeroSection from "../components/Landingpage/HeroSection";
import { FaArrowRightLong } from "react-icons/fa6";
import PlanandPrice from "../components/Landingpage/PlanandPrice";
import AboutUs from "../components/Landingpage/AboutUs";
import ContactUs from "../components/Landingpage/ContactUs";
import { BsChatLeftText } from "react-icons/bs";

const Home: React.FC = () => {
  return (
    <section className="w-full">
      <div className="px-20 py-1 w-full mx-auto justify-center bg-[rgba(18,168,51,0.5)] flex gap-2 text-white ">
        <p className="font-normal text-lg text-white">
          Gemini for Workspace: Google's AI-powered assistant seamlessly
          integrated into Gmail, Docs, Sheets, and more. Discover the future of
          productivity. LEARN MORE
        </p>
        <FaArrowRightLong className="w-6 h-6" />
      </div>
      <div className="size-[3.875rem] flex rounded-full items-center pt-2 fixed z-10 bottom-4 right-4 bg-greenbase justify-center">
      <BsChatLeftText size={30} fill="white"/>
      </div>
      <HeroSection />
      <PlanandPrice />
      <AboutUs/>
      <ContactUs/>
    </section>
  );
};

export default Home;
