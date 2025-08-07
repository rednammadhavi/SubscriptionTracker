import React from "react";

const LineProgressBar = ({ label, percentage, lineColor }) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className="text-sm font-medium text-gray-500">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
            <div
                className="h-3 rounded-full"
                style={{ width: `${percentage}%`, backgroundColor: lineColor }}
            ></div>
        </div>
    </div>
);

export default LineProgressBar;
