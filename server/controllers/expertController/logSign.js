const Expert = require("../../model/expert");
const candidate = require("../../model/candidate");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const email_sender = require("../localController/emailSender");
const htmlBody = require("../../assets/htmlBodies/TwoFactorAuth");
const fs = require("fs");
const multer = require("multer");

const upload = multer();

// PUBLIC ROUTE
// http://localhost:8000/api/expert/signup
const createExpert = asyncHandler(async (req, res) => {
  try {
    const { email, password, twoFactorCode = false } = req.body;

    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({
        message: "Email & Password & 2FA are required",
        success: false,
      });
    }

    const existingExpert = await Expert.findOne({
      $or: [{ "personalDetails.contact.email": email }],
    });

    const existingCandidate = await candidate.findOne({
      $or: [{ "personalDetails.contact.email": email }],
    });

    if (existingExpert) {
      return res.status(400).json({
        message: "Expert with this email already exists",
        success: false,
      });
    }

    if (existingCandidate) {
      return res.status(400).json({
        message: "Candidate with this email already exists",
        success: false,
      });
    }

    // let resumeData = null;
    // if (req.file) {
    //   resumeData = {
    //     filename: req.file.filename,
    //     fileType: req.file.mimetype,
    //     data: fs.readFileSync(req.file.path),
    //   };
    //   fs.unlinkSync(req.file.path);
    // }

    const clientIp = requestIp.getClientIp(req);
    const normalizedIp = clientIp === "::1" ? "127.0.0.1" : clientIp;
    const newExpert = new Expert({
      personalDetails: {
        name: {
          firstName: "NA",
          middleName: "NA",
          lastName: "NA",
        },
        gender: "NA",
        age: 0,
        contact: {
          email: email,
          phoneNo: "NA",
          recoveryEmail: "NA",
        },
        password: bcrypt.hashSync(password, 10),
        idProof: {
          type: "NA",
          number: "NA",
        },
        domain: "DRDO",
        role: "Expert",
        ips: [],
      },
      fieldOfExpertise: {
        domain: "NA",
        designation: "NA",
        skills: [],
        yearsOfExperience: 0,
        qualifications: [],
        projects: [],
        publications: [],
        resume: {
          filename: "NA",
          fileType: "NA",
          data: "NA",
        },
      },
      availability: true,
      skillRelevancyScore: {
        skills: 0,
        yearsOfExperience: 0,
        qualifications: 0,
        researchPapers: 0,
        projects: 0,
        totalSkillRelevancyScore: 0,
      },
      approachRelevancyScore: {
        problemSolving: 0,
        collaboration: 0,
        decisionMaking: 0,
        creativity: 0,
        analyticalDepth: 0,
        totalApproachRelevancyScore: 0,
      },
      finalScore: 0,
      twoFactorAuth: {
        enabled: twoFactorCode,
        method: "NA",
      },
    });
    newExpert.personalDetails.ips.push(normalizedIp);
    await newExpert.save();

    res.status(201).json({
      message: "Expert created successfully",
      success: true,
      data: newExpert,
    });
  } catch (error) {
    console.error("Error creating expert :-: ", error);
    res.status(500).json({
      message: "Error creating expert",
      success: false,
    });
  }
});

const randomOtpGenerator = async () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// PUBLIC ROUTE
// http://localhost:8000/api/expert/signin
const loginExpert = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }

    const findExistingUser = await Expert.findOne({
      "personalDetails.contact.email": email,
    });

    if (!findExistingUser) {
      return res.status(404).json({
        message: "User not found or wrong credentials.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      findExistingUser.personalDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }

    if (findExistingUser.twoFactorAuth.enabled) {
      const twoFACode = await randomOtpGenerator();
      findExistingUser.twoFactorAuth.method = twoFACode;
      await findExistingUser.save();

      const sender = process.env.appEmail;
      const receiver = email;
      const subject = `Two-Factor Authentication Code for ${email}`;
      const text = `Your Code: ${twoFACode}`;
      const htBody = htmlBody(twoFACode);

      try {
        const send2FACode = await email_sender(
          sender,
          receiver,
          subject,
          text,
          htBody
        );
        if (!send2FACode) {
          return res.status(500).json({
            message: "Unable to send the two-factor authentication code.",
            success: false,
          });
        }

        return res.status(200).json({
          message: "2FA code sent successfully. Please verify to log in.",
          success: true,
        });
      } catch (err) {
        console.error("Error sending 2FA code:", err);
        return res.status(500).json({
          message: "Error during 2FA process.",
          success: false,
        });
      }
    }

    const token = jwt.sign(
      {
        id: findExistingUser._id,
        email: findExistingUser.personalDetails.contact.email,
        role: "Expert",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1800000,
      sameSite: "Strict",
    });
    return res.status(200).json({
      message: "User successfully logged in.",
      success: true,
      role: findExistingUser
        ? findExistingUser?.personalDetails?.role
        : findExistingUser?.personalDetails?.role,
    });
  } catch (error) {
    console.error("Error logging in expert:", error);
    res.status(500).json({
      message: "Internal server error during login.",
      success: false,
    });
  }
});

// PUBLIC ROUTE
// http://localhost:8000/api/2fa/verify/:id
const TwoFactVerification = asyncHandler(async (req, res) => {
  const { twoFACode } = req.body;
  const email = req.params.id;

  try {
    if (!twoFACode) {
      return res.status(400).json({
        message: "2FA code is required for verification.",
        success: false,
      });
    }

    const user = await Expert.findOne({
      "personalDetails.contact.email": email,
      "twoFactorAuth.code": twoFACode,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid 2FA code. Please try again.",
        success: false,
      });
    }

    user.twoFactorAuth.code = null; // Clear the 2FA code after successful verification
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        email: user.personalDetails.contact.email,
        role: "Expert",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "2FA verification successful. User logged in.",
      success: true,
    });
  } catch (error) {
    console.error("Error verifying 2FA:", error);
    res.status(500).json({
      message: "Internal server error during 2FA verification.",
      success: false,
    });
  }
});

// PUBLIC ROUTE
// http://localhost:8000/api/expert/signout
const signoutExpert = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "User successfully signed out",
      success: true,
    });
  } catch (error) {
    console.error("Error signing out expert:", error);
    res.status(500).json({
      message: "Error signing out expert",
      success: false,
    });
  }
});

module.exports = {
  createExpert,
  loginExpert,
  signoutExpert,
  TwoFactVerification,
};
