import React, { useState } from "react";
import Button from "../components/Button";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "../lib/axios";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function SuperAdminSignIn() {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthStore();

    const [remember, setRemember] = useState(true);
    const [identifier, setIdentifier] = useState(""); // email
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const canLogin = identifier.trim().length > 0 && password.trim().length > 0;

    const handleLogin = async () => {
        if (!canLogin) return;
        setSubmitting(true);
        setErrorMsg("");

        // Basic email format check
        const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        if (!emailRegex.test(identifier)) {
            setErrorMsg('Please enter a valid email address.');
            setSubmitting(false);
            return;
        }

        try {
            // Logic from DummyLogin.jsx
            const res = await axios.post('/superAdmin/login', { emailId: identifier, password });
            const data = res?.data;

            const token = data?.token || data?.accessToken || data?.data?.token;
            const user = data?.user || data?.data?.user || null;

            if (!token) {
                throw new Error('No token in response');
            }

            setToken(token);
            if (user) setUser(user);

            // Redirect to dashboard
            navigate("/dashboard", { replace: true });
        } catch (e) {
            const raw = e?.response?.data?.message ?? e?.message ?? 'Login failed';
            const msg = typeof raw === 'string' ? raw : (raw?.message || raw?.error || JSON.stringify(raw));
            setErrorMsg(msg);
            console.error('Login failed:', e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left panel - fixed 600px */}
            <div className="hidden md:flex flex-1 relative p-6">
                <div
                    className="absolute inset-0 rounded-[12px]"
                    style={{
                        background: "linear-gradient(180deg, #2372EC 22.83%, #E184FD 100%)",
                        margin: "24px",
                    }}
                />
                {/* Decorative circles */}
                <img
                    src="/Group-1898.svg"
                    alt=""
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ margin: "24px" }}
                />
                <img
                    src="/Group-1899.svg"
                    alt=""
                    className="absolute bottom-0 right-0 pointer-events-none"
                    style={{ margin: "24px" }}
                />
                <div
                    className="relative h-full w-full flex items-center justify-center"
                    style={{ paddingTop: "40px", paddingBottom: "12px" }}
                >
                    <div className="text-white text-center max-w-sm select-none">
                        <img
                            src="/sign-in-object.svg"
                            alt="welcome"
                            className="w-[599px] md:w-[599px] mx-auto"
                        />
                        <h2 className="text-xl font-semibold mt-4">Welcome To Upchar-Q</h2>
                        <p className="text-sm opacity-90">
                            Your Turn, Your Time
                            <br />
                            Track Appointments in Real-Time!
                        </p>

                        {/* Bottom dots decoration */}
                        <img
                            src="/signin-dots.svg"
                            alt=""
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none mb-2"
                        />
                    </div>
                </div>
            </div>
            {/* Right form */}
            <div className="relative flex-1 flex items-center justify-center px-6 pb-10 md:px-10 md:pb-10">
                <div className="absolute left-8 md:left-12 top-8 md:top-8">
                    <img src="/logo.svg" alt="eClinic-Q" className="h-6" />
                </div>
                <div className="w-full max-w-[520px] relative -top-2 md:-top-4 pb-16">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Super Admin Login
                    </h1>
                    <p className="text-sm text-gray-500 mb-3">Sign in to continue</p>

                    <div className="space-y-3 mt-4">
                        {errorMsg && (
                            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                                {errorMsg}
                            </div>
                        )}

                        <div>
                            <div>
                                <label className="text-sm text-gray-700">
                                    Enter Email ID{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="mt-1 h-9 w-full border border-gray-300 rounded px-2 text-sm"
                                    placeholder="Enter Email ID"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            // Focus password field if email entered
                                        }
                                    }}
                                />
                            </div>
                            <label className="text-sm text-gray-700 mt-3 block">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    className="h-9 w-full border border-gray-300 rounded px-2 text-sm pr-8"
                                    placeholder="Enter Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && canLogin)
                                            handleLogin();
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <div className="text-right mt-1 text-xs text-[#2F66F6] cursor-pointer">
                                Forgot Password?
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                checked={remember}
                                onCheckedChange={setRemember}
                            />
                            <label
                                htmlFor="remember"
                                className="text-xs text-gray-700 cursor-pointer"
                            >
                                Remember Me
                            </label>
                        </div>

                        <Button
                            className="w-full"
                            disabled={!canLogin || submitting}
                            onClick={handleLogin}
                        >
                            {submitting ? "Logging in..." : "Login"}
                        </Button>

                        <div className="text-[11px] text-gray-500 flex items-start gap-2">
                            <span className="mt-[2px] inline-flex items-center justify-center w-[14px] h-[14px] border border-gray-400 rounded-full text-[9px] text-gray-600">
                                i
                            </span>
                            <span>
                                By clicking the button above, you agree to our{" "}
                                <a className="text-[#2F66F6]" href="#">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a className="text-[#2F66F6]" href="#">
                                    Privacy Policy
                                </a>
                                .
                            </span>
                        </div>
                    </div>
                    {/* Help & Support button */}
                    <a
                        className="absolute left-8 md:left-12 bottom-6 bg-white text-gray-600 text-sm rounded-full border border-gray-200 shadow-sm px-4 py-2 inline-flex items-center gap-2 hover:bg-gray-50 w-fit"
                        href="#"
                    >
                        <img src="/Help.svg" alt="help" className="w-4 h-4" />
                        Help & Support
                        <span className="ml-2 text-gray-400">›</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
