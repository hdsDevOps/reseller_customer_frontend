import React, { useState } from "react";
import { CirclePlus, Trash2 } from "lucide-react";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleSubmit = () => {
       onClose();
    setTimeout(() => {
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    
  );
};

export default Modal;
