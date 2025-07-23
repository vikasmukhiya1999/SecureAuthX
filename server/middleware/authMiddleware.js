import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Extract the token from the request cookies
  const { token } = req.cookies;

  // If no token is found, return an error response
  if (!token) {
    return res.json({
      status: "error",
      message: "token not found || Not Authorized Login again",
    });
  }

  try {
    // Verify the token using the secret key
    const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);
    // If the token is valid and contains a user ID
    if (tokenDecode.id) {
      // Attach the user ID to the request body
      req.body.userId = tokenDecode.id;
      // Proceed to the next middleware or route handler
      next();
    } else {
      // If token is decoded but no ID is found, return an error
      return res.status(500).json({ status: "error", message: error.message });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "error caught || Not Authorized login again",
    });
  }
};

export default userAuth;
