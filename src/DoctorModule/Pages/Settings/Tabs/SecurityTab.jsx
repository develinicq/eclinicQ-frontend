import React from "react";

const SecurityTab = () => {
    return (
        <div className="p-4 flex justify-left no-scrollbar">
            <div className=" rounded-lg p-4 shadow-sm w-full max-w-md bg-white border border-gray-100">
                <h2 className="text-base font-semibold text-gray-900 mb-2">
                    Change Password
                </h2>
                <form className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Current Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full h-8 px-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-100"
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full h-8 px-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-100"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full h-8 px-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-100"
                            placeholder="Enter Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-1/2 h-8 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition"
                    >
                        Send OTP and Verify
                    </button>
                </form>
                <div className="mt-4">
                    <h3 className="text-xs font-semibold text-gray-800 mb-1">
                        Password Requirements
                    </h3>
                    <ul className="list-none pl-0 text-xs text-gray-700 space-y-1">
                        <li className="flex items-center gap-1">
                            <span className="text-green-600">&#10003;</span> At least 8–15
                            characters long
                        </li>
                        <li className="flex items-center gap-1">
                            <span className="text-green-600">&#10003;</span> Contains
                            uppercase letter (A-Z)
                        </li>
                        <li className="flex items-center gap-1">
                            <span className="text-green-600">&#10003;</span> Contains
                            lowercase letter (a-z)
                        </li>
                        <li className="flex items-center gap-1">
                            <span className="text-green-600">&#10003;</span> Contains
                            number (0-9)
                        </li>
                        <li className="flex items-center gap-1">
                            <span className="text-green-600">&#10003;</span> Contains
                            special character (!@#$%^&amp;*)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SecurityTab;
