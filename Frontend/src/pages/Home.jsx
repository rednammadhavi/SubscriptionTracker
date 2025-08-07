import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";

const Home = () => {
    const { user } = useSelector((state) => state.users);

    const features = [
        "Track all your subscriptions in one place",
        "Get alerts before renewal",
        "Monthly and Yearly analytics",
        "Trash bin for deleted subscriptions",
        "Easy profile & settings management",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">
                    Subscription Tracker
                </h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-6">
                    Manage and track all your subscriptions effortlessly. Get alerts,
                    view analytics, and stay in control of your recurring expenses.
                </p>
                {user ? (
                    <Link
                        to="/dashboard"
                        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition"
                    >
                        Go to Dashboard
                    </Link>
                ) : (
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link
                            to="/register"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-600 hover:text-white transition"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="bg-white border-t py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                        Why use Subscription Tracker?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg border"
                            >
                                <CheckCircle className="text-indigo-600 mt-1" />
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-sm text-gray-500 border-t">
                © {new Date().getFullYear()} SubsTracker. Built with ❤️ by Rednam Madhavi.
            </footer>
        </div>
    );
};

export default Home;
