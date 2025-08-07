import React, { useEffect, useState } from "react";
import {
    getDeletedSubscriptions,
    restoreSubscription,
    deleteSubscriptionPermanently,
} from "../Api/subscription";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ToastService from "../utils/toast";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">🗑️ Trash</h1>

            {trash.length === 0 ? (
                <p className="text-gray-600 text-center mt-20">No deleted subscriptions found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {trash.map((sub) => (
                        <div
                            key={sub._id}
                            className="bg-white border border-gray-200 rounded-lg p-5 shadow-md transition-transform hover:scale-[1.01]"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">{sub.name}</h2>
                            <p className="text-gray-700 mt-1">
                                ₹{sub.cost} / {sub.cycle}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Deleted on: {new Date(sub.updatedAt).toLocaleDateString()}
                            </p>
                            <div className="flex gap-3 mt-4">
                                <Button
                                    text={
                                        <span className="flex items-center gap-1">
                                            <RestoreIcon fontSize="small" /> Restore
                                        </span>
                                    }
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleRestore(sub._id)}
                                />
                                <Button
                                    text={
                                        <span className="flex items-center gap-1">
                                            <DeleteForeverIcon fontSize="small" /> Delete
                                        </span>
                                    }
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => setConfirm({ id: sub._id, name: sub.name })}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={!!confirm}
                title="Confirm Permanent Deletion"
                onClose={() => setConfirm(null)}
            >
                <p className="text-gray-700">
                    Are you sure you want to permanently delete{" "}
                    <span className="font-semibold">"{confirm?.name}"</span>?
                </p>
                <div className="flex justify-end gap-2 mt-6">
                    <Button text="Cancel" onClick={() => setConfirm(null)} />
                    <Button
                        text={
                            <span className="flex items-center gap-1">
                                <DeleteForeverIcon fontSize="small" />
                                Delete
                            </span>
                        }
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handlePermanentDelete}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Trash;
