import React from 'react';
import {
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

const alertStyles = {
    info: {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        icon: <InformationCircleIcon className="w-5 h-5 text-blue-600" />,
    },
    success: {
        bg: 'bg-green-50',
        text: 'text-green-800',
        border: 'border-green-200',
        icon: <CheckCircleIcon className="w-5 h-5 text-green-600" />,
    },
    warning: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />,
    },
    error: {
        bg: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
        icon: <XCircleIcon className="w-5 h-5 text-red-600" />,
    },
};

const Alert = ({ message, type = 'info' }) => {
    const style = alertStyles[type] || alertStyles.info;

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-sm transition-all duration-300 ${style.bg} ${style.text} ${style.border} mt-4`}
            role="alert"
        >
            <div className="pt-1">{style.icon}</div>
            <div className="text-sm font-medium">{message}</div>
        </div>
    );
}

export default Alert;
