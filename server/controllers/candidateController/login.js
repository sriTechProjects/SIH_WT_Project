const Candidate = require("../../model/candidate");
const Expert = require("../../model/expert");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const email_sender = require("../localController/emailSender");
const htmlBody = require("../../assets/htmlBodies/TwoFactorAuth");
const fs = require('fs');
// const upload = require('../../db/uploadconfig')

const addCandidate = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.file);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email, password are required",
        success: false,
      });
    }

    const existingCandidate = await Candidate.findOne({
      "personalDetails.contact.email": email,
    });

    const existingExpert = await Expert.findOne({
      "personalDetails.contact.email": email,
    });

    if (existingCandidate) {
      return res.status(400).json({
        message: "Candidate with this email already exists",
        success: false,
      });
    }
    if (existingExpert) {
      return res.status(400).json({
        message: "Expert with this email already exists",
        success: false
      })
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Handle resume upload
      // resume = {
      //     filename: req.file.filename,
      //     fileType: req.file.mimetype,
      // }

    // Create a new candidate with default values
    const newCandidate = new Candidate({
      personalDetails: {
        name: {
          firstName: "Default",
          middleName: "",
          lastName: "User",
        },
        gender: "Unknown",
        age: 0,
        contact: {
          email,
          phoneNo: "0000000000",
          recoveryEmail: "",
        },
        password: hashedPassword,
        idProof: {
          type: "Unknown",
          number: "N/A",
        },
        permanentAddress: {
          addressLine: "Default Address",
          city: "Default City",
          state: "Default State",
          pinCode: "000000",
        },
      },
      twoFactorAuth: {
        enabled: false,
        method: "None",
      },
      skills: [],
      areaOfExpertise: [],
      resume: {
        filename: "default_filename",
        fileType: "application/octet-stream",
      },
      yearsOfExperience: 0,
      qualifications: [],
      projects: [],
      researchPapers: [],
      skillRelevancyScore: {
        skills: 0,
        yearsOfExperience: 0,
        qualification: 0,
        researchPapers: 0,
        projects: 0,
        total: 0,
      },
      approachRelevancyScore: {
        problemSolving: 0,
        collaboration: 0,
        decisionMaking: 0,
        creativity: 0,
        analyticalDepth: 0,
        total: 0,
      },
      finalScore: 0,
    });

    // Save the candidate to the database
    await newCandidate.save();

    return res.status(201).json({
      message: "Candidate registered successfully",
      success: true,
      data: {
        email: newCandidate.personalDetails.contact.email,
        id: newCandidate._id,
      },
    });
  } catch (error) {
    console.error("Error registering candidate:", error);

    return res.status(500).json({
      message: "An error occurred while registering the candidate",
      success: false,
      error: error.message,
    });
  }
});

const loginCandidate = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: "email and password not provided",
        success: false,
      });
    }

    const candidate = await Candidate.findOne({
      "personalDetails.contact.email": email,
    });
    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        success: false,
      });
    }

    const isPasswordMatch = bcrypt.compareSync(password, candidate.personalDetails.password);
    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          id: candidate._id,
          email: candidate.personalDetails.contact.email,
          role: candidate.personalDetails.role
        },
        process.env.JWT_SECRET_KEY,
        { 
          expiresIn: "1h",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: "Strict",
      });
      return res.status(201).json({
        message: "User Successfully Logined",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Invalid Password",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while logging in the candidate",
      success: false,
    });
  }
});

const signoutCandidate = asyncHandler(async (req, res) => {
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
    console.error("Error signout candidate :-: ", error);
    res.status(500).json({
      message: "Error signout candidate",
      success: false,
    });
  }
});

const twoFacAuth = asyncHandler(async (req, res) => {
  const { twoFACode } = req.body;
  const email = req.params.id;

  try {
    if (!twoFACode) {
      return res.status(400).json({
        message: "2FA code is required for verification.",
        success: false,
      });
    }

    const user = await Candidate.findOne({
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
        role: "Candidate",
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
})

module.exports = { addCandidate, loginCandidate, signoutCandidate, twoFacAuth };
