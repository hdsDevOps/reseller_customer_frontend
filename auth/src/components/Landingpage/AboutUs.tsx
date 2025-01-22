import React, { useState } from "react";
import { Base_URL } from "../../Constant";
import Resources from "./Resources/Resources";
import FrequentlyAskedQuestions from "./FrequentlyaskedQuestions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import './AboutUs.css';

const AboutUs = ({aboutUs, id}:any) => {
  const navigate = useNavigate();
  // console.log("aboutUs...", aboutUs);
  return (
    <section className="max-w-screen-2xl mx-auto bg-top bg-cover" style={{ backgroundImage: `url(${Base_URL}/images/AboutUsSpiral.png)` }} id={id}>
      <div className={`w-full relative my-2 ${aboutUs?.heading_section?.image ? "" : "sm:h-[200px] h-[100px]"}`}>
        <div className="bg-[#12A8334F] absolute inset-0 text-white flex flex-col gap-2 justify-center items-center">
          <h4 className="font-extrabold sm:text-4xl text-xl">
            {aboutUs?.heading_section?.heading}
          </h4>
          <h2 className="font-extrabold sm:text-5xl text-2xl">About Us</h2>
        </div>
        {
          aboutUs?.heading_section?.image && (
            <img
              src={aboutUs?.heading_section?.image}
              alt="AboutUsHeroimage"
              className="w-full sm:max-h-[300px] max-h-[200px] object-cover"
            />
          )
        }
      </div>
      <div className="w-full bg-cover bg-center"
      >
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


// style={{ backgroundImage: `url(${Base_URL}/images/AboutUsSpiral.png)` }}