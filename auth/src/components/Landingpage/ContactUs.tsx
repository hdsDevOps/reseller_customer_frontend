import React from "react";
import { LuPhone } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { SmallButton } from "../../utils/buttons/Button";

const ContactUs = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-16 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-greenbase">Contact Us</h2>
        <p className="font-normal text-2xl mt-4">
          Fill the form to contact us for more information
        </p>
      </div>
      <div className="flex gap-8 justify-center">
        <div className="grid grid-rows-6 grid-cols-2 gap-y-2 gap-x-6">
          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              First Name<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className=" w-[27.063rem] p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              Last Name<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-[27.063rem] p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>

          <div className="row-span-1 col-span-2">
            <p className="font-normal text-base">
              Email Address<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>

          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              Phone Number<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-[27.063rem] p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              Subject<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-[27.063rem] p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>

          <div className="row-span-2 col-span-2">
            <p className="font-normal text-base">
              Please tell us how we can help
              <span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none h-[8.3rem]" />
          </div>
          <div className="flex justify-center row-span-1 col-span-2 h-[3.375rem]">
            <SmallButton placeholder="Submit" className="w-[47.5rem]" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <div className="bg-white shadow-md flex items-center py-8 px-12 gap-3">
            <LuPhone size={28} />
            <div>
              <p className="text-greenbase font-bold text-base">CALL US</p>
              <p className="font-bold text-base underline">+1 469-893-0678</p>
            </div>
          </div>

          <div className="bg-white shadow-md flex items-center py-8 px-12 gap-3">
            <MdMailOutline size={28} />
            <div>
              <p className="text-greenbase font-bold text-base">EMAIL US</p>
              <p className="font-bold text-base underline">
                contact@hordanso.com
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md flex items-center py-8 px-12 gap-3">
            <IoLocationOutline size={30} />
            <div>
              <p className="text-greenbase font-bold text-base">ADDRESS</p>
              <p className="font-bold text-base">
                Hordanso LLC
                <br />
                4364 Western Center Blvd
                <br />
                PMB 2012, Fort Worth, TX
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
