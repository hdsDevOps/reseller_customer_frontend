import React from "react";
import { Base_URL } from "../../Constant";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto h-[55.375rem] relative">
      <div className="flex w-full justify-between px-10 absolute z-10 items-center top-[22rem]">
        <SlArrowLeft className="cursor-pointer " fill="#FEF4EF" size={40} />
        <SlArrowRight className="cursor-pointer" fill="#FEF4EF" size={40} />
      </div>
      <div className="bg-black/50 absolute top-0 left-0 h-full backdrop-blur-lg w-[56.125rem]">
        <div className="px-16 py-24 ">
          <h2 className="font-extrabold text-3xl text-[#ffffff] flex justify-center text-wrap w-[39.125rem]">
            Create, connect and collaborate with the power of AI
          </h2>
          <p className="font-normal text-lg flex text-wrap w-[36.313rem] text-[#ffffff] mt-3">
            Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor
            porta montes varius lobortis. Dapibus risus suscipit curabitur leo
            id est. Quam est volutpat hendrerit vitae dui turpis sit. Ut amet
            aliquam etiam montes. Tristique diam vitae maecenas amet mattis
            risus lacus enim. Nec turpis facilisis elit accumsan morbi. Tempus
            enim vitae{" "}
          </p>
        </div>
        <div className="flex items-center gap-3 px-16">
          <img
            src={process.env.BASE_URL + "/images/gmail.png"}
            alt="google mail"
            className="size-12"
          />
          <img
            src={process.env.BASE_URL + "/images/calendar.png"}
            alt="google calender"
            className="size-10"
          />
          <img
            src={process.env.BASE_URL + "/images/works.png"}
            alt="google works"
            className="size-12"
          />
          <img
            src={process.env.BASE_URL + "/images/one.png"}
            alt="google one"
            className="w-6 h-10"
          />
          <img
            src={process.env.BASE_URL + "/images/meet.png"}
            alt="google meet"
            className="size-12"
          />
        </div>
        <div className="flex flex-col px-16 gap-7">
          <p className="text-2xl font-extrabold text-[#ffffff] mt-12">
            Starting at ₹3.00/mth
          </p>
          <Link to="/NewRegister">
            <button className="px-3.5 py-2.5 bg-greenbase text-[#ffffff] rounded-lg font-semibold text-base w-[8.875rem]">
              Register now
            </button>
          </Link>
        </div>
      </div>
      <img
        src={Base_URL + "/images/heroimage.jpg"}
        alt="Heroimage"
        className="object-cover size-full"
      />
      <div className="absolute w-[18.688rem] h-[8.063rem] flex justify-center items-center bottom-[23.5rem] right-[35rem]">
        <img
          src={Base_URL + "/images/gift50.png"}
          alt="Coupon 50%"
          className="size-full"
        />
      </div>
      <div className="absolute w-[18.688rem] h-[8.063rem] flex justify-center items-center bottom-[13.5rem] right-[28rem]">
        <img
          src={Base_URL + "/images/gist2x1.png"}
          alt="Coupon 50%"
          className="size-full"
        />
      </div>
    </div>
  );
};
export default HeroSection;
