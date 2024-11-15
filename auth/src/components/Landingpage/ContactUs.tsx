import React from "react";
import { LuPhone } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { SmallButton } from "../../utils/buttons/Button";

const ContactUs = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-14">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-greenbase">Contact Us</h2>
        <p className="font-normal text-2xl mt-4">
          Fill the form to contact us for more information
        </p>
      </div>
      <div className="flex max-lg:flex-col lg:flex-row max-lg:gap-2 lg:gap-x-8 max-lg:justify-center">
        <div className="grid max-md:grid-cols-1 grid-cols-2 sm:grid-cols-2 gap-y-4 gap-x-6 lg:w-[70%]">
          {/* First Name */}
          <div>
            <p className="font-normal text-base">
              First Name<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          {/* Last Name */}
          <div>
            <p className="font-normal text-base">
              Last Name<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          {/* Email Address */}
          <div className="col-span-1 sm:col-span-2">
            <p className="font-normal text-base">
              Email Address<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          {/* Phone Number */}
          <div>
            <p className="font-normal text-base">
              Phone Number<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          {/* Subject */}
          <div>
            <p className="font-normal text-base">
              Subject<span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" />
          </div>
          {/* Message */}
          <div className="col-span-1 sm:col-span-2">
            <p className="font-normal text-base">
              Please tell us how we can help
              <span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none h-[8.3rem]" />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center col-span-1 sm:col-span-2">
            <SmallButton
              placeholder="Submit"
              className="w-full sm:w-[80%] text-white"
            />
          </div>
        </div>
        {/* Contact Info */}
        <div className="flex max-md:flex-col max-lg:flex-row lg:flex-col gap-4 mt-8 lg:mt-0 lg:w-[30%]">
          {/* Call Us */}
          <div className="bg-white shadow-md flex items-center py-4 px-6 lg:py-8 lg:px-12 gap-3">
            <LuPhone size={28} />
            <div>
              <p className="text-greenbase font-bold lg:text-base">CALL US</p>
              <p className="font-bold lg:text-base underline">+1 469-893-0678</p>
            </div>
          </div>
          {/* Email Us */}
          <div className="bg-white shadow-md flex items-center py-4 px-6 lg:py-8 lg:px-12 gap-3">
            <MdMailOutline size={28} />
            <div>
              <p className="text-greenbase font-bold lg:text-base">EMAIL US</p>
              <p className="font-bold lg:text-base underline">
                contact@hordanso.com
              </p>
            </div>
          </div>
          {/* Address */}
          <div className="bg-white shadow-md flex items-center py-4 px-6 lg:py-8 lg:px-12 gap-3">
            <IoLocationOutline size={30} />
            <div>
              <p className="text-greenbase font-bold lg:text-base">ADDRESS</p>
              <p className="font-bold md:text-xs lg:text-base">
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
