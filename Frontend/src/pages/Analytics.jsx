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

    const getNextBillingDate = (startDate, cycle) => {
        const date = new Date(startDate);
        while (date < now) {
            if (cycle === "Monthly") date.setMonth(date.getMonth() + 1);
            else if (cycle === "Yearly") date.setFullYear(date.getFullYear() + 1);
            else break;
        }
        return date;
    };

    const enrichedSubs = subs
        .filter((s) => !s.isDeleted)
        .map((s) => {
            const nextBillingDate = getNextBillingDate(s.startDate, s.cycle);
            return {
                ...s,
                nextBillingDate,
                isExpired: nextBillingDate < now,
                isUpcoming:
                    nextBillingDate - now < 7 * 24 * 60 * 60 * 1000 &&
                    nextBillingDate >= now,
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
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscription Analytics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Subscription Breakdown */}
                <div className="bg-indigo-600 text-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-2">Subscriptions</h3>
                    <p>Active: {active.length}</p>
                    <p>Expired: {expired.length}</p>
                    <p>Upcoming: {upcoming.length}</p>
                    <div className="flex justify-center gap-4 mt-5">
                        <CircularProgressBar percentage={((active.length / total) * 100).toFixed(0)} color="#10B981" />
                        <CircularProgressBar percentage={((expired.length / total) * 100).toFixed(0)} color="#EF4444" />
                    </div>
                </div>

                {/* Spending */}
                <div className="bg-gray-900 text-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-2">Total Spending</h3>
                    <div className="flex items-center text-yellow-300 text-3xl font-semibold mb-2">
                        <CurrencyRupeeIcon className="mr-1" /> {totalSpent}
                    </div>
                    <p className="text-sm text-gray-400">Across all plans</p>
                </div>

                {/* Upcoming Renewals */}
                <div className="bg-purple-700 text-white p-6 rounded-xl shadow hover:shadow-lg transition max-h-[300px] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-2">Upcoming Renewals</h3>
                    {upcoming.length > 0 ? (
                        upcoming.map((s) => (
                            <div key={s._id} className="text-sm mb-2 border-b border-white/20 pb-1">
                                • <span className="font-medium">{s.name}</span> – ₹{s.cost} on{" "}
                                {new Date(s.nextBillingDate).toLocaleDateString()}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-200">No upcoming renewals</p>
                    )}
                </div>
            </div>

            {/* Spending by Plan */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Plan</h3>
                {Object.entries(packSpending).map(([name, cost]) => {
                    const pct = ((cost / totalSpent) * 100).toFixed(0);
                    return (
                        <LineProgressBar
                            key={name}
                            label={name}
                            percentage={pct}
                            lineColor="#6366f1"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Analytics;
