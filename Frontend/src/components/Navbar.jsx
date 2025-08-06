import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { getCurrentUser } from "../services/authService";
import { setUser } from "../redux/usersSlice";
import { setLoading } from "../redux/loadersSlice";

// Component for Logged-in Users
const AuthNav = ({ isMobile, onLinkClick }) => {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();

    const baseLink = "hover:text-indigo-400 transition duration-300";
    const mobileLink = "block py-2 text-lg";

    return (
        <>
            <Link to="/" onClick={onLinkClick} className={`${baseLink} ${isMobile ? mobileLink : ""}`}>Dashboard</Link>
            <Link to="/analytics" onClick={onLinkClick} className={`${baseLink} ${isMobile ? mobileLink : ""}`}>Analytics</Link>
            <Link to="/settings" onClick={onLinkClick} className={`${baseLink} ${isMobile ? mobileLink : ""}`}>Settings</Link>
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }}
                className={`text-red-400 hover:text-red-500 transition ${isMobile ? mobileLink : ""}`}
            >
                Logout
            </button>
            <div className="flex items-center gap-3 cursor-default text-white bg-indigo-500 px-3 py-1 rounded-full">
                <div className="h-8 w-8 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold uppercase">
                    {user?.name?.[0] || "U"}
                </div>
                <span>{user?.name}</span>
            </div>
        </>
    );
};

// Component for Guests
const GuestNav = ({ isMobile, onLinkClick }) => {
    const base = "px-4 py-1.5 rounded-full font-semibold transition";
    const login = "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white";
    const register = "bg-indigo-600 hover:bg-indigo-700 text-white";

    return (
        <>
            <Link to="/login" onClick={onLinkClick} className={`${base} ${login} ${isMobile ? "block text-center" : ""}`}>
                Login
            </Link>
            <Link to="/register" onClick={onLinkClick} className={`${base} ${register} ${isMobile ? "block text-center" : ""}`}>
                Register
            </Link>
        </>
    );
};

const Navbar = () => {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(setLoading(true));
                const res = await getCurrentUser();
                dispatch(setUser(res.data));
            } catch {
                dispatch(setUser(null));
                localStorage.removeItem("token");
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (localStorage.getItem("token") && !user) {
            fetchUser();
        }
    }, [dispatch, user]);

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
                    <span>SubsTracker</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {user ? <AuthNav /> : <GuestNav />}
                </nav>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-gray-800 focus:outline-none">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-100 border-t">
                    <nav className="flex flex-col items-center gap-4 px-4 py-4">
                        {user ? <AuthNav isMobile onLinkClick={toggleMenu} /> : <GuestNav isMobile onLinkClick={toggleMenu} />}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
