import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddSubscription = () => {
    const [form, setForm] = useState({
        name: '', cost: '', cycle: 'monthly', startDate: '', reminderMode: 'email',
    });

    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/subscriptions', form);
        navigate('/');
    };

    return (
        <div className="p-6">
            <h2 className="text-xl mb-4">Add Subscription</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
                <input name="cost" type="number" placeholder="Cost" onChange={handleChange} className="w-full p-2 border" />
                <select name="cycle" onChange={handleChange} className="w-full p-2 border">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <input name="startDate" type="date" onChange={handleChange} className="w-full p-2 border" />
                <select name="reminderMode" onChange={handleChange} className="w-full p-2 border">
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white p-2">Add</button>
            </form>
        </div>
    );
};

export default AddSubscription;
