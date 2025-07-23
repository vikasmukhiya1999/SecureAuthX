import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtecttedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/" />;
}
