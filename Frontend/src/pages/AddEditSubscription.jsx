import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createSubscription,
    updateSubscription,
    getSubscriptionById,
} from "../services/subscriptionService";
import Button from "../components/Button";
import ToastService from "../utils/toastService";

const AddEditSubscription = ({ isEdit = false }) => {
    const [form, setForm] = useState({
        name: "",
        cost: "",
        cycle: "monthly",
        startDate: "",
        reminderMode: "email",
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit && id) {
            getSubscriptionById(id).then((res) => setForm(res.data));
        }
    }, [id, isEdit]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            isEdit
                ? await updateSubscription(id, form)
                : await createSubscription(form);
            ToastService.success(`Subscription ${isEdit ? "updated" : "added"}`);
            navigate("/");
        } catch {
            ToastService.error("Something went wrong.");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Edit Subscription" : "Add Subscription"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "cost", "startDate"].map((field) => (
                    <input
                        key={field}
                        type={field === "cost" ? "number" : field === "startDate" ? "date" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                ))}
                <select
                    name="cycle"
                    value={form.cycle}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <select
                    name="reminderMode"
                    value={form.reminderMode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                </select>
                <Button type="submit" text={isEdit ? "Update" : "Add"} className="w-full" />
            </form>
        </div>
    );
};

export default AddEditSubscription;
