import React from "react";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface PhoneNumberInputProps {
  placeholder: string;
  className?: string;
  defaultCountry?: string;
  onChange?: (value: string | undefined) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  placeholder,
  className,
  defaultCountry = "ind",
  onChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("+91");
  const showlabel = phoneNumber != null && phoneNumber.length > 0;

  const handleChange = (value: string | undefined) => {
    setPhoneNumber(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`relative flex justify-center !m-0 ${className}`}>
      <PhoneInput
        defaultCountry={defaultCountry}
        value={phoneNumber}
        onChange={handleChange}
        inputProps={{ required: true }}
        inputStyle={{
          width: "34.063rem",
          height: "3.5rem",
          borderRadius: "1rem",
          borderTopLeftRadius: "0rem",
          borderBottomLeftRadius: "0rem",
        }}
        countrySelectorStyleProps={{
          style: {
            height: "3.5rem",
          },
          buttonStyle: {
            height: "3.5rem",
            width: "3.5rem",
            borderRadius: "1rem",
            borderTopRightRadius: "0rem",
            borderBottomRightRadius: "0rem",
          },
        }}
        className="h-full md:w-[37.163rem] w-[20rem]"
      />
      {showlabel && (
        <span className="absolute md:left-[8rem] lg:left-[11rem] xl:left-1 left-1 -top-3 text-base text-black text-opacity-80 mx-6 px-2 transition duration-200 input-text bg-white">
          {placeholder}
        </span>
      )}
    </div>
  );
};