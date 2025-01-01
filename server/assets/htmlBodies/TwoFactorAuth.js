const htmlBody = (TwoFACode) => {
  return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DRDO Authentication Code</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Segoe UI', Arial, sans-serif;
          }
  
          body {
              background: linear-gradient(135deg, #f6f8fd 0%, #e9f0ff 100%);
              padding: 48px 16px;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
          }
  
          .email-card {
              background: white;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0, 28, 107, 0.1);
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, 0.8);
          }
  
          .header {
              background: linear-gradient(120deg, #001f5c 0%, #003399 50%, #0051b4 100%);
              padding: 40px 24px;
              text-align: center;
              position: relative;
              overflow: hidden;
          }
  
          .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
          }
  
          .logo-circle {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
              box-shadow: 0 8px 24px rgba(0, 28, 107, 0.15);
              border: 4px solid rgba(255, 255, 255, 0.3);
          }
  
          .logo-text {
              background: linear-gradient(45deg, #001f5c, #0051b4);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
              font-size: 24px;
          }
  
          .header h1 {
              color: white;
              font-size: 26px;
              margin-bottom: 10px;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          .header p {
              color: #b3d9ff;
              font-size: 16px;
          }
  
          .content {
              padding: 40px 48px;
              background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
          }
  
          .title {
              color: #001f5c;
              font-size: 22px;
              font-weight: 600;
              margin-bottom: 24px;
          }
  
          .description {
              color: #445577;
              margin-bottom: 32px;
              line-height: 1.6;
          }
  
          .otp-container {
              background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
              border: 2px solid rgba(0, 81, 180, 0.1);
              border-radius: 20px;
              padding: 32px;
              margin-bottom: 32px;
              box-shadow: 0 8px 24px rgba(0, 28, 107, 0.05);
          }
  
          .otp-digits {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 16px;
              margin-bottom: 20px;
          }
  
          .otp-digit {
              width: 60px;
              height: 70px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 28px;
              font-weight: bold;
              color: #001f5c;
              background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
              border-radius: 12px;
              box-shadow: 0 8px 16px rgba(0, 28, 107, 0.08);
              border: 2px solid rgba(0, 81, 180, 0.1);
              transition: transform 0.3s ease;
          }
  
          .otp-digit:hover {
              transform: translateY(-2px);
          }
  
          .expiry {
              text-align: center;
              color: #0051b4;
              font-size: 14px;
              font-weight: 500;
          }
  
          .security-notice {
              background: linear-gradient(135deg, #fff5f5 0%, #fff0f0 100%);
              border-left: 4px solid #ff3366;
              border-radius: 0 16px 16px 0;
              padding: 28px;
              margin-bottom: 32px;
              box-shadow: 0 8px 24px rgba(255, 51, 102, 0.05);
          }
  
          .security-notice h3 {
              color: #ff3366;
              margin-bottom: 16px;
              font-weight: 600;
              font-size: 18px;
          }
  
          .security-list {
              list-style: none;
          }
  
          .security-item {
              color: #cc2952;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              font-size: 15px;
          }
  
          .security-icon {
              margin-right: 12px;
              color: #ff3366;
              font-size: 18px;
          }
  
          .contact-info {
              background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
              padding: 28px;
              border-radius: 16px;
              margin-bottom: 24px;
              border: 1px solid rgba(0, 81, 180, 0.1);
          }
  
          .contact-info p {
              color: #445577;
              font-size: 14px;
              line-height: 1.6;
          }
  
          .contact-info a {
              color: #0051b4;
              text-decoration: none;
              font-weight: 500;
              transition: color 0.3s ease;
          }
  
          .contact-info a:hover {
              color: #003399;
              text-decoration: underline;
          }
  
          .footer {
              background: linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%);
              padding: 24px;
              border-top: 1px solid rgba(0, 81, 180, 0.1);
              text-align: center;
          }
  
          .footer p {
              color: #445577;
              font-size: 12px;
              line-height: 1.6;
          }
  
          .copyright {
              color: #6b7c99;
              margin-top: 8px;
          }
  
          /* Responsive Design */
          @media (max-width: 640px) {
              .content {
                  padding: 24px 20px;
              }
  
              .otp-digit {
                  width: 50px;
                  height: 60px;
                  font-size: 24px;
              }
  
              .header {
                  padding: 30px 20px;
              }
  
              .logo-circle {
                  width: 70px;
                  height: 70px;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="email-card">
              <div class="header">
                  <div class="logo-circle">
                      <span class="logo-text">DRDO</span>
                  </div>
                  <h1>Defence Research and Development Organisation</h1>
                  <p>Security Verification System</p>
              </div>
              <div class="content">
                  <h2 class="title">Verify Your <span>Identity</span></h2>
                  <p class="description">
                      A verification request was initiated for your DRDO account. Use the following One-Time Password (OTP) to complete the authentication process:
                  </p>
                  <div class="otp-container">
                      <div class="otp-digits">
                        ${String(TwoFACode)
                          .split("")
                          .map(
                            (digit) => `<div class="otp-digit">${digit}</div>`
                          )
                          .join("")}
                      </div>
                      <p class="expiry">This code will expire in <strong>10 minutes</strong></p>
                  </div>
                  <div class="security-notice">
                      <h3>Security Notice:</h3>
                      <ul class="security-list">
                          <li class="security-item">Do not share your OTP with anyone.</li>
                          <li class="security-item">Ignore this email if you did not request a code.</li>
                          <li class="security-item">Ensure that your email is up to date.</li>
                      </ul>
                  </div>
                  <div class="contact-info">
                      <p>For assistance, contact <a href="mailto:support@drdo.gov.in">support@drdo.gov.in</a></p>
                  </div>
              </div>
              <div class="footer">
                  <p>Defence Research and Development Organisation. All Rights Reserved.</p>
                  <p class="copyright">© ${new Date().getFullYear()} DRDO, India</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
};

module.exports = htmlBody;
