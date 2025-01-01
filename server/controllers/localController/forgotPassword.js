const asyncHandler = require("express-async-handler");
const email_sender = require("../localController/emailSender");
const Expert = require("../../model/expert");
const bcrypt = require("bcrypt");

const randomOtpGenerator = async () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// PUBLIC ROUTE
// http://localhost:8000/api/forgotpass
const forgotPassword_email_sender = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const from = `"DRDO Help Support" <${process.env.appEmail}>`;
    const to = email;
    const subject = "Reset Your Password";
    const otp = await randomOtpGenerator();
    const hashedOtp = bcrypt.hashSync(otp.toString(), 10);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
          .email-container { max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
          .email-header { background: #8d99ae; color: #fff; text-align: center; padding: 20px; }
          .email-header h1 { margin: 0; font-size: 24px; }
          .email-body { padding: 20px; font-size: 16px; line-height: 1.5; }
          .otp-box { background: #83c5be; color: #fff; font-size: 24px; padding: 15px; text-align: center; margin: 20px 0; letter-spacing: 3px; }
          .email-footer { text-align: center; background: #8d99ae; color: #fff; padding: 15px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>DRDO Organisation</h1>
          </div>
          <div class="email-body">
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your password. Use the OTP below to proceed:</p>
            <div class="otp-box">${otp}</div>
            <p>This OTP is valid for 10 minutes. If you did not request this, please ignore the email.</p>
          </div>
          <div class="email-footer">
            &copy; 2024 DRDO. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    const existingUser = await Expert.findOne({
      "contactInformation.email": email,
    });

    if (existingUser) {
      const response = await email_sender(
        from,
        to,
        subject,
        `Your OTP: ${otp}`,
        html
      );
      if (response.success) {
        existingUser.otp = hashedOtp;
        existingUser.otpExpiry = Date.now() + 10 * 60 * 1000;
        await existingUser.save();

        return res
          .status(200)
          .json({ message: "Password reset email sent successfully." });
      } else {
        throw new Error(response.message || "Failed to send the email.");
      }
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error in Forgot Password Route:", error.message);
    res.status(500).json({ message: "Failed to send password reset email." });
  }
});

// PUBLIC ROUTE
// http://localhost:8000/api/otpVerify
const otpVerification = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const { otp } = req.body;

  try {
    if (!otp) {
      return res.status(400).json({
        message: "OTP is required.",
        success: false,
      });
    }

    const existingUser = await Expert.findOne({
      "contactInformation.email": email,
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User account does not exist.",
        success: false,
      });
    }

    if (!existingUser.otpExpiry || Date.now() > existingUser.otpExpiry) {
      return res.status(400).json({
        message: "OTP has expired.",
        success: false,
      });
    }

    const isOtpValid = bcrypt.compareSync(otp.toString(), existingUser.otp);

    if (isOtpValid) {
      existingUser.otp = null;
      existingUser.otpExpiry = null;
      await existingUser.save();

      return res.status(200).json({
        message: "OTP validated successfully.",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Invalid OTP.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error in OTP Verification Route:", error.message);
    res.status(500).json({
      message: "Failed to verify OTP.",
      success: false,
    });
  }
});

// PUBLIC ROUTE
// http://localhost:8000/api/newPassword
const newPasswordMaking = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const { newPassword, newConfirmPassword } = req.body;
  try {
    if (newPassword !== newConfirmPassword) {
      return res.status(400).json({
        message: "Password & Confirm passwords should be same",
        success: false,
      });
    }

    const existingUser = await Expert.findOne({
      "contactInformation.email": email,
    });

    if (existingUser) {
      const newHashedPassword = await bcrypt.hashSync(newPassword, 10);
      existingUser.password = newHashedPassword;
      await existingUser.save();
    }
    return res.status(200).json({
      message: "Password Changed Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in New Password Making:", error.message);
    res.status(500).json({
      message: "Failed to Make a New Password.",
      success: false,
    });
  }
});

module.exports = {
  forgotPassword_email_sender,
  otpVerification,
  newPasswordMaking,
};
