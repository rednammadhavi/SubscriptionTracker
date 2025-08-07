import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../Api/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message || '';

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Email and password are required.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Log In to Your Account
                </h2>

                {successMessage && <Alert message={successMessage} type="success" />}
                {error && <Alert message={error} type="error" />}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <div className="pt-2">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <Button
                                text="Log In"
                                type="submit"
                                className="w-full !bg-indigo-600 hover:!bg-indigo-700"
                            />
                        )}
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don’t have an account?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
