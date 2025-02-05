import React, { useEffect, useState } from "react";
import { ImTwitter } from "react-icons/im";
import { GrFacebookOption } from "react-icons/gr";
import { FaPinterestP,FaInstagram, FaYoutube } from "react-icons/fa";
import { Base_URL } from "../Constant";
import { getLandingPageThunk } from "store/user.thunk";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";

const initialFooter = {
  contact_us_section_data: {
    name: '',
    type: '',
    value: ''
  },
  marketing_section_data: [],
  newsletter_section_data: [],
  social_section_data: [],
  website_section_data: [],
}
export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [footer, setFooter] = useState(initialFooter);
  // console.log("footer...", footer);

  const getLandingPageData = async() => {
    try {
      const result = await dispatch(getLandingPageThunk()).unwrap();
      setFooter(result?.data?.footer);
      // console.log(result)
    } catch (error) {
      setFooter(initialFooter);
    }
  }
  
  useEffect(() => {
    getLandingPageData();
  }, []);

  const socialIcons = [
    {name: "Twitter", icon: <ImTwitter size="24" fill="white" />, color: 'bg-[#1DA1F2]', },
    {name: "Facebook", icon: <GrFacebookOption size="26" fill="white" />, color: 'bg-[#2f4572]', },
    {name: "Pinterest", icon: <FaPinterestP size="28" fill="white" />, color: 'bg-[#941b20]', },
    {name: "Instagram", icon: <FaInstagram size="28" fill="white" />, color: 'bg-[#3246a7]', },
    {name: "Youtube", icon: <FaYoutube size="28" fill="white" />, color: 'bg-[#951c1b]', },
  ];

  const [pesentYear, setPresentYear] = useState<string|Number>('2025');
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    setPresentYear(year);
  }, []);

  return (
    <footer className="bg-black !w-full">
      <div className=" flex flex-col gap-10 xl:justify-center xl:items-center pt-20 pb-2 px-[2rem] mx-auto sm:justify-start sm:flex-start">
        <div className="grid grid-cols-4 gap-10 items-centerw">
          <div className="flex flex-col gap-2 col-span-4 sm:col-span-2 lg:col-span-1  ">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">MARKETING</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <ul className="text-[#BDBDBD] text-base font-medium flex flex-col gap-2">
              {
                footer?.marketing_section_data?.length > 0 && footer?.marketing_section_data?.map((data, index) => (
                  <li className="flex flex-col gap-2" key={index}>
                    <a href={data?.value} target="_blank" className="break-words w-52">{data?.name}</a>
                    <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="flex flex-col gap-2 col-span-4 sm:col-span-2 lg:col-span-1  ">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">WEBSITES</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <ul className="text-[#BDBDBD] text-base font-medium flex flex-col gap-2">
              {
                footer?.website_section_data?.length > 0 && footer?.website_section_data?.map((data, index) => (
                  <li className="flex flex-col gap-2" key={index}>
                    <a href={data?.value} target='_blank' className="break-words w-52">{data?.name}</a>
                    <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="flex flex-col gap-2 col-span-4 sm:col-span-2 lg:col-span-1  ">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">CONTACT US</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col gap-10">
              <div className="text-[#BDBDBD] text-base font-medium flex flex-col gap-1" dangerouslySetInnerHTML={{__html: footer?.contact_us_section_data?.value}}>
              </div>
              {/* <div className="flex gap-1">
                {
                  footer?.social_section_data?.length > 0 && footer?.social_section_data?.map((data, index) => (
                    <a className={`w-10 h-10 rounded-full flex items-center justify-center ${socialIcons.find(item => item.name === data?.name)?.color}`} href={data?.value} target="_blank" key={index}>
                      {socialIcons.find(item => item.name === data?.name)?.icon}
                    </a>
                  ))
                }
              </div> */}
            </div>
          </div>
          <div className="flex flex-col gap-2 col-span-4 sm:col-span-2 lg:col-span-1  ">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">LEARNING AND SUPPORT</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <ul className="text-[#BDBDBD] text-base font-medium flex flex-col gap-2">
              {
                footer?.newsletter_section_data?.length > 0 && footer?.newsletter_section_data?.map((data, index) => (
                  <li className="flex flex-col gap-2" key={index}>
                    <a href={data?.value} target='_blank' className="break-words w-52">{data?.name}</a>
                    <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="text-center  w-100% ">
          {/* <div className="flex relative gap-4 mb-4 hidden">
            <button className="bg-greenbase text-white px-4 h-[3rem] text-xl font-bold">Buy Domain/Hosting</button>
            <img
              src={Base_URL + "/images/footer1.png"}
              alt="footerbadge"
              className="h-[5rem] w-[12rem] object-cover"
            />
          
            <img
            src={Base_URL + "/images/footer2.png"}
            alt="footerbadge"
            className="h-[4.5rem] w-[12rem] object-cover"
            />
            <img
            src={Base_URL + "/images/footer3.webp"}
            alt="footerbadge"
            className="h-[7rem] w-[5rem] object-cover absolute right-[6rem]"
            />
          
            <img
            src={Base_URL + "/images/footer4.jpg"}
            alt="footerbadge"
            className="size-20 object-cover ml-14"
            />

          </div> */}
          
          <p className="font-inter font-bold text-[#EEEEEE] text-base"><span className="font-normal">© Copyright </span>Hordanso LLC All Rights Reserved {pesentYear.toString()} | Web Design & Development by
          Schemaphic Systems Pvt Ltd</p>
          
        </div>
      </div>
    </footer>
  );
}
