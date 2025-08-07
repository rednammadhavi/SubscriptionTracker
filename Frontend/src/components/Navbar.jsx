import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { getCurrentUser } from "../Api/auth";
import { setUser } from "../redux/usersSlice";
import { setLoading } from "../redux/loadersSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                dispatch(setLoading(true));
                const res = await getCurrentUser();
                dispatch(setUser(res.data));
            } catch {
                localStorage.removeItem("token");
                dispatch(setUser(null));
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (localStorage.getItem("token") && !user) {
            fetchUser();
        }
    }, [dispatch, user]);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight flex items-end gap-0.5">
                    S<span className="text-sm font-normal">UBSCRIPTION</span>
                    T<span className="text-sm font-normal">RACKER</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-800 hover:text-indigo-600 transition">Dashboard</Link>
                            <Link to="/analytics" className="text-gray-800 hover:text-indigo-600 transition">Analytics</Link>
                            <Link to="/trash" className="text-gray-800 hover:text-indigo-600 transition">Trash</Link>
                            <Link to="/profile">
                                <div className="flex items-center gap-2 bg-indigo-600 text-white p-1 rounded-full hover:bg-indigo-700 transition">
                                    <div className="bg-white text-indigo-600 h-8 w-8 flex items-center justify-center rounded-full font-bold">
                                        {user?.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-1.5 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
                            >
                                LogIn
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="md:hidden text-gray-800"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96" : "max-h-0"
                    }`}
            >
                <nav className="flex flex-col gap-4 px-4 py-4 bg-gray-50 border-t">
                    {user ? (
                        <>
                            <Link to="/" className="text-lg" onClick={toggleMenu}>Dashboard</Link>
                            <Link to="/analytics" className="text-lg" onClick={toggleMenu}>Analytics</Link>
                            <Link to="/trash" className="text-lg" onClick={toggleMenu}>Trash</Link>
                            <Link to="/profile" className="text-lg" onClick={toggleMenu}>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                                        {user?.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                    <span className="text-indigo-700 font-medium">{user?.name || "User"}</span>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-lg w-full text-center py-1.5 border border-indigo-600 rounded" onClick={toggleMenu}>
                                LogIn
                            </Link>
                            <Link to="/register" className="text-lg w-full text-center py-1.5 bg-indigo-600 text-white rounded" onClick={toggleMenu}>
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
