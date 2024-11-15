import React from "react";
import { Base_URL } from "../../Constant";
import Resources from "./Resources/Resources";
import FrequentlyAskedQuestions from "./FrequentlyaskedQuestions";

const AboutUs = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="w-full relative">
        <div className="bg-[#12A8334F] absolute inset-0 text-white flex flex-col gap-2 justify-center items-center">
          <h4 className="font-extrabold text-2xl md:text-4xl">
            Everyting you need to know
          </h4>
          <h2 className="font-extrabold text-3xl md:text-5xl">About Us</h2>
        </div>
        <img
          src={Base_URL + "/images/AboutusHero.png"}
          alt="AboutUsHeroimage"
          className="size-full object-cover"
        />
      </div>
      <div className="w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Base_URL}/images/AboutUsSpiral.png)` }}>
        <div>
          <div className="flex flex-col md:flex-row">
            <div className="md:px-[4.375rem] md:pt-[10.625rem] md:pb-11 md:w-[49.688rem] max-md:px-6 max-md:py-6">
              <h2 className="font-semibold max-md:text-xl md:text-3xl text-greenbase">
                Make decisions faster, face to face.
              </h2>
              <p className="text-black max-md:text-sm md:text-base font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-black max-md:text-sm md:text-base font-semibold mt-4">
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
                className="md:w-[45.688rem] md:h-[34.25rem] object-cover max-md:mb-10"
              />
            </div>
          </div>
          <div className="flex md:flex-row max-md:flex-col-reverse">
            <img
              src={Base_URL + "/images/dataanalysis.png"}
              alt="Aboutus"
              className="md:w-[50%] object-cover max-md:w-full"
              // md:w-[35rem] md:h-[27rem] lg:w-[49.988rem] lg:h-[34.25rem]
            />
            <div className="lg:px-[4.375rem] lg:pt-[10.625rem] lg:pb-11 lg:w-[45.688rem] max-lg:px-[2.5rem] max-lg:pt-[1rem] max-lg:pb-6">
            <h2 className="font-semibold max-md:text-xl md:text-3xl text-greenbase">
                Secure your data and devices.
              </h2>
              <p className="text-black max-md:text-sm md:text-base font-semibold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-black max-md:text-sm md:text-base font-semibold">
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
