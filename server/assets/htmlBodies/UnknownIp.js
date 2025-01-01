const axios = require("axios");
const getLocation = async (ipAddress) => {
  const apikey = process.env.apikey || "b07b1ef0ac25d8bb61a975892e09c4a0";
  const url = `http://api.ipstack.com/${ipAddress}?access_key=${apikey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return {
      city: data.city,
      country: data.country_name,
      region: data.region_name,
    };
  } catch (error) {
    console.error("Error fetching IP location:", error);
    return null;
  }
};

const UnknownIpAlert = async (name, email, userIps, loginTime) => {
  const location = await getLocation(userIps);
  console.log(userIps);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Alert - Unknown Login Attempt</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #e74c3c;
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
    }
    .content p {
      margin-bottom: 15px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin-top: 20px;
    }
    .footer a {
      color: #3498db;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Security Alert</h1>
      <p>Unknown Login Attempt Detected</p>
    </div>
    <div class="content">
      <p>Dear ${name ? "User" : name},</p>
      <p>We detected a login attempt to your account from an unrecognized device. The following details were recorded:</p>
      <ul>
        <li><strong>Device IP Address:</strong> ${userIps}</li>
        <li><strong>Email Address:</strong> ${email}</li>
        <li><strong>Login Time:</strong> ${loginTime ? loginTime : "No Time"}</li>
        <li><strong>Location (if available):</strong> ${location ? location : "No Time"}</li>
      </ul>
      <p>If you made this login attempt, click the "Yes, it was me" button below. If this wasn't you, click the "No, it wasn't me" button to secure your account.</p>
      
      <a href="http://localhost:8000/api/verifyUser?email=${email}&loginTime=${loginTime}&action=yes" class="button" style="background-color: #52796f;">Yes, it was me</a>
      <a href="http://localhost:8000/api/verifyUser?email=${email}&loginTime=${loginTime}&action=no" class="button" style="background-color: #ef233c;">No, it wasn't me</a>

      <p>If you believe this was an unauthorized attempt, we also recommend resetting your password immediately and contacting our support team.</p>
      <p>For added security, we recommend reviewing your recent account activity for any unusual changes.</p>
    </div>
    <div class="footer">
      <p>If you have any questions or need assistance, please <a href="mailto:support@example.com">contact us</a>.</p>
      <p>&copy; 2024 Your Company Name</p>
    </div>
  </div>
</body>
</html>
`;
};

module.exports = UnknownIpAlert;
