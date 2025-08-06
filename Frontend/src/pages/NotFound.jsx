import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">Page not found</p>
            <Link to="/" className="text-blue-600 hover:underline">Go back to dashboard</Link>
        </div>
    );
}
