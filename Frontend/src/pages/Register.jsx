import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../Api/auth';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                    />
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

                    {error && <Alert message={error} type="error" />}

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
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
