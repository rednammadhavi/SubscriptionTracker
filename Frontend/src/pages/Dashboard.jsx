import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscriptions, deleteSubscription } from "../services/subscriptionService";
import Modal from "../components/Modal";
import Button from "../components/Button";
import ToastService from "../utils/toastService";

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
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Your Subscriptions</h1>
                <Button text="+ Add" onClick={() => navigate("/add")} />
            </div>
            {subs.length === 0 ? (
                <p>No subscriptions found.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {subs.map((sub) => (
                        <div key={sub._id} className="border rounded p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">{sub.name}</h2>
                                <span className="text-sm text-gray-500">{sub.cycle}</span>
                            </div>
                            <p className="text-gray-700 mb-1">₹{sub.cost}</p>
                            <p className="text-xs text-gray-500 mb-2">
                                Start: {new Date(sub.startDate).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2">
                                <Button text="Edit" className="bg-yellow-500" onClick={() => navigate(`/edit/${sub._id}`)} />
                                <Button text="Delete" className="bg-red-500" onClick={() => setDeleting(sub)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Modal
                isOpen={!!deleting}
                title="Confirm Delete"
                onClose={() => setDeleting(null)}
            >
                <p>Are you sure you want to delete "{deleting?.name}"?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button text="Cancel" onClick={() => setDeleting(null)} />
                    <Button text="Delete" className="bg-red-500" onClick={confirmDelete} />
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;
