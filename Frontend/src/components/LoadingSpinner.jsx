import React from 'react';

const LoadingSpinner = ({
    size = 32,
    thickness = 3,
    color = 'border-blue-600',
}) => {
    const pixelSize = `${size}px`;
    const borderClass = `border-${thickness}`;

    return (
        <div
            className="flex items-center justify-center p-4"
            role="status"
            aria-label="Loading"
        >
            <div
                className={`animate-spin rounded-full border-t-transparent ${color}`}
                style={{
                    width: pixelSize,
                    height: pixelSize,
                    borderWidth: thickness,
                    borderStyle: 'solid',
                }}
            />
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default LoadingSpinner;