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

    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscription = async () => {
            if (isEdit && id) {
                try {
                    const res = await getSubscriptionById(id);
                    const data = res.data;

                    setForm({
                        name: data.name || "",
                        cost: data.cost || "",
                        cycle: data.cycle || "monthly",
                        startDate: data.startDate ? data.startDate.slice(0, 10) : "",
                        reminderMode: data.reminderMode || "email",
                        category: data.category || "Other",
                    });

                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching subscription:", error);
                    ToastService.error("Failed to load subscription.");
                    setLoading(false);
                }
            }
        };

        fetchSubscription();
    }, [id, isEdit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (isEdit) {
                await updateSubscription(id, form);
                ToastService.success("Subscription updated successfully!");
            } else {
                await createSubscription(form);
                ToastService.success("Subscription added successfully!");
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Error submitting subscription:", error);
            ToastService.error("Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-600 text-lg">
                Loading subscription details...
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                {isEdit ? "Edit Subscription" : "Add Subscription"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Subscription Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                        Cost (₹)
                    </label>
                    <input
                        id="cost"
                        name="cost"
                        type="number"
                        value={form.cost}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cycle" className="block text-sm font-medium text-gray-700 mb-1">
                        Billing Cycle
                    </label>
                    <select
                        id="cycle"
                        name="cycle"
                        value={form.cycle}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="reminderMode" className="block text-sm font-medium text-gray-700 mb-1">
                        Reminder Mode
                    </label>
                    <select
                        id="reminderMode"
                        name="reminderMode"
                        value={form.reminderMode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Entertainment">Entertainment</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Streaming">Streaming</option>
                        <option value="Utilities">Utilities</option>
                        <option value="News">News</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <Button
                    type="submit"
                    text={submitting ? "Please wait..." : isEdit ? "Update Subscription" : "Add Subscription"}
                    className="w-full"
                    disabled={submitting}
                />
            </form>
        </div>
    );
};

export default AddEditSubscription;
