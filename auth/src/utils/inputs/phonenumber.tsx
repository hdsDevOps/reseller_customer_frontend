import React, { useState } from "react";
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
  const showLabel = phoneNumber != null && phoneNumber.length > 0;

  const handleChange = (value: string | undefined) => {
    setPhoneNumber(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="w-full flex items-center justify-start border-2 border-gray-300 rounded-[10px] p-[5px]">
        <div className="flex items-center justify-center">
          <PhoneInput
            defaultCountry={defaultCountry}
            value={phoneNumber}
            onChange={handleChange}
            inputProps={{ required: true }}
            inputStyle={{
              width: "100%",
              outline: "none",
              border: "none", 
            }}
            countrySelectorStyleProps={{
              style: {
                border: "none",
              },
              buttonStyle: {
                width: "3.5rem",
                borderRadius: "10px",
                border: "none",
                marginRight: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
            className="w-full"
          />
        </div>
        {showLabel && (
          <label
            htmlFor="phoneNumber"
            className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
          >
            {placeholder}
          </label>
        )}
      </div>
    </div>
  );
};
