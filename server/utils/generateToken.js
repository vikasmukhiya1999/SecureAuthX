import jwt from "jsonwebtoken";

export const generateAccesstoken = (userId) => {
  // Generates an access token with the user ID, signed with JWT_SECRET, expiring in 10 minutes.
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
};

export const generateRefreshToken = (userId) => {
  // Generates a refresh token with the user ID, signed with JWT_REFRESH_SECRET, expiring in 7 days.
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
