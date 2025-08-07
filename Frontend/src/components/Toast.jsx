import React, { useEffect, useState } from "react";
import ToastService from "../utils/toast";

export default function Toast() {
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

    return (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white py-2 px-4 rounded shadow z-50">
            {toast}
        </div>
    );
}
