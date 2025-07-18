import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../pages/Signup";
import VerifyOtp from "../pages/VerifyOtp";
import Login from "../pages/Login";
import ProtecttedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <ProtecttedRoute>
            <Dashboard />
          </ProtecttedRoute>
        ),
      },
    ],
  },
]);

export default router;
