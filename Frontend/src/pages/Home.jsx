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
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
            {/* Hero Section */}
            <section className="flex-1 max-w-7xl mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
                    Manage Your Subscriptions Smarter
                </h1>
                <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                    Effortlessly track, analyze, and control your recurring expenses.
                </p>
                {user ? (
                    <Link
                        to="/dashboard"
                        className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/register"
                            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="bg-white border-t py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Why Choose Subscription Tracker?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow transition-shadow"
                            >
                                <CheckCircle className="text-indigo-600 mt-1 shrink-0" />
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 text-sm text-gray-500 border-t mt-auto">
                © {new Date().getFullYear()} SubscriptionTracker. Built with ❤️ by Rednam Madhavi.
            </footer>
        </div>
    );
};

export default Home;
