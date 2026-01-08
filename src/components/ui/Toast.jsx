import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';
import useToastStore from '../../store/useToastStore';

const variants = {
    success: {
        icon: CheckCircle,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500',
        progressBarColor: 'bg-green-500',
        defaultTitle: 'Success',
    },
    error: {
        icon: XCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500',
        progressBarColor: 'bg-red-500',
        defaultTitle: 'Error',
    },
    warning: {
        icon: AlertCircle,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-500',
        progressBarColor: 'bg-orange-500',
        defaultTitle: 'Warning',
    },
};

const Toast = ({ id, type = 'success', title, message, duration = 3000 }) => {
    const removeToast = useToastStore((state) => state.removeToast);
    const [isExiting, setIsExiting] = useState(false);
    const variant = variants[type] || variants.success;
    const Icon = variant.icon;

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        // Wait for exit animation to finish before removing from store
        setTimeout(() => {
            removeToast(id);
        }, 300); // Match animation duration
    };

    return (
        <div
            className={`relative flex w-full max-w-[400px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300 ease-in-out pointer-events-auto
        ${isExiting ? 'animate-out fade-out slide-out-to-right-full' : 'animate-in slide-in-from-top-full fade-in'}
      `}
            role="alert"
        >
            {/* Main Content */}
            <div className="flex w-full p-4">
                {/* Icon */}
                <div className={`flex-shrink-0 ${variant.color}`}>
                    <Icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={`text-sm font-medium ${variant.color}`}>
                        {title || variant.defaultTitle}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {message}
                    </p>
                </div>

                {/* Close Button */}
                <div className="ml-4 flex flex-shrink-0">
                    <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleClose}
                    >
                        <span className="sr-only">Close</span>
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-100">
                <div
                    className={`h-full ${variant.progressBarColor}`}
                    style={{
                        animation: `shrink ${duration}ms linear forwards`,
                    }}
                />
                <style>{`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
            </div>
        </div>
    );
};

export default Toast;
