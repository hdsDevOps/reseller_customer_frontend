import React, { useState } from "react";
import { LuPhone } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { SmallButton } from "../../utils/buttons/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { contactFormThunk } from "store/user.thunk";
import { useAppDispatch } from "store/hooks";

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone_no: "",
  subject: "",
  message: ""
};

const ContactUs = ({contact, id}:any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initialForm);
  // console.log("from data...", formData);
  const [isNumberValid, setIsNumberValid] = useState(false);
  // console.log({isNumberValid});

  const handleChangeFormData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const removePrefix = (input:string, prefix:string) => {
    if(input.startsWith(prefix)) {
      return input.slice(prefix.length);
    } else if(input.startsWith('0')) {
      return input.slice(1);
    }
    return input;
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, phone_no: value }));
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
      if(isNumberValid) {
        if(
          formData?.first_name !== "" && formData?.first_name?.trim() !== "" &&
          formData?.last_name !== "" && formData?.last_name?.trim() !== "" &&
          formData?.email !== "" && formData?.email?.trim() !== "" &&
          formData?.phone_no !== "" && formData?.phone_no?.trim() !== "" &&
          formData?.subject !== "" && formData?.subject?.trim() !== "" &&
          formData?.message !== "" && formData?.message?.trim() !== ""
        ) {
          const result = await dispatch(contactFormThunk(formData)).unwrap();
          toast.success(result?.message);
          setFormData(initialForm);
        } else {
          toast.warning("Inputs cannot be empty");
        }
      } else {
        toast.warning("Please enter a valid phone number");
      }
    } catch (error) {
      toast.error("Error submiting the form");
    }
  }


  return (
    <section className="w-full max-w-screen-2xl mx-auto px-16 py-14" id={id}>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-greenbase">Contact Us</h2>
        <p className="font-normal text-2xl mt-4">
          {contact?.content_description}
        </p>
      </div>
      <div className="flex gap-8 justify-center flex-col lg:flex-row">
        <form className="grid grid-rows-6 grid-cols-2 gap-y-2 gap-x-6" onSubmit={handleFormSubmit}>
          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              First Name<span className="text-[#ff0000]">*</span>
            </p>
            <input type="text" className="w-full  p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" required name="first_name" onChange={handleChangeFormData} value={formData?.first_name} />
          </div>
          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              Last Name<span className="text-[#ff0000]">*</span>
            </p>
            <input type="text" className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" required name="last_name" onChange={handleChangeFormData} value={formData?.last_name} />
          </div>

          <div className="row-span-1 col-span-2">
            <p className="font-normal text-base">
              Email Address<span className="text-[#ff0000]">*</span>
            </p>
            <input type="email" className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" required name="email" onChange={handleChangeFormData} value={formData?.email} />
          </div>

          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              Phone Number<span className="text-[#ff0000]">*</span>
            </p>
            <PhoneInput
              country={"us"}
              value={formData?.phone_no}
              onChange={(inputPhone, countryData, event, formattedValue) => {
                handlePhoneChange(inputPhone);
                if(countryData?.format?.length === formattedValue.length) {
                  const newValue = removePrefix(inputPhone, countryData?.dialCode);
                  if (newValue.startsWith('0')) {
                    setIsNumberValid(false);
                  } else {
                    setIsNumberValid(true);
                  }
                } else {
                  setIsNumberValid(false);
                }
              }}
              inputClass="!w-full !outline-none border !border-black/30 !bg-[#E7E8F4]"
              dropdownClass="peer"
              containerClass="relative !outline-none !w-full !border !border-[#E4E4E4] !rounded-[10px] !bg-[#E7E8F4]"
            />
          </div>
          <div className="row-span-1 col-span-1">
            <p className="font-normal text-base">
              Subject<span className="text-[#ff0000]">*</span>
            </p>
            <input type="text" className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none" required name="subject" onChange={handleChangeFormData} value={formData?.subject} />
          </div>

          <div className="row-span-2 col-span-2">
            <p className="font-normal text-base">
              Please tell us how we can help
              <span className="text-[#ff0000]">*</span>
            </p>
            <textarea className="w-full p-2 border !border-black/30 bg-[#E7E8F4] rounded resize-none h-[8.3rem]" required name="message" onChange={handleChangeFormData} value={formData?.message} />
          </div>
          <button type="submit" className="flex justify-center row-span-1 col-span-2 h-[3.375rem]">
            <SmallButton placeholder="Submit" className="w-[47.5rem] text-white" />
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-8 items-center ">
          <div className="bg-white shadow-md flex items-center py-8 px-6 lg:px-12 gap-3  w-[300px] lg:w-full">
            <LuPhone size={28} />
            <div>
              <p className="text-greenbase font-bold text-base">CALL US</p>
              <p className="font-bold text-base underline !pb-2">{contact?.phone_no}</p>
            </div>
          </div>

          <div className="bg-white shadow-md flex items-center py-8 px-6 lg:px-12 gap-3   w-[300px] lg:w-full">
            <MdMailOutline size={28} />
            <div>
              <p className="text-greenbase font-bold text-base">EMAIL US</p>
              <p className="font-bold text-base underline !pb-2">
                {contact?.email}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md flex items-center py-8 px-6 lg:px-12 gap-3  w-[300px] lg:w-full">
            <IoLocationOutline size={30} />
            <div>
              <p className="text-greenbase font-bold text-base">ADDRESS</p>
              <p className="font-bold text-base">
                {contact?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
