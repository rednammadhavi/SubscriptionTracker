import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Settings = () => {
    const [form, setForm] = useState({ name: '', email: '', alertMode: '' });

    useEffect(() => {
        API.get('/auth/me').then((res) => setForm(res.data));
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        await API.put('/user/settings', form);
        alert('Updated!');
    };

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">Settings</h2>
            <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border mb-3" />
            <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border mb-3" />
            <select name="alertMode" value={form.alertMode} onChange={handleChange} className="w-full p-2 border mb-3">
                <option value="email">Email</option>
                <option value="sms">SMS</option>
            </select>
            <button onClick={handleSave} className="bg-blue-500 text-white p-2">Save</button>
        </div>
    );
};

export default Settings;
