import React from 'react';

export default function Modal({ title, isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✕</button>
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
}
