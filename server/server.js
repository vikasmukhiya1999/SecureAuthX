import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB(); // Connect to the MongoDB database

const app = express();

// Enable CORS with specific origin and credentials
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// Parse JSON request bodies
app.use(express.json());
// Parse cookies attached to the request
app.use(cookieParser());

// Mount authentication routes under the /api/auth path
app.use("/api/auth", authRoutes);

// Start the server and listen for incoming requests on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running at: localhost:${process.env.PORT}`);
});
