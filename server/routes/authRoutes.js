import express from "express";
import {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  resetPassword,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();
// Route for user registration
router.post("/register", register);
// Route for verifying OTP
router.post("/verify-otp", verifyOTP);
// Route for user login
router.post("/login", login);
// Route for refreshing access tokens
router.post("/refresh-token", refresh);
// Route for initiating password reset (sending OTP)
router.post("/forgot-password", forgotPassword);
// Route for resetting password with OTP
router.post("/reset-password", resetPassword);
// Route for user logout
router.post("/logout", logout);

export default router;
