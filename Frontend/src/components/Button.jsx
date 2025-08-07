import React from "react";

const Button = ({
    text,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        inline-flex items-center justify-center
        px-5 py-2.5
        text-sm font-medium
        rounded-lg
        shadow-sm
        transition duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${disabled
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"}
        ${className}
      `}
        >
            {text}
        </button>
    );
}

export default Button;
