import React, { useEffect, useState } from "react";
import {
    getDeletedSubscriptions,
    restoreSubscription,
    deleteSubscriptionPermanently
} from "../Api/subscription";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ToastService from "../utils/toast";

const Trash = () => {
    const [trash, setTrash] = useState([]);
    const [confirm, setConfirm] = useState(null); // { id, name }

    const fetchTrash = async () => {
        try {
            const res = await getDeletedSubscriptions();
            setTrash(res.data);
        } catch {
            ToastService.error("Failed to load trash");
        }
    };

    const handleRestore = async (id) => {
        try {
            await restoreSubscription(id);
            ToastService.success("Restored successfully");
            fetchTrash();
        } catch {
            ToastService.error("Failed to restore");
        }
    };

    const handlePermanentDelete = async () => {
        try {
            await deleteSubscriptionPermanently(confirm.id);
            ToastService.success("Deleted permanently");
            setConfirm(null);
            fetchTrash();
        } catch {
            ToastService.error("Failed to delete permanently");
        }
    };

    useEffect(() => {
        fetchTrash();
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Trash</h1>
            {trash.length === 0 ? (
                <p>No deleted subscriptions.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {trash.map((sub) => (
                        <div key={sub._id} className="border rounded p-4 shadow-sm">
                            <h2 className="text-lg font-semibold">{sub.name}</h2>
                            <p className="text-gray-700 mb-1">₹{sub.cost} / {sub.cycle}</p>
                            <p className="text-sm text-gray-500 mb-2">Deleted on: {new Date(sub.updatedAt).toLocaleDateString()}</p>
                            <div className="flex gap-2">
                                <Button text="Restore" className="bg-green-600" onClick={() => handleRestore(sub._id)} />
                                <Button text="Delete" className="bg-red-500" onClick={() => setConfirm({ id: sub._id, name: sub.name })} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={!!confirm} title="Confirm Permanent Delete" onClose={() => setConfirm(null)}>
                <p>Are you sure you want to permanently delete "{confirm?.name}"?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button text="Cancel" onClick={() => setConfirm(null)} />
                    <Button text="Delete" className="bg-red-600" onClick={handlePermanentDelete} />
                </div>
            </Modal>
        </div>
    );
};

export default Trash;
