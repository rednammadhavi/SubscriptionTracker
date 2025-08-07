import React, { useEffect, useState } from "react";
import ToastService from "../utils/toast";
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";

const toastStyles = {
    success: {
        bg: "bg-green-600",
        icon: <CheckCircleIcon className="w-5 h-5 text-white" />,
    },
    error: {
        bg: "bg-red-600",
        icon: <XCircleIcon className="w-5 h-5 text-white" />,
    },
    info: {
        bg: "bg-blue-600",
        icon: <InformationCircleIcon className="w-5 h-5 text-white" />,
    },
    warning: {
        bg: "bg-yellow-500",
        icon: <ExclamationCircleIcon className="w-5 h-5 text-white" />,
    },
};

const Toast = () => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        ToastService.subscribe(setToast);
    }, []);

    useEffect(() => {
        if (toast) {
            const timeout = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [toast]);

    if (!toast) return null;

    const { message, type = "info" } = typeof toast === "string" ? { message: toast } : toast;
    const style = toastStyles[type] || toastStyles.info;

    return (
        <div className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-in-out`}>
            <div
                className={`flex items-center gap-3 text-white px-4 py-3 rounded-lg shadow-md w-[280px] sm:w-auto ${style.bg}`}
                role="alert"
            >
                <div>{style.icon}</div>
                <div className="flex-1 text-sm">{message}</div>
                <button onClick={() => setToast(null)} className="focus:outline-none">
                    <XMarkIcon className="w-4 h-4 text-white hover:text-gray-200" />
                </button>
            </div>
        </div>
    );
}

export default Toast;
