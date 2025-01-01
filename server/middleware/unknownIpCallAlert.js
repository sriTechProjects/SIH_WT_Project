const requestIp = require('request-ip');

const UnknownIpAlert = require("../assets/htmlBodies/UnknownIp");
const email_sender = require("../controllers/localController/emailSender");

const UICA = async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  const normalizedIp = clientIp === "::1" ? "127.0.0.1" : clientIp;
  try {
    console.log(`[${new Date().toISOString()}] - Client IP: ${normalizedIp}`);
    const loginTime = new Date().toISOString();

    const userId = req.userId;
    console.log(userId);

    const findExistingUser = await User.findById(userId);

    if (!findExistingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const userIps = findExistingUser.personalDetails.ips || [];

    if (!userIps.includes(normalizedIp)) {
      userIps.push(normalizedIp);
      findExistingUser.personalDetails.ips = userIps;

      await findExistingUser.save();
      console.log("New IP added to user details:", normalizedIp);

      const sender = process.env.appEmail;
      const receiver = findExistingUser.email;
      const subject = `Ip Alert Email ${receiver}`;
      const text = `Unknown Ip Login on some other device`;
      const htmlBody = UnknownIpAlert(
        findExistingUser.name.firstname,
        receiver,
        userIps,
        loginTime
      );

      const sendIpAlert = await email_sender(
        sender,
        receiver,
        subject,
        text,
        htmlBody
      );

      if (!sendIpAlert) {
        return res.status(500).json({
          message: "Unable to send Ip-Alert-Email.",
          success: false,
        });
      }

      console.log("Ip alert email sent to user.");
    } else {
      console.log("IP already exists in user details:", normalizedIp);
    }

    next();
  } catch (error) {
    console.error("Error in Unknown-Ip-Call_Alert Middleware:", error);
    res.status(500).json({
      message: "Error in Unknown-Ip-Call_Alert Middleware",
      error: error.message,
      success: false,
    });
  }
};

module.exports = UICA;
