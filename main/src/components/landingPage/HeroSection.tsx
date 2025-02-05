import React, { useEffect, useRef, useState } from "react";
// import { Base_URL } from "../../Constant";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsChatLeftText } from "react-icons/bs";
import './styles.css';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getBannerThunk, getPromotionListThunk } from "store/user.thunk";
import { currencyList } from "../CurrencyList";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ReactPlayer from "react-player";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuTvMinimalPlay } from "react-icons/lu";


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
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeBannerData, setActiveBannerData] = useState(0);
  // console.log("activeBanner....", activeBanner);
  // console.log("banner...", activeBannerData);
  // const [promotionId, setPromotionId] = useState(banner[activeBanner]?.)
  const [activePromotion, setActivePromotion] = useState("");
  // console.log("activePromotion...", activePromotion);
  const [hovering, setHovering] = useState(false);
  const [currentTransform, setCurrentTransform] = useState(0);
  const scrollRef = useRef(null);

  const handleMouseOver = () => {
    if(scrollRef.current) {
      const computedStyle = window.getComputedStyle(scrollRef.current);
      const matrix = new DOMMatrix(computedStyle.transform);
      setCurrentTransform(matrix.m41);
      setHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if(scrollRef.current) {
      scrollRef.current.style.transform = `translateX(${currentTransform}px)`;
      scrollRef.current.style.animation = "none";
      setTimeout(() => {
        scrollRef.current.style.animation = "";
      }, 0);
    }
    setHovering(false);
  }

  useEffect(() => {
    setActiveBannerData(banner[activeBanner]);
  }, [banner, activeBanner]);

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
    // console.log(amount);
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

  const getPromotionList = async() => {
    if(activeBannerData?.show_promotion_status) {
      if(activeBannerData?.promotion_id !== "") {
        try {
          const result = await dispatch(getPromotionListThunk({promotion_id: activeBannerData?.promotion_id})).unwrap();
          // console.log("result...", result);
          setActivePromotion(result);
        } catch (error) {
          setActivePromotion("");
        }
      } else {
        setActivePromotion("");
      }
    } else {
      setActivePromotion("");
    }
  };

  useEffect(() => {
    getPromotionList();
  }, [banner, activeBannerData]);

  const customPrevArrow = (onClickHandler, hasPrev) => (
    <button
      type="button"
      onClick={() => {
        onClickHandler();
        setActivePromotion("");
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: "15px",
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        opacity: hasPrev ? 1 : 0,
      }}
    >
      <ChevronLeft className="w-10 h-10 text-white bg-black bg-opacity-50 rounded-full" />
    </button>
  );

  const CustomNextArrow = (onClickHandler, hasNext) => (
    <button
      type="button"
      onClick={() => {
        onClickHandler();
        setActivePromotion("");
      }}
      style={{
        position: "absolute",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        zIndex: 2,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        opacity: hasNext ? 1 : 0,
      }}
    >
      <ChevronRight className="w-10 h-10 text-white bg-black bg-opacity-50 rounded-full" />
    </button>
  );

  return (
    <div id={id}>
      <div className="w-full overflow-hidden whitespace-nowrap bg-[#12A833] bg-opacity-50 shadow-sm">
        {/* <div className={`inline-block ${hovering ? "" : "animate-scroll"}`} style={hovering ? {transform: `translateX(${currentTransform}px)`} : {}} ref={scrollRef} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}> */}
        <div className="scroll-text">
          <div className="flex items-center py-[2px] pb-1">
            <p className="font-inter font-normal text-base text-white">
              Gemini for Workspace: Google's AI-powered assistant seamlessly integrated into Gmail, Docs, Sheets, and more. Discover the future of productivity.{" "}
              <span className="font-bold cursor-pointer" onClick={() => {navigate('/ai-page')}}>LEARN MORE</span>
            </p>
            <FaArrowRightLong className="w-9 h-6 text-white" />
          </div>
        </div>
      </div>
      {
        banner?.length > 0 && (
          <Carousel showThumbs={false} onChange={(currentIndex) => {setActiveBanner(currentIndex)}} renderArrowPrev={(onClickHandler, hasPrev) => customPrevArrow(onClickHandler, hasPrev)} renderArrowNext={(onClickHandler, hasNext) => CustomNextArrow(onClickHandler, hasNext)}>
            {
              banner?.map((item, index) => (
                <div
                  className={`banner-item w-full grid grid-cols-5 relative pb-4`}
                  style={{backgroundImage: `url('${item?.background_image}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                  key={index}
                >
                  <div className="col-span-5 lg:col-span-3 flex flex-col relative">
                    <div className="banner-blur"></div>
                    <div className="banner-container">
                      <h3 className="banner-header">{item?.title}</h3>

                      <p className="banner-paragraph">
                        <span
                          className="banner-pargraph-text"
                          dangerouslySetInnerHTML={{
                            __html: item?.description?.length > 240 
                            ? `${item.description.substring(0, 240)}...` 
                            : item?.description
                          }}
                        ></span>
                        {
                          item?.show_video_status && (
                            <LuTvMinimalPlay
                              className="banner-paragraph-icon"
                              onClick={() => {
                                setIsModalOpen(true);
                                setModalLink(item?.video_url);
                              }}
                            />
                          )
                        }
                      </p>

                      <div className="sm:mt-[80px] mt-[40px] flex gap-[10px] sm:h-[50px] h-[30px] w-full max-w-[500px]">
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
                      {
                        getAmountByCurrency(item?.currency_details)?.amount && (
                          <h4 className="font-inter font-extrabold text-2xl text-white sm:mt-14 mt-8 text-left">Starting at {currencyList.find(item => item.name === defaultCurrencySlice)?.logo}{getAmountByCurrency(item?.currency_details)?.amount}/mth</h4>
                        )
                      }

                      <button
                        type="button"
                        className="font-inter font-semibold text-base text-white my-8 px-3 py-[10px] rounded-[10px] bg-[#12A833] ml-0 w-fit" 
                        onClick={() => {window.location.href=`${item?.button_url}`}}
                      >{item?.button_title}</button>

                      {
                        item?.show_promotion_status && (
                          <div className="promotion-div">
                            <div className="promotion-div-data" dangerouslySetInnerHTML={{__html: activePromotion?.html_template }}></div>
                          </div>
                          // <div className="">
                          //   <div className="" dangerouslySetInnerHTML={{__html: activePromotion?.html_template}}></div>
                          // </div>
                        )
                      }
                    </div>
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
