// components/Modal.js
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <div className=" fixed overflow-x-hidden overflow-y-auto outline-nonefixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-500 font-poppins">
            <div className="relative  w-[700px] bg-transparent ">
                <div className="">{children}</div>
                {/* <button
                    className="absolute top-0 right-0 mt-3 mr-4 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center
                     text-black bg-transparent hover:bg-gray-200 hover:text-gray-900"
                    onClick={onClose}
                >
                    <svg
                        className="w-3 h-3 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                   
                </button> */}
            </div>
        </div>
    );
};

export default Modal;
