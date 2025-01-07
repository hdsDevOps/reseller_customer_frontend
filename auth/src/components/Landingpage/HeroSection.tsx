import React, { useEffect, useState } from "react";
import { Base_URL } from "../../Constant";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import '../../styles/styles.css';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useAppDispatch } from "store/hooks";
import { getBannerThunk } from "store/user.thunk";


const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const googleImages = [
    { name: 'gmail', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=ce4bf445-8280-4c97-9743-e79168a27f11', },
    { name: 'calendar', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-calendar.png?alt=media&token=5fe35ef3-4515-4152-b6d3-dbd20de1ce61', },
    { name: 'drive', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-drive.png?alt=media&token=278d55ef-6407-4f69-bd02-79750c515ff0', },
    { name: 'one', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-one.png?alt=media&token=2bcb69dd-ab4e-4048-9db5-f6367a786f6e', },
    { name: 'meet', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=4945f794-64ac-447b-9b60-cdb3ec04e1bb', },
  ];
  const defaultCurrency = "USD";
  const [banner, setBanner] = useState([]);
  // console.log("banner...", banner);

  const getBannerLists = async() => {
    try {
      const result = await dispatch(getBannerThunk()).unwrap();
      setBanner(result?.data);
    } catch (error) {
      setBanner([]);
    }
  };

  useEffect(() => {
    getBannerLists();
  }, []);

  const getAmountByCurrency = (array) => {
    const amount = array?.find((item) => item?.currency_code === defaultCurrency);
    return amount;
  }

  return (
    <div>
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
      {
        banner?.length > 0 && (
          <Carousel>
            {
              banner?.map((item, index) => (
                <div
                  className={`xl:h-[620px] big:h-[690px] small-medium:h-[800px] small-2-1:h-[800px] small:h-[1070px] h-[1180px] w-full py-1 grid grid-cols-5 relative`}
                  style={{backgroundImage: `url('${item?.background_image}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                  key={index}
                >
                  <div className="lg:col-span-3 col-span-5">
                    <div className="grid grid-cols-3 h-full">
                      <div className="sm:col-span-2 col-span-3 text-white bg-[#454545] bg-opacity-20 relative h-full">
                        <div className="backdrop-blur-sm h-full"></div>
                        <div className="absolute top-0 md:py-[40px] py-3 md:px-[70px] px-3">
                          <h3 className="font-inter font-extrabold text-[40px] text-white">{item?.title}</h3>
                          <p className="font-inter font-normal text-lg text-white py-2" dangerouslySetInnerHTML={{__html: item?.description}}></p>

                          <div className="mt-[80px] flex gap-[10px] sm:h-[50px] h-[30px]">
                            {
                              googleImages.map((google, index) => (
                                <img
                                  key={index}
                                  src={google.image}
                                  alt={google.name}
                                  className="h-full object-contain"
                                />
                              ))
                            }
                          </div>

                          <h4 className="font-inter font-extrabold text-2xl text-white mt-14">Starting at {getAmountByCurrency(item?.currency_details)?.value}{getAmountByCurrency(item?.currency_details)?.amount}/mth</h4>

                          <button
                            type="button"
                            className="font-inter font-semibold text-base text-white my-8 px-3 py-[10px] rounded-[10px] bg-[#12A833]"
                            onClick={() => {window.location.href=`${item?.button_url}`}}
                          >{item?.button_title}</button>
                        </div>
                      </div>
                      <div className="col-span-1 sm:block hidden"></div>
                    </div>
                  </div>
                  <div className="absolute ml-1 bottom-4 right-4 grid grid-cols-2">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"
                      alt="coupon-1"
                      className="w-[250px] h-[129px] object-cover mx-auto small-medium:col-span-2 sm:col-span-1 col-span-2"
                    />
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"
                      alt="coupon-2"
                      className="w-[250px] h-[129px] object-cover medium:ml-[10px] small-medium:ml-0 sm:ml-2 ml-0 small-medium:mt-8 sm:mt-0 mt-8 small-medium:col-span-2 sm:col-span-1 col-span-2"
                    />
                  </div>
                </div>
              ))
            }
          </Carousel>
        )
      }
    </div>
  );
};
export default HeroSection;
