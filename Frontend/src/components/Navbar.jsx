import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        API.get('/auth/me').then(res => setUser(res.data)).catch(() => navigate('/login'));
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 p-4 text-white flex justify-between">
            <div className="font-bold">SubsTracker</div>
            {user && (
                <div className="space-x-4">
                    <Link to="/">Home</Link>
                    <Link to="/analytics">Analytics</Link>
                    <Link to="/settings">Settings</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </nav>
    );
}
