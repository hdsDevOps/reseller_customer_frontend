import React from 'react';
import { IconType } from 'react-icons';

interface InputProps {
  placeholder: string;
  className?: string;
  icon?: IconType;
  iconColor?: string;
  iconSize?: string; 
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  className,
  icon: Icon,
  iconColor = '', 
  iconSize = '', 
  type = 'text',
  onChange,
  value = '',
}) => {
  return (
    <div className={`    w-full lg:w-1/2`}>
      <label htmlFor="customInput" className="relative w-full ">
        {Icon && (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            style={{ color: iconColor, fontSize: `${iconSize}px` }}
          >
            <Icon />
          </div>
        )}
        <input
          type={type}
          id="customInput"
          className={`h-14 w-full px-6 bg-transparent border rounded-2xl border-graybase border-opacity-50 outline-none focus:border-greenbase focus:text-black transition duration-200 ${
            Icon ? 'pl-12' : ''
          }`}
          value={value}
          onChange={onChange}
        />
        <span className="absolute left-0 top-4 text-base text-black text-opacity-80 mx-6 px-2 transition duration-200 input-text">
          {placeholder}
        </span>
      </label>
    </div>
  );
};

export default Input;
