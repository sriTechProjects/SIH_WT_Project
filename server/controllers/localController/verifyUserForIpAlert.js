const asyncHandler = require("express-async-handler");
const expert = require("../../model/expert");
const candidate = require("../../model/candidate");
const requestIp = require("request-ip");
const verifyUserForIpAlert = asyncHandler(async (req, res) => {
  try {
    const { email, loginTime, action } = req.query;

    if (!email || !loginTime || !action) {
      return res.status(400).json({
        message:
          "Missing required query parameters (email, loginTime, action).",
        success: false,
      });
    }

    const [user] = await Promise.all([
      expert.findOne({ "personalDetails.contact.email": email }),
      candidate.findOne({ "personalDetails.contact.email": email }),
    ]);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const clientIp = requestIp.getClientIp(req);
    const normalizedIp = clientIp === "::1" ? "127.0.0.1" : clientIp;
    const userIps = user.personalDetails.ips || [];

    if (!user.personalDetails.deviceIps) {
      user.personalDetails.deviceIps = {};
    }
    if (action === "yes") {
      if (!userIps.includes(normalizedIp)) {
        userIps.push(normalizedIp);
        await user.save();
        return res.status(200).json({
          message: "Your IP address has been added to the account.",
          success: true,
        });
      }
    } else if (action === "no") {
      return res.status(404).json({
        message:
          "If you didn't initiate this login, please secure your account.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error in /verifyUser:", error);
    return res.status(500).json({
      message: "Error verifying user.",
      success: false,
    });
  }
});

module.exports = verifyUserForIpAlert;
