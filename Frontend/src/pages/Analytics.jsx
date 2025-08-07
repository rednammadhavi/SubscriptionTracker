import React, { useEffect, useState } from "react";
import API from "../Api/api";
import ToastService from "../utils/toast";
import CircularProgressBar from "../components/CircularProgressBar";
import LineProgressBar from "../components/LineProgressBar";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Analytics = () => {
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const res = await API.get("/subscriptions");
                setSubs(res.data || []);
            } catch {
                ToastService.error("Failed to fetch subscriptions.");
            }
        };
        fetchSubs();
    }, []);

    const now = new Date();

    // Function to calculate next billing date
    const getNextBillingDate = (startDate, cycle) => {
        const date = new Date(startDate);
        while (date < now) {
            if (cycle === "Monthly") {
                date.setMonth(date.getMonth() + 1);
            } else if (cycle === "Yearly") {
                date.setFullYear(date.getFullYear() + 1);
            } else {
                break;
            }
        }
        return date;
    };

    // Enrich subscriptions with billing dates
    const enrichedSubs = subs
        .filter((s) => !s.isDeleted)
        .map((s) => {
            const nextBillingDate = getNextBillingDate(s.startDate, s.cycle);
            const isExpired = nextBillingDate < now;
            const isUpcoming = nextBillingDate - now < 7 * 24 * 60 * 60 * 1000 && nextBillingDate >= now;

            return {
                ...s,
                nextBillingDate,
                isExpired,
                isUpcoming,
            };
        });

    const total = enrichedSubs.length;
    const expired = enrichedSubs.filter((s) => s.isExpired);
    const active = enrichedSubs.filter((s) => !s.isExpired);
    const upcoming = enrichedSubs.filter((s) => s.isUpcoming);

    const totalSpent = enrichedSubs.reduce((acc, s) => acc + (s.cost || 0), 0);

    const packSpending = {};
    enrichedSubs.forEach((s) => {
        const name = s.name || "Unnamed";
        packSpending[name] = (packSpending[name] || 0) + (s.cost || 0);
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscription Analytics</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-white">
                {/* Subscriptions Count */}
                <div className="bg-indigo-600 p-6 rounded-xl shadow">
                    <h3 className="text-lg font-bold mb-2">Subscriptions</h3>
                    <p>Active: {active.length}</p>
                    <p>Expired: {expired.length}</p>
                    <p>Upcoming: {upcoming.length}</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <CircularProgressBar
                            percentage={((active.length / total) * 100).toFixed(0)}
                            color="green"
                        />
                        <CircularProgressBar
                            percentage={((expired.length / total) * 100).toFixed(0)}
                            color="red"
                        />
                    </div>
                </div>

                {/* Spending */}
                <div className="bg-gray-800 p-6 rounded-xl shadow">
                    <h3 className="text-lg font-bold mb-2">Total Spending</h3>
                    <div className="text-yellow-300 flex items-center text-3xl font-semibold mb-2">
                        <CurrencyRupeeIcon className="mr-1" /> {totalSpent}
                    </div>
                    <p className="text-sm text-gray-400">Across all plans</p>
                </div>

                {/* Upcoming Renewals */}
                <div className="bg-purple-600 p-6 rounded-xl shadow overflow-y-auto max-h-[300px]">
                    <h3 className="text-lg font-bold mb-2">Upcoming Renewals</h3>
                    {upcoming.length > 0 ? (
                        upcoming.map((s) => (
                            <div key={s._id} className="text-sm text-white mb-1">
                                • {s.name} – ₹{s.cost} on{" "}
                                {new Date(s.nextBillingDate).toLocaleDateString()}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-200">No upcoming renewals</p>
                    )}
                </div>
            </div>

            {/* Spending by Plan Name */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Spending by Plan</h3>
                {Object.entries(packSpending).map(([name, cost]) => {
                    const pct = ((cost / totalSpent) * 100).toFixed(0);
                    return (
                        <LineProgressBar
                            key={name}
                            label={name}
                            percentage={pct}
                            lineColor="#6366f1" // Tailwind Indigo-500
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Analytics;
