import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [subs, setSubs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/subscriptions')
            .then((res) => setSubs(res.data))
            .catch(() => navigate('/login'));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button onClick={() => navigate('/add')} className="bg-green-500 text-white p-2 mb-4">+ Add Subscription</button>
            <ul>
                {subs.map((sub) => (
                    <li key={sub._id} className="mb-2 border p-2 rounded">
                        {sub.name} - ₹{sub.cost} / {sub.cycle}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
