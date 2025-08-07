import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../Api/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-[83vh] bg-gradient-to-br from-indigo-100 to-indigo-300 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
                        🔐
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3">
                        Log In to Your Account
                    </h2>
                </div>

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

                    {/* Password with toggle */}
                    <div>
                        <label className="block mb-1 text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>

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
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
