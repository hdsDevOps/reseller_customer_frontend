import React from "react";
import { Base_URL } from "../../Constant";
import Resources from "./Resources/Resources";
import FrequentlyAskedQuestions from "./FrequentlyaskedQuestions";

const AboutUs = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="w-full h-[19.625rem] relative">
        <div className="bg-[#12A8334F] absolute inset-0 text-white flex flex-col gap-2 justify-center items-center">
          <h4 className="font-extrabold text-4xl">
            Everyting you need to know
          </h4>
          <h2 className="font-extrabold text-5xl">About Us</h2>
        </div>
        <img
          src={Base_URL + "/images/AboutusHero.png"}
          alt="AboutUsHeroimage"
          className="size-full object-cover"
        />
      </div>
      <div className="w-full h-[160.125rem] relative">
        <img
          src={Base_URL + "/images/AboutUsSpiral.png"}
          alt="AboutusSpiral"
          className="size-full object-cover"
        />
        <div className="absolute inset-0">
          <div className="flex">
            <div className="px-[4.375rem] pt-[10.625rem] pb-11 w-[49.688rem]">
              <h2 className="font-semibold text-3xl text-greenbase">
                Make decisions faster, face to face.
              </h2>
              <p className="text-black text-base font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-black text-base font-semibold mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <img
                src={Base_URL + "/images/meetcall.png"}
                alt="AboutusSpiral"
                className="w-[45.688rem] h-[34.25rem] object-cover"
              />
            </div>
          </div>
          <div className="flex">
            <img
              src={Base_URL + "/images/dataanalysis.png"}
              alt="Aboutus"
              className="w-[49.988rem] h-[34.25rem] object-cover"
            />
            <div className="px-[4.375rem] pt-[10.625rem] pb-11 w-[45.688rem]">
              <h2 className="font-semibold text-3xl text-greenbase">
                Secure your data and devices.
              </h2>
              <p className="text-black text-base font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-black text-base font-semibold mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <Resources />
          <FrequentlyAskedQuestions />
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
