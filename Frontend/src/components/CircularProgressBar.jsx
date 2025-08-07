import React from "react";

const CircularProgressBar = ({ percentage, color }) => {
    return (
        <div className="relative w-16 h-16">
            <svg className="w-full h-full">
                <circle cx="50%" cy="50%" r="25%" fill="transparent" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                    cx="50%"
                    cy="50%"
                    r="25%"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="8"
                    strokeDasharray="157"
                    strokeDashoffset={157 - (157 * percentage) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                {percentage}%
            </div>
        </div>
    );
};
export default CircularProgressBar;
