import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function resetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const email = localStorage.getItem("resetEmail");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/reset-password", {
        email,
        code: otp,
        newPassword,
      });
      setMessage(res.data.message);
      localStorage.removeItem("resetEmail");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(err.response?.data?.message || "Reset Failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="input mt-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn mt-4">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-2 text-blue-500">{message}</p>}
    </div>
  );
}
