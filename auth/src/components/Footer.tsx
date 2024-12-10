import React from "react";
import { ImTwitter } from "react-icons/im";
import { GrFacebookOption } from "react-icons/gr";
import { FaPinterestP,FaInstagram, FaYoutube } from "react-icons/fa";
import { Base_URL } from "../Constant";
export default function Footer() {
  return (
    <footer className="bg-black !w-full">
      <div className=" flex flex-col gap-10 xl:justify-center xl:items-center py-20 px-[2rem] mx-auto sm:justify-start sm:flex-start">
        <div className="flex gap-10 xl:flex-row sm:flex-col flex-col ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">MARKETING</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <ul className="text-[#BDBDBD] text-base font-medium flex flex-col gap-2">
              <li className="flex flex-col gap-2">
                <a href="#">Video</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">SEO</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">SMO</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Mobile</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Campaign</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Terms and Condition</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">WEBSITES</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <ul className="text-[#BDBDBD] text-base font-medium flex flex-col gap-2">
              <li className="flex flex-col gap-2">
                <a href="#">Domain name</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Design</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Develop</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Hosting</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">WordPress</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
              <li className="flex flex-col gap-2">
                <a href="#">Privacy and Policy</a>
                <hr className="w-52 bg-[#808080] h-[0.15rem] rounded-md"></hr>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">CONTACT US</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col gap-10">
              <div className="text-[#BDBDBD] text-base font-medium flex flex-col gap-1">
                <p className="text-[#BDBDBD]">Hordanso LLC</p>
                <p className="text-[#BDBDBD]">4364 Western Center Blvd PMB 2012</p>
                <p className="text-[#BDBDBD]">Fort Worth, TX 76137-2043</p>
                <a>
                  Phone: <span>+1 469-893-0678</span>
                </a>
                <a>
                  Email: <span>contact@hordanso.com</span>
                </a>
              </div>
              <div className="text-[#BDBDBD] text-base font-medium flex flex-col gap-1">
                <p className="text-[#BDBDBD]">Hordanso LTD</p>
                <p className="text-[#BDBDBD]">479 Ikorodu Rd, Ketu, Lagos, 100243</p>
                <a>
                  Phone: <span>+(234)806 044 0510</span>
                </a>
                <a>
                  Email: <span>contact@hordanso.ng</span>
                </a>
              </div>
              <div className="flex gap-1 hidden">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1DA1F2]">
                  <ImTwitter size="24" fill="white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#2f4572]">
                  <GrFacebookOption size="26" fill="white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#941b20]">
                  <FaPinterestP size="28" fill="white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#3246a7]">
                  <FaInstagram size="28" fill="white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#951c1b]">
                  <FaYoutube size="28" fill="white" />
                </div>  
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-white font-semibold">OUR NEWSLETTER</p>
              <progress
                className="progress w-52 h-0.5"
                value="25"
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#BDBDBD]">Search for: </p>
              <div className="w-[21.25rem] border-yellow-300 h-14 rounded-full bg-[#BDBDBD] flex items-center px-1.5 py-2 relative">
                <input
                  className="w-56 bg-[#F0F0F3] h-12 rounded-full p-2 text-md"
                  placeholder="Search"
                ></input>
                <button className="bg-[#12a833] px-3 rounded-full py-2.5 text-white font-semibold text-lg absolute right-1.5">
                  Search
                </button>
              </div>
              <p className="flex text-left w-[25.5rem] font-medium text-lg text-[#BDBDBD]">
                From mobile apps, marketing & websites; to automation & extreme
                software engineering. We tackle the difficult & not so easy
                technical issues of today in the always on digital world of
                tomorrow.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center text-[#EEEEEE] w-100% ">
        <div className="flex relative gap-4 mb-4 hidden">
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

        </div>

         <p></p>
          
            Hordanso LLC All Rights Reserved 2024 | Web Design & Development by
            HDS Hordanso
          
        </div>
      </div>
    </footer>
  );
}
