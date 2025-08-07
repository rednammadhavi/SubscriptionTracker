import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createSubscription,
    updateSubscription,
    getSubscriptionById,
} from "../Api/subscription";
import Button from "../components/Button";
import ToastService from "../utils/toast";

const AddEditSubscription = ({ isEdit = false }) => {
    const [form, setForm] = useState({
        name: "",
        cost: "",
        cycle: "monthly",
        startDate: "",
        reminderMode: "email",
        category: "Other",
    });

    const [loading, setLoading] = useState(isEdit); // show loader only on edit mode
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscription = async () => {
            if (isEdit && id) {
                try {
                    const res = await getSubscriptionById(id);
                    const data = res.data;

                    // Safely populate fields, format date properly
                    setForm({
                        name: data.name || "",
                        cost: data.cost || "",
                        cycle: data.cycle || "monthly",
                        startDate: data.startDate?.slice(0, 10) || "",
                        reminderMode: data.reminderMode || "email",
                        category: data.category || "Other",
                    });
                } catch (err) {
                    ToastService.error("Failed to load subscription.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchSubscription();
    }, [id, isEdit]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateSubscription(id, form);
                ToastService.success("Subscription updated successfully!");
            } else {
                await createSubscription(form);
                ToastService.success("Subscription added successfully!");
            }
            navigate("/");
        } catch {
            ToastService.error("Something went wrong.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-500">
                Loading subscription details...
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {isEdit ? "Edit Subscription" : "Add Subscription"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Subscription Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                {/* Cost */}
                <input
                    type="number"
                    name="cost"
                    placeholder="Cost (₹)"
                    value={form.cost}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                {/* Start Date */}
                <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                {/* Cycle */}
                <select
                    name="cycle"
                    value={form.cycle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>

                {/* Reminder Mode */}
                <select
                    name="reminderMode"
                    value={form.reminderMode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                </select>

                {/* Category */}
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="Entertainment">Entertainment</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Streaming">Streaming</option>
                    <option value="Utilities">Utilities</option>
                    <option value="News">News</option>
                    <option value="Other">Other</option>
                </select>

                {/* Submit */}
                <Button
                    type="submit"
                    text={isEdit ? "Update Subscription" : "Add Subscription"}
                    className="w-full"
                />
            </form>
        </div>
    );
};

export default AddEditSubscription;
