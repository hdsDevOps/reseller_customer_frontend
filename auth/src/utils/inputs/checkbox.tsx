import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import { IoMdCheckmark } from "react-icons/io";

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  const [isSelected, setIsSelected] = useState(checked);

  useEffect(() => {
    setIsSelected(checked);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsSelected(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="flex flex-col gap-2 items-start relative">
      <Checkbox
        isSelected={isSelected}
        onChange={handleChange}
        className="w-6 h-6 bg-transparent border border-black rounded-md"
        style={{
          borderColor: isSelected ? "green" : "black",
        }}
      />
      <p className="absolute flex top-0.5 left-0.5">
        {isSelected && <IoMdCheckmark fill="green" size={18} />}
      </p>
    </div>
  );
};

export default CheckBox;
