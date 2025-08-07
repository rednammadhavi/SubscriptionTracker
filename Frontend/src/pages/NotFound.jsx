import React from "react";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 px-4 text-center">
            <ErrorOutlineIcon className="text-red-500 text-6xl mb-4" />
            <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
                <ArrowBackIcon className="text-white" />
                Go Back to Dashboard
            </Link>
        </div>
    );
}

export default NotFound
