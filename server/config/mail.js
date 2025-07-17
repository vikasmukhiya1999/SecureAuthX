import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL/TLS for secure connection (port 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

(async () => {
  try {
    // Verify the transporter configuration
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (error) {
    // Log any SMTP connection errors
    console.error("SMTP connection error:", error);
  }
})();

export const sendOTP = async (email, code) => {
  // Define mail options for sending OTP
  const mailOptions = {
    from: `"User-Auth App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your OTP Verification Code`,
    html: `
    <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 420px; margin: 40px auto; padding: 28px 24px; border: 1px solid #e5e7eb; border-radius: 10px; background-color: #ffffff; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      
      <h2 style="color: #111827; font-size: 22px; font-weight: 700; margin-bottom: 16px;">
        Verify Your Account
      </h2>
      
      <p style="color: #374151; font-size: 15px; margin-bottom: 20px;">
        Use the code below to complete your verification:
      </p>
      
      <div style="font-size: 28px; font-weight: 700; letter-spacing: 4px; color: #2563eb; background-color: #f3f4f6; padding: 16px 24px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
        ${code}
      </div>
      
      <p style="color: #6b7280; font-size: 14px; background-color: #f9fafb; padding: 10px 16px; border-radius: 6px; margin: 16px auto; max-width: 300px;">
        ⏱ This code is valid for <strong>10 minutes</strong>.<br>
        <span style="color: #dc2626;">⚠️ Do not share this code with anyone.</span>
      </p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
      
      <p style="color: #9ca3af; font-size: 12px;">
        If you didn’t request this email, you can safely ignore it.
      </p>
    </div>
  `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
