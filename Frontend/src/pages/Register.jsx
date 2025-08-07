import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../Api/auth';
import { Eye, EyeOff, UserRound } from 'lucide-react';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await register(form);
            navigate('/login', {
                state: { message: 'Registration successful! Please log in.' },
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[83vh] bg-gradient-to-br from-indigo-100 to-indigo-300 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <UserRound className="h-12 w-12 text-indigo-600 mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
                    <p className="text-sm text-gray-500 mt-1">Join us and get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-gray-700">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

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

                    {error && <Alert message={error} type="error" />}

                    {/* Submit */}
                    <div className="pt-2">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <Button
                                text="Register"
                                type="submit"
                                className="w-full !bg-indigo-600 hover:!bg-indigo-700"
                            />
                        )}
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:underline"
                    >
                        LogIn
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
