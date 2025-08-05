import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-3 p-2 border" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-3 p-2 border" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
            </form>
        </div>
    );
};

export default Login;
