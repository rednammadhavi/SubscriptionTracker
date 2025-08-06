import React, { useEffect, useState } from "react";
import API from "../services/api";
import Button from "../components/Button";
import ToastService from "../utils/toastService";

const Settings = () => {
    const [form, setForm] = useState({ name: "", email: "", alertMode: "email" });

    useEffect(() => {
        API.get("/auth/me").then((res) => setForm(res.data));
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        try {
            await API.put("/auth/settings", form);
            ToastService.success("Updated successfully!");
        } catch {
            ToastService.error("Failed to update settings.");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border mb-3"
            />
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border mb-3"
            />
            <select
                name="alertMode"
                value={form.alertMode}
                onChange={handleChange}
                className="w-full p-2 border mb-3"
            >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
            </select>
            <Button text="Save Changes" onClick={handleSave} />
        </div>
    );
};

export default Settings;
