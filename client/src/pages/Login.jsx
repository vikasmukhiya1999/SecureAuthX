import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/secure-auth-x-logo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    } else {
      setMessage(res.error.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen py-4" style={{ backgroundColor: "#ECFAE5" }}>
      {/* Main Content */}
      <div className="px-2 max-w-sm mx-auto">
        {/* Card Container */}
        <div
          className="rounded-2xl shadow-xl py-5 px-3 border-1"
          style={{
            backgroundColor: "#DDF6D2",
            borderColor: "#CAE8BD",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-center pb-2">
            <img src={logo} alt="SecureAuthX_logo" className="h-20 w-20" />
          </div>
          {/* Title */}
          <div className="mb-4 text-center">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#18230F" }}
            >
              Welcome Back
            </h1>
            <p className="text-base" style={{ color: "#255F38" }}>
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Phone Input */}
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder=" "
                onChange={handleChange}
                className="w-full px-4 pt-6 pb-3 rounded-2xl border-1 placeholder-transparent focus:outline-none peer transition-all duration-300 shadow-sm"
                style={{
                  backgroundColor: "#ECFAE5",
                  borderColor: "#CAE8BD",
                  color: "#18230F",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#B0DB9C";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(176, 219, 156, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#CAE8BD";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-sm font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-sm peer-focus:font-semibold"
                style={{ color: "#255F38" }}
              >
                Email or username
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder=" "
                onChange={handleChange}
                className="w-full px-4 pt-6 pb-3 rounded-2xl border-1 placeholder-transparent focus:outline-none peer transition-all duration-300 shadow-sm"
                style={{
                  backgroundColor: "#ECFAE5",
                  borderColor: "#CAE8BD",
                  color: "#18230F",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#B0DB9C";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(176, 219, 156, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#CAE8BD";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-sm font-semibold transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-sm peer-focus:font-semibold"
                style={{ color: "#255F38" }}
              >
                Password
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-[0.98] shadow-lg hover:shadow-xl mt-2"
              style={{
                background: "linear-gradient(135deg, #B0DB9C 0%, #CAE8BD 100%)",
                color: "#18230F",
              }}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #CAE8BD 0%, #B0DB9C 100%)";
                e.target.style.transform = "scale(0.98)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #B0DB9C 0%, #CAE8BD 100%)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Sign In
            </button>
          </form>

          {/* Error Message */}
          <div className="hidden rounded-4xl bg-red-100 mt-4 py-4 text-center">
            {message}
          </div>

          {/* Additional Features */}
          <div className="mt-4 space-y-4">
            {/* Quick Login Options */}
            <div className="flex space-x-3">
              <button
                className="flex-1 py-3 px-4 rounded-4xl border-2 font-medium text-sm transition-all duration-200 hover:shadow-md"
                style={{
                  borderColor: "#CAE8BD",
                  backgroundColor: "#DDF6D2",
                  color: "#255F38",
                }}
              >
                Sign in with email OTP
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold hover:underline transition-all duration-200"
              style={{ color: "#255F38" }}
            >
              Forgot your password?
            </Link>
          </div>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#CAE8BD" }}
            ></div>
            <span
              className="px-6 text-sm font-medium"
              style={{ color: "#255F38" }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#CAE8BD" }}
            ></div>
          </div>

          {/* Sign Up Section */}
          <div className="text-center space-y-2">
            <p className="text-sm" style={{ color: "#255F38" }}>
              New to our platform?
            </p>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full border-2 font-bold py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[0.98]"
              style={{
                borderColor: "#B0DB9C",
                backgroundColor: "transparent",
                color: "#255F38",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ECFAE5";
                e.target.style.borderColor = "#CAE8BD";
                e.target.style.transform = "scale(0.98)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "#B0DB9C";
                e.target.style.transform = "scale(1)";
              }}
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 px-6 pb-8">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs max-w-sm mx-auto">
          <a
            href="#"
            className="hover:underline transition-colors duration-200"
            style={{ color: "#255F38" }}
          >
            About
          </a>
          <a
            href="#"
            className="hover:underline transition-colors duration-200"
            style={{ color: "#255F38" }}
          >
            Help
          </a>
          <a
            href="#"
            className="hover:underline transition-colors duration-200"
            style={{ color: "#255F38" }}
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:underline transition-colors duration-200"
            style={{ color: "#255F38" }}
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:underline transition-colors duration-200"
            style={{ color: "#255F38" }}
          >
            Contact
          </a>

          <div className="w-full text-center mt-3">
            <span className="text-xs" style={{ color: "#255F38" }}>
              © 2025 Your Platform. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
