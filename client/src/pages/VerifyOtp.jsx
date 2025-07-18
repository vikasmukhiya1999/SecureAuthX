import { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/verify-otp", {
        email,
        code: otp,
      });

      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl fonst-bold mb-4">Verify Email OTP</h2>
      <form onSubmit={handleSumbit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Verify
        </button>
      </form>
      {message && <p className="mt-2 text-blue-600">{message}</p>}
    </div>
  );
}
