import React, { useState } from "react";
import { Base_URL } from "../../Constant";
import Resources from "./Resources/Resources";
import FrequentlyAskedQuestions from "./FrequentlyaskedQuestions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import './AboutUs.css';

const AboutUs = ({aboutUs}:any) => {
  const navigate = useNavigate();
  // console.log("aboutUs...", aboutUs);
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="w-full relative my-2">
        <div className="bg-[#12A8334F] absolute inset-0 text-white flex flex-col gap-2 justify-center items-center">
          <h4 className="font-extrabold text-4xl">
            {aboutUs?.heading_section?.heading}
          </h4>
          <h2 className="font-extrabold text-5xl">About Us</h2>
        </div>
        <img
          src={aboutUs?.heading_section?.image}
          alt="AboutUsHeroimage"
          className="w-full max-h-[300px] object-cover"
        />
      </div>
      <div className="w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Base_URL}/images/AboutUsSpiral.png)` }}>
        <div className="grid-custom items-center lg:flex-row w-full">
          <div className="pb-11  w-full sm:pt-8 my-2 px-2 pl-5">
            <h2 className="font-semibold text-3xl text-greenbase">
              {aboutUs?.block1?.content_title}
            </h2>
            <p className="text-black text-base font-semibold" dangerouslySetInnerHTML={{__html: aboutUs?.block1?.description}}></p>
          </div>
          <img
            src={aboutUs?.block1?.image}
            alt="AboutusSpiral"
            className="w-full object-cover"
          />
        </div>
        <div className="flex flex-col-reverse items-center lg:flex-row w-full my-2">
          <img
            src={aboutUs?.block2?.image}
            alt="Aboutus"
            className="lg:w-1/2 w-full object-cover"
          />
          <div className="pb-11 lg:w-1/2 w-full sm:pt-8 px-2 pl-5">
            <h2 className="font-semibold text-3xl text-greenbase">
              {aboutUs?.block2?.content_title}
            </h2>
            <p className="text-black text-base font-semibold" dangerouslySetInnerHTML={{__html: aboutUs?.block2?.description}}></p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
