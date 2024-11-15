import React from 'react';

type SmallButtonProps = {
    placeholder: string;
    className?: string; 
};

export const SmallButton: React.FC<SmallButtonProps> = ({ placeholder, className }) => {
    return (
        <button className={`max-md:px-2 max-md:py-1 md:px-4 md:py-2 rounded-md bg-greenbase ${className}`}>
            {placeholder}
        </button>
    );
};
