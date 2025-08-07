import React from "react";

const CircularProgressBar = ({
    percentage = 0,
    color = "#3b82f6", // Tailwind blue-500
    size = 64,         // Default: 64px
    strokeWidth = 8,
    showText = true,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
            </svg>
            {showText && (
                <div
                    className="absolute inset-0 flex items-center justify-center text-sm font-semibold"
                    style={{ color }}
                >
                    {percentage}%
                </div>
            )}
        </div>
    );
};

export default CircularProgressBar;
