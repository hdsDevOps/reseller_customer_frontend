import React from "react";
import { Base_URL } from "../../Constant";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import '../../styles/styles.css';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


const HeroSection = () => {
  const googleImages = [
    { name: 'gmail', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=ce4bf445-8280-4c97-9743-e79168a27f11', },
    { name: 'calendar', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-calendar.png?alt=media&token=5fe35ef3-4515-4152-b6d3-dbd20de1ce61', },
    { name: 'drive', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-drive.png?alt=media&token=278d55ef-6407-4f69-bd02-79750c515ff0', },
    { name: 'one', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-one.png?alt=media&token=2bcb69dd-ab4e-4048-9db5-f6367a786f6e', },
    { name: 'meet', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=4945f794-64ac-447b-9b60-cdb3ec04e1bb', },
  ]
  return (
    // <div className="w-full max-w-screen-2xl mx-auto h-[55.375rem] relative">
    //   <div className="flex w-full justify-between px-10 absolute z-10 items-center top-[22rem]">
    //     <SlArrowLeft className="cursor-pointer " fill="#FEF4EF" size={40} />
    //     <SlArrowRight className="cursor-pointer" fill="#FEF4EF" size={40} />
    //   </div>
    //   <div className="bg-black/50 absolute top-0 left-0 h-full backdrop-blur-lg w-[56.125rem]">
    //     <div className="px-16 py-24 ">
    //       <h2 className="font-extrabold text-3xl text-[#ffffff] flex justify-center text-wrap w-[39.125rem]">
    //         Create, connect and collaborate with the power of AI
    //       </h2>
    //       <p className="font-normal text-lg flex text-wrap w-[36.313rem] text-[#ffffff] mt-3">
    //         Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor
    //         porta montes varius lobortis. Dapibus risus suscipit curabitur leo
    //         id est. Quam est volutpat hendrerit vitae dui turpis sit. Ut amet
    //         aliquam etiam montes. Tristique diam vitae maecenas amet mattis
    //         risus lacus enim. Nec turpis facilisis elit accumsan morbi. Tempus
    //         enim vitae{" "}
    //       </p>
    //     </div>
    //     <div className="flex items-center gap-3 px-16">
    //       <img
    //         src={process.env.BASE_URL + "/images/gmail.png"}
    //         alt="google mail"
    //         className="size-12"
    //       />
    //       <img
    //         src={process.env.BASE_URL + "/images/calendar.png"}
    //         alt="google calender"
    //         className="size-10"
    //       />
    //       <img
    //         src={process.env.BASE_URL + "/images/works.png"}
    //         alt="google works"
    //         className="size-12"
    //       />
    //       <img
    //         src={process.env.BASE_URL + "/images/one.png"}
    //         alt="google one"
    //         className="w-6 h-10"
    //       />
    //       <img
    //         src={process.env.BASE_URL + "/images/meet.png"}
    //         alt="google meet"
    //         className="size-12"
    //       />
    //     </div>
    //     <div className="flex flex-col px-16 gap-7">
    //       <p className="text-2xl font-extrabold text-[#ffffff] mt-12">
    //         Starting at ₹3.00/mth
    //       </p>
    //       <Link to="/NewRegister">
    //         <button className="px-3.5 py-2.5 bg-greenbase text-[#ffffff] rounded-lg font-semibold text-base w-[8.875rem]">
    //           Register now
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    //   <img
    //     src={Base_URL + "/images/heroimage.jpg"}
    //     alt="Heroimage"
    //     className="object-cover size-full"
    //   />
    //   <div className="background-red absolute bottom-[20px] flex px-16 min-[1280px]:static">
    //     <div className=" mr-3 w-[18.688rem] h-[8.063rem] flex justify-center items-center bottom-[23.5rem] right-[35rem] xl:absolute">
    //       <img
    //         src={Base_URL + "/images/gift50.png"}
    //         alt="Coupon 50%"
    //         className="size-full"
    //       />
    //     </div>
    //     <div className=" w-[18.688rem] h-[8.063rem] flex justify-center items-center bottom-[13.5rem] right-[28rem]  xl:absolute">
    //       <img
    //         src={Base_URL + "/images/gist2x1.png"}
    //         alt="Coupon 50%"
    //         className="size-full"
    //       />
    //     </div>
    //   </div>
    //   {/* <div className="absolute flex flex-col bg-white">
    //     <div className="w-[18.688rem] h-[8.063rem] flex justify-center items-center bottom-[23.5rem] right-[35rem]">
    //       <img
    //         src={Base_URL + "/images/gift50.png"}
    //         alt="Coupon 50%"
    //         className="size-full"
    //       />
    //     </div>
    //     <div className="w-[18.688rem] h-[8.063rem] flex justify-center items-center bottom-[13.5rem] right-[28rem]">
    //       <img
    //         src={Base_URL + "/images/gist2x1.png"}
    //         alt="Coupon 50%"
    //         className="size-full"
    //       />
    //     </div>
    //   </div> */}
    // </div>
    <div className={`bg-[url('https://s3-alpha-sig.figma.com/img/4c8c/0a20/9ec03166753def42ba75a52439d352b7?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YNC4BGiHGeCQ6kDYc0rIHEg8hr4RoyhvLMQLk~QxvA7ZeA0-1yvXV4A8kg-ErrlrJifUfX3u1TQEZQ0me4evml1hPl-G5BnHxPDCZARb0SKL6uzoknTxYYbJ~MzJwb45tJGnBow8hF5LLb0Qjq7Vk~Ppf~YGYRhj~MuBtjTNiXnqPlDDdewc5dEmx5VhhvJQhbwt9pHtl7wUt5t6zKESDILR8z-RP-tk~atlIHawpoUoNLFNMBy3cbzHq3JYte1g2a9YfDDWYJwOZi30S1WcINWwx3Tq6Jmgu6NGBgarWVGp2f0B1BvZwciG-pt841gEu4~pL8ctG2wrkKVDa6enkg__')] bg-cover bg-center xl:h-[620px] lg:h-[690px] small-medium:h-[700px] md:h-[700px] min-[641px]:h-[730px] small:h-[1070px] h-[1180px] w-full py-1 flex flex-col relative`}>
      <div className="w-full overflow-hidden whitespace-nowrap bg-[#12A833] bg-opacity-50 shadow-sm">
        <div className="inline-block animate-scroll">
          <div className="flex items-center py-[2px] pb-1">
            <p className="font-inter font-normal text-base text-white">
              Gemini for Workspace: Google's AI-powered assistant seamlessly integrated into Gmail, Docs, Sheets, and more. Discover the future of productivity. <span className="font-bold">LEARN MORE</span>
            </p>
            <FaArrowRightLong className="w-9 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 h-full">
        <div className="sm:col-span-2 col-span-3 text-white bg-[#454545] bg-opacity-20 relative h-full">
          <div className="backdrop-blur-sm h-full"></div>
          <div className="absolute top-0 md:py-[40px] py-3 md:px-[70px] px-3">
            <h3 className="font-inter font-extrabold text-[40px] text-white">Create, connect and collaborate with the power of AI</h3>
            <p className="font-inter font-normal text-lg text-white py-2">Lorem ipsum dolor sit amet consectetur. Lacus sollicitudin tortor porta montes varius lobortis. Dapibus risus suscipit curabitur leo id est. Quam est volutpat hendrerit vitae dui turpis sit. Ut amet aliquam etiam montes. Tristique diam vitae maecenas amet mattis risus lacus enim. Nec turpis facilisis elit accumsan morbi. Tempus enim vitae </p>

            <div className="mt-[80px] flex gap-[30px]">
              {
                googleImages.map((google, index) => (
                  <img
                    key={index}
                    src={google.image}
                    alt={google.name}
                    className="sm:h-[50px] h-[30px]"
                  />
                ))
              }
            </div>

            <h4 className="font-inter font-extrabold text-2xl text-white mt-14">Starting at $3.00/mth</h4>

            <button
              type="button"
              className="font-inter font-semibold text-base text-white my-8 px-3 py-[10px] rounded-[10px] bg-[#12A833]"
            >Register now</button>
          </div>
        </div>
        <div className="col-span-1 sm:block hidden"></div>
      </div>
      <BiChevronLeft className="absolute text-[#FEF4EF] w-20 h-20 top-1/2 left-0" />
      <BiChevronRight className="absolute text-[#FEF4EF] w-20 h-20 top-1/2 right-0" />
      <div className="absolute small-medium:top-1/2 small-medium:left-1/2 ml-1 bottom-4 grid grid-cols-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"
          alt="coupon-1"
          className="w-[300px] h-[129px] object-cover mx-auto small-medium:col-span-2 sm:col-span-1 col-span-2"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"
          alt="coupon-2"
          className="w-[300px] h-[129px] object-cover medium:ml-[150px] small-medium:ml-0 sm:ml-2 ml-0  small-medium:mt-8 sm:mt-0 mt-8 small-medium:col-span-2 sm:col-span-1 col-span-2"
        />
      </div>
    </div>
  );
};
export default HeroSection;
