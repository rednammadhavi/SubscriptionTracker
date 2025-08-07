import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/api";
import Button from "../components/Button";
import ToastService from "../utils/toast";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", alertMode: "email" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/auth/me");
                setUser(res.data);
                setForm({
                    name: res.data.name || "",
                    email: res.data.email || "",
                    alertMode: res.data.alertMode || "email",
                });
            } catch {
                ToastService.error("Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        try {
            const res = await API.put("/auth/settings", form);
            setUser(res.data || form);
            setEditMode(false);
            ToastService.success("Profile updated!");
        } catch {
            ToastService.error("Failed to update profile.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-gray-600 text-lg">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                {/* Avatar & Name */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
                            {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                            <p className="text-sm text-gray-500">Account Information</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:underline font-medium"
                    >
                        Logout
                    </button>
                </div>

                {/* Profile View/Edit */}
                {!editMode ? (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-500">Email</label>
                            <div className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-800">
                                {user.email}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Alert Mode</label>
                            <div className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-800 capitalize">
                                {user.alertMode || "email"}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button text="Edit Profile" onClick={() => setEditMode(true)} />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-500">Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Alert Mode</label>
                            <select
                                name="alertMode"
                                value={form.alertMode}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                            </select>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button text="Cancel" onClick={() => setEditMode(false)} />
                            <Button text="Save Changes" onClick={handleSave} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
