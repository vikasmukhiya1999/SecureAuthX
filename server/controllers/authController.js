import bcrypt from "bcrypt";
import User from "../models/user.js";
import OTP from "../models/OTP.js";
import jwt from "jsonwebtoken";
import { sendOTP } from "../config/mail.js";
import {
  generateAccesstoken,
  generateRefreshToken,
} from "../utils/generateToken.js";
// Controller for user registration
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   return res.send({ status: "failed", message: "missing Credential" });
  // }
  try {
    // Check if a user with the given email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Hash the user's password before saving
    const hashed = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({ name, email, password: hashed });
    // Save the new user to the database
    await newUser.save();

    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP expiration time to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60000);
    // Save the OTP to the database
    await OTP.create({ email, code, expiresAt });

    // Send the OTP to the user's email
    await sendOTP(email, code);
    res
      .status(201)
      .json({ message: "Registered successfully, OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

// Controller for verifying OTP
export const verifyOTP = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Find the OTP document for the given email and code
    const otpDoc = await OTP.findOne({ email, code });
    if (!otpDoc) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the OTP has expired
    if (otpDoc.expiresAt < new Date()) {
      // Delete the expired OTP
      await OTP.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ message: "OTP Expired" });
    }

    // Find the user associated with the email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    // Mark the user's email as verified
    user.isVerified = true;
    await user.save();
    // Clean up all OTPs for the verified email
    await OTP.deleteMany({ email });

    res.status(200).json({ message: "Email Verified Successfully" });
    // Handle server errors
  } catch (error) {
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !email) {
      return res.status(400).json({ message: "invalid credential" });
    }
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate access and refresh tokens
    const accessToken = generateAccesstoken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      // The cookie is only accessible by the web server
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      // Send the access token and user details in the response
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Controller for refreshing access tokens using a refresh token
export const refresh = async (req, res) => {
  // Get the refresh token from cookies
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    // Generate a new access token
    const newAccessToken = generateAccesstoken(decoded.id);
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email and check if they are verified
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "User not Found or Not Verified" });
    }
    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP expiration time to 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60000);
    // Create and save the OTP
    await OTP.create({ email, code, expiresAt });
    await sendOTP(email, code);
    res.status(200).json({ message: "OTP send for password reset" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller for resetting password using OTP
export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // Find the OTP document for the given email and code
    const otpDoc = await OTP.findOne({ email, code });

    // Check if the OTP is invalid or expired
    if (!otpDoc || otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password in the database
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    await OTP.deleteMany({ email }); // Clean up all OTPs for the email after successful password reset
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged Out" });
};
