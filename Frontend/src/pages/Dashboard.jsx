import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptions, deleteSubscription } from "../Api/subscription";
import Modal from "../components/Modal";
import Button from "../components/Button";
import ToastService from "../utils/toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const [subs, setSubs] = useState([]);
    const [deleting, setDeleting] = useState(null);

    const fetchSubs = async () => {
        try {
            const res = await getSubscriptions();
            setSubs(res.data);
        } catch (err) {
            ToastService.error("Failed to fetch subscriptions");
        }
    };

    const confirmDelete = async () => {
        try {
            await deleteSubscription(deleting._id);
            setDeleting(null);
            ToastService.success("Subscription deleted");
            fetchSubs();
        } catch {
            ToastService.error("Failed to delete");
        }
    };

    useEffect(() => {
        fetchSubs();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Your Subscriptions</h1>
                <Button
                    text="+ Add Subscription"
                    onClick={() => navigate("/add")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                />
            </div>

            {/* Subscription Grid */}
            {subs.length === 0 ? (
                <div className="text-center text-gray-500 text-lg mt-20">
                    You have no subscriptions yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subs.map((sub) => (
                        <div
                            key={sub._id}
                            className="bg-white rounded-lg shadow-md border border-gray-200 p-5 transition hover:shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-xl font-semibold text-gray-800">{sub.name}</h2>
                                <span className="text-sm px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                                    {sub.cycle}
                                </span>
                            </div>
                            <p className="text-gray-700 text-lg mb-1 font-medium">₹{sub.cost}</p>
                            <p className="text-sm text-gray-500 mb-4">
                                Start Date:{" "}
                                {new Date(sub.startDate).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>

                            <div className="flex gap-3">
                                <Button
                                    text="Edit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white flex-1"
                                    onClick={() => navigate(`/edit/${sub._id}`)}
                                />
                                <Button
                                    text="Delete"
                                    className="bg-red-500 hover:bg-red-600 text-white flex-1"
                                    onClick={() => setDeleting(sub)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleting}
                title="Confirm Delete"
                onClose={() => setDeleting(null)}
            >
                <p className="text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">"{deleting?.name}"</span>?
                </p>
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        text="Cancel"
                        onClick={() => setDeleting(null)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                    />
                    <Button
                        text="Delete"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={confirmDelete}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;
