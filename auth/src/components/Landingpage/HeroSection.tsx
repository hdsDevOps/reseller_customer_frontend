import React, { useEffect, useRef, useState } from "react";
import { Base_URL } from "../../Constant";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import '../../styles/styles.css';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getBannerThunk } from "store/user.thunk";
import { currencyList } from "../CurrencyList";
import { LuTvMinimalPlay } from "react-icons/lu";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ReactPlayer from "react-player";


const HeroSection = ({id}:any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const googleImages = [
    { name: 'gmail', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=ce4bf445-8280-4c97-9743-e79168a27f11', },
    { name: 'calendar', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-calendar.png?alt=media&token=5fe35ef3-4515-4152-b6d3-dbd20de1ce61', },
    { name: 'drive', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-drive.png?alt=media&token=278d55ef-6407-4f69-bd02-79750c515ff0', },
    { name: 'one', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-one.png?alt=media&token=2bcb69dd-ab4e-4048-9db5-f6367a786f6e', },
    { name: 'meet', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=4945f794-64ac-447b-9b60-cdb3ec04e1bb', },
  ];
  const { defaultCurrencySlice } = useAppSelector(state => state.auth);
  // console.log("defaultCurrencySlice...", defaultCurrencySlice);
  const [banner, setBanner] = useState([]);
  // console.log("banner...", banner);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>("");
  const [videoId, setVideoId] = useState<string|null>(null);

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
    const amount = array?.find((item) => item?.currency_code === defaultCurrencySlice);
    return amount;
  };

  const getYouTubeId = () => {
    if(modalLink !== "") {
      const match = modalLink?.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&\n]+)|youtu\.be\/([^&\n]+)/);
      setVideoId(match ? match[1] || match[2] : null);
    } else {
      setVideoId(null);
    }
  };

  useEffect(() => {
    getYouTubeId();
  }, [modalLink]);

  return (
    <div id={id}>
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
          <Carousel showThumbs={false}>
            {
              banner?.map((item, index) => (
                <div
                  className={`md:h-[620px] h-[650px] w-full grid grid-cols-5 relative`}
                  style={{backgroundImage: `url('${item?.background_image}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                  key={index}
                >
                  <div className="lg:col-span-3 col-span-5">
                    <div className="grid grid-cols-3 h-full">
                      <div className="sm:col-span-2 col-span-3 text-white bg-[#454545] bg-opacity-20 relative h-full">
                        <div className="backdrop-blur-xl h-full"></div>
                        <div className="absolute top-0 md:py-[40px] py-3 md:px-[70px] px-3">
                          <h3 className="font-inter font-extrabold sm:text-[40px] text-[30px] text-white">{item?.title}</h3>
                          {/* <p className="!font-inter !font-normal !text-lg !text-white py-2" dangerouslySetInnerHTML={{__html: item?.description}}></p> */}
                          <p className="!font-inter !font-normal !text-lg !text-white py-2 text-left inline-block items-start">
                            {item?.description}
                            {
                              item?.show_video_status && (
                                <LuTvMinimalPlay className="text-[#12A833] w-6 h-6 ml-2 inline-block cursor-pointer" onClick={() => {
                                  setIsModalOpen(true);
                                  setModalLink(item?.video_url);
                                }} />
                              )
                            }
                          </p>

                          <div className="sm:mt-[80px] mt-[40px] flex gap-[10px] sm:h-[50px] h-[30px]">
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

                          <h4 className="font-inter font-extrabold text-2xl text-white sm:mt-14 mt-8">Starting at {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}{getAmountByCurrency(item?.currency_details)?.amount}/mth</h4>

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
                  <div className="promotion-div">
                    {/* <img
                      src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-1.jpg?alt=media&token=069a7efa-12c6-4ca3-a156-c1113c7ed6e7"
                      alt="coupon-1"
                      className="w-[250px] h-[129px] object-cover mx-auto small-medium:col-span-2 sm:col-span-1 col-span-2"
                    />
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/coupon-2.jpg?alt=media&token=1345dc5f-928e-4987-a7af-5075f9d38f7f"
                      alt="coupon-2"
                      className="w-[250px] h-[129px] object-cover medium:ml-[10px] small-medium:ml-0 sm:ml-2 ml-0 small-medium:mt-8 sm:mt-0 mt-8 small-medium:col-span-2 sm:col-span-1 col-span-2"
                    /> */}
                  </div>
                </div>
              ))
            }
          </Carousel>
        )
      }

      {
        isModalOpen && (
          <Dialog
            open={isModalOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setIsModalOpen(false);
              setModalLink("");
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[1000px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-end items-center mb-6">
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-3xl rotate-45 mt-[-8px] text-black'
                        onClick={() => {
                          setIsModalOpen(false);
                          setModalLink("");
                        }}
                      >+</button>
                    </div>
                  </div>
                  
                  <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <ReactPlayer
                      url={modalLink}
                      width="100%"
                      height="100%"
                      style={{ position: 'absolute', top: 0, left: 0 }}
                      controls
                    />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </div>
  );
};
export default HeroSection;
