import React from 'react';

export default function Input({ label, name, type = 'text', value, onChange }) {
    return (
        <div className="mb-4">
            <label className="block mb-1 text-gray-700">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full border rounded p-2"
            />
        </div>
    );
}
