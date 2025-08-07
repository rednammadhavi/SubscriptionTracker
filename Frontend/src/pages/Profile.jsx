import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
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
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-200 to-blue-100">
                <div className="text-gray-600 text-lg">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 flex flex-col h-full">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                        {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">Your profile details</p>
                </div>

                {/* Profile Content */}
                <div className="flex-1 overflow-auto">
                    {!editMode ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <div className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800">
                                    {user.email}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Alert Mode</label>
                                <div className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800 capitalize">
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

                {/* Logout */}
                <div className="pt-6 mt-8 border-t flex justify-end">
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-red-600 text-white hover:bg-red-700 p-2 rounded-full font-medium flex items-center gap-1"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
