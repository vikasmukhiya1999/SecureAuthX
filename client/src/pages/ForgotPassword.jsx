import axios from "../utils/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function forgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      localStorage.setItem("resetEmail", email);
      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (error) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Registered Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn mt-4">
          Send OTP
        </button>
      </form>
      {message && <p className="mt-2 text-blue-500">{message}</p>}
    </div>
  );
}
