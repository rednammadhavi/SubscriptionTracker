import React from 'react';

const Input = ({
    label,
    name,
    id,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    required = false,
    disabled = false,
    className = '',
}) => {
    const inputId = id || name;

    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block mb-1 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`
          w-full px-3 py-2
          border rounded-md
          text-sm text-gray-900
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition duration-150 ease-in-out
          ${className}
        `}
            />
        </div>
    );
}

export default Input;
