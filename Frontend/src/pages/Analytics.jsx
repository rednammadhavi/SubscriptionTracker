import React, { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";

const Analytics = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getAnalytics().then((res) => setData(res.data));
    }, []);

    if (!data) return <p>Loading analytics...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
            <div className="bg-gray-100 p-4 rounded mb-6">
                <p>Total Monthly Cost: <strong>₹{data.monthlyTotal.toFixed(2)}</strong></p>
            </div>
            <h3 className="font-semibold mb-2">Category Breakdown</h3>
            <ul className="list-disc ml-6">
                {Object.entries(data.categoryBreakdown).map(([category, value]) => (
                    <li key={category}>
                        {category}: ₹{value.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Analytics;
