// src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../services/analyticsService';

const Analytics = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getAnalytics().then(res => setData(res.data));
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <p className="mb-2">Total Monthly Cost: ₹{data.monthlyTotal.toFixed(2)}</p>
            <h3 className="font-semibold">By Category:</h3>
            <ul className="list-disc ml-6">
                {Object.entries(data.categoryBreakdown).map(([cat, amt]) => (
                    <li key={cat}>{cat}: ₹{amt.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Analytics;
