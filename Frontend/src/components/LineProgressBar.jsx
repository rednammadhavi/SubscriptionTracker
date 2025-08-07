import React from "react";

const LineProgressBar = ({
    label,
    percentage,
    lineColor = "#3b82f6",
    height = 12,
    textColor = "#374151",
}) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: textColor }}>
                    {label}
                </span>
                <span className="text-sm font-medium text-gray-500">{percentage}%</span>
            </div>
            <div
                className="w-full bg-gray-200 rounded-full overflow-hidden"
                style={{ height }}
            >
                <div
                    className="rounded-full transition-all duration-700 ease-in-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: lineColor,
                        height: "100%",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default LineProgressBar;
