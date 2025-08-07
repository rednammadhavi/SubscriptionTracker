import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ title, isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-300"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Modal
