import React from 'react';

type SmallButtonProps = {
    placeholder: string;
    className?: string; 
};

export const SmallButton: React.FC<SmallButtonProps> = ({ placeholder, className }) => {
    return (
        <button className={`px-4 py-2 rounded-md bg-greenbase ${className}`}>
            {placeholder}
        </button>
    );
};
