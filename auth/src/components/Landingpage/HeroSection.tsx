import React from "react";
import { Base_URL } from "../../Constant";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    style: { width: "auto", height : "100vh" },
  };

  return (
    <div className="w-full min-h-screen overflow-auto">
      <Slider {...settings}>
        <div className="relative max-h-screen">
          <div className="bg-black/50 absolute top-0 left-0 backdrop-blur-lg lg:w-[67%] h-screen">
            <div className="max-md:px-10 max-md:py-3 max-lg:py-7 px-16 py-24 ">
              <h2 className="font-extrabold max-md:text-2xl text-[2.5rem] text-white text-wrap ">
                Create, connect and collaborate with the power of AI
              </h2>
              <p className="font-normal max-md:text-xs md:text-lg flex text-wrap text-white mt-3 lg:w-[80%]">
                Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin
                tortor porta montes varius lobortis. Dapibus risus suscipit
                curabitur leo id est. Quam est volutpat hendrerit vitae dui
                turpis sit. Ut amet aliquam etiam montes. Tristique diam vitae
                maecenas amet mattis risus lacus enim. Nec turpis facilisis elit
                accumsan morbi. Tempus enim vitae{" "}
              </p>
            </div>
            <div className="flex items-center gap-x-3 px-16">
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
            <div className="flex flex-col px-16 lg:gap-y-7 gap-y-4">
              <p className="lg:text-2xl font-extrabold text-white mt-12">
                Starting at ₹3.00/mth
              </p>
              <Link to="/register">
                <button className="px-4 py-3 bg-greenbase text-white rounded-lg font-semibold text-base ">
                  Register now
                </button>
              </Link>
            </div>
          </div>
          <img
            src={Base_URL + "/images/heroimage.jpg"}
            alt="Heroimage"
            className="object-cover size-full w-full max-lg:hidden h-screen"
          />
          <div className="absolute w-[9.688rem] h-[4.063rem] md:w-[18.688rem] md:h-[8.063rem] lg:flex justify-center items-center bottom-[10rem] right-[10rem] md:bottom-[33rem] md:right-[7rem] lg:bottom-[20rem] lg:right-[30rem]">
            <img
              src={Base_URL + "/images/gift50.png"}
              alt="Coupon 50%"
              className="size-full"
            />
          </div>
          <div className="absolute w-[9.688rem] h-[4.063rem] md:w-[18.688rem] md:h-[8.063rem] lg:flex justify-center items-center bottom-[3rem] right-[5rem] md:bottom-[23rem] md:right-[25rem] lg:bottom-[10rem] lg:right-[15rem]">
            <img
              src={Base_URL + "/images/gist2x1.png"}
              alt="2x1 coupon"
              className="size-full"
            />
          </div>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow-md text-gray-700 h-40 flex items-center justify-center">
          <p>Slide 2: Additional promotional content.</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow-md text-gray-700 h-40 flex items-center justify-center">
          <p>Slide 3: More offers and benefits.</p>
        </div>
      </Slider>
    </div>
  );
};
export default HeroSection;



interface ArrowProps {
  onClick?: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 p-2 text-white rounded-full shadow-lg hover:bg-gray-400 focus:outline-none"
    >
      <SlArrowLeft size={20} />
    </button>
  );
};

export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 p-2 text-white rounded-full shadow-lg hover:bg-gray-400 focus:outline-none"
    >
      <SlArrowRight size={20} />
    </button>
  );
};