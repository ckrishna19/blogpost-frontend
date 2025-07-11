import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-xl w-full max-w-lg p-4 relative">
        <button onClick={onClose} className="ml-auto cursor-pointer">
          <IoCloseCircleOutline size={30} />
        </button>
        <div className="block mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
