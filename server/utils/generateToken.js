import jwt from "jsonwebtoken";

// Generates an access token with the user ID, signed with JWT_SECRET, expiring in 10 minutes.
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
};

// Generates a refresh token with the user ID, signed with JWT_REFRESH_SECRET, expiring in 7 days.
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};