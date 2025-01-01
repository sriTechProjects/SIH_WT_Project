const mongoose = require("mongoose");
const Candidate = require("../../model/candidate");
const asyncHandler = require("express-async-handler");

//http://localhost:8000/api/candidate/completeDetails
const completeDetails = async (req, res) => {
  try {
    var {
      email,
      personalInfo,
      educationalInfo,
      criticalInputs,
      additionalInputs,
    } = req.body;
    const resume = req.file;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Find candidate by email
    const candidate = await Candidate.findOne({
      "personalDetails.contact.email": email,
    });
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found." });
    }

    // Parse inputs if they are strings
    if (typeof personalInfo === "string")
      personalInfo = JSON.parse(personalInfo);
    if (typeof criticalInputs === "string")
      criticalInputs = JSON.parse(criticalInputs);
    if (typeof additionalInputs === "string")
      additionalInputs = JSON.parse(additionalInputs);
    if (typeof educationalInfo === "string")
      educationalInfo = JSON.parse(educationalInfo);

    // Update personal information
    // Update personal information
    if (personalInfo) {
      candidate.personalDetails = {
        ...candidate.personalDetails,
        name: {
          firstName:
            personalInfo.firstName ||
            candidate.personalDetails?.name?.firstName,
          middleName:
            personalInfo.middleName ||
            candidate.personalDetails?.name?.middleName,
          lastName:
            personalInfo.lastName || candidate.personalDetails?.name?.lastName,
        },
        gender: personalInfo.gender || candidate.personalDetails?.gender,
        age: personalInfo.age || candidate.personalDetails?.age,
        contact: {
          email:
            personalInfo.email || candidate.personalDetails?.contact?.email,
          recoveryEmail:
            personalInfo.recoveryEmail ||
            candidate.personalDetails?.contact?.recoveryEmail,
          phoneNo:
            personalInfo.phoneNo || candidate.personalDetails?.contact?.phoneNo,
        },
        permanentAddress: {
          addressLine:
            personalInfo.address ||
            candidate.personalDetails?.permanentAddress?.addressLine,
          city:
            personalInfo.city ||
            candidate.personalDetails?.permanentAddress?.city,
          state:
            personalInfo.state ||
            candidate.personalDetails?.permanentAddress?.state,
          pinCode:
            personalInfo.pincode ||
            candidate.personalDetails?.permanentAddress?.pinCode,
        },
        idProof: {
          type:
            personalInfo.govtIdType || candidate.personalDetails?.idProof?.type,
          number:
            personalInfo.govtIdNo || candidate.personalDetails?.idProof?.number,
        },
      };
    }

    // Update educational information
    if (Array.isArray(educationalInfo)) {
      candidate.qualifications = educationalInfo.map((qualification) => ({
        degree: qualification.degree,
        institute: qualification.institution,
        yearOfAdmission: qualification.yearOfAdmission,
        yearOfCompletion: qualification.yearOfCompletion,
      }));
    } else if (educationalInfo) {
      return res
        .status(400)
        .json({ error: "educationalInfo must be an array." });
    }

    // Update critical inputs
    if (criticalInputs) {
      candidate.skills = criticalInputs.skills || candidate.skills;
      candidate.areaOfExpertise =
        criticalInputs.expertise || candidate.areaOfExpertise;
      candidate.yearsOfExperience = criticalInputs.yearsOfExperience;
    }

    // Update additional inputs (projects and publications)
    if (additionalInputs) {
      // Process projects
      if (Array.isArray(additionalInputs.projects)) {
        candidate.projects = additionalInputs.projects.map((project) => ({
          title: project.title,
          description: project.description,
          skills: project.skills, // Ensure this field matches your schema
        }));
      }

      // Process publications
      if (Array.isArray(additionalInputs.publications)) {
        candidate.researchPapers = additionalInputs.publications.map(
          (paper) => ({
            title: paper.title,
            description: paper.description || "", // Ensure non-mandatory fields are handled
            skills: paper.skills,
            link: paper.link || "", // Default empty string if no link is provided
            year: paper.year, // Map the publication year if needed
          })
        );
      }
    }

    // Add resume details if uploaded
    if (resume) {
      candidate.resume = {
        filename: resume.filename,
        fileType: resume.mimetype,
      };
    }

    // Save updated candidate to the database
    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Candidate details updated successfully.",
      data: candidate,
    });
  } catch (error) {
    console.error("Error in completeDetails:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// PRIVATE ROUTE
// http://localhost:8000/api/candidate/all
const allCandidates = asyncHandler(async (req, res) => {
  try {
    const candidates = await Candidate.find(
      {},
      {
        password: 0,
        candidateProfile: {
          additionalInputs: {
            // Remove publications or specific fields if needed
            publications: 0,
          },
        },
      }
    );
    if (!candidates.length) {
      return res.status(404).json({
        message: "No candidates data is available",
        success: false,
      });
    }
    res.status(200).json(candidates);
  } catch (error) {
    console.log("Error fetching all candidates :-: ", error);
    res.status(500).json({ message: "Error fetching all candidates" });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/candidate/update/:id
const updateCandidate = asyncHandler(async (req, res) => {
  const candidateId = req.params.id;
  const candidateData = req.body;
  
  // Validate the candidateId
  if (!mongoose.Types.ObjectId.isValid(candidateId)) {
    return res.status(400).json({
      message: "Invalid candidate ID",
      success: false,
    });
  }

  try {
    // Prevent password updates directly here
    if (candidateData.password) {
      delete candidateData.password;
    }

    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $set: candidateData },
      { new: true } // Return updated document
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Candidate updated successfully",
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error(`Error updating candidate with ID ${candidateId}:`, error);
    res
      .status(500)
      .json({ message: "Error updating candidate", success: false });
  }
});

// PRIVATE ROUTE
// http://localhost:8000/api/candidate/find/:id
const findCandidate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid or missing Candidate ID",
        success: false,
      });
    }
    const candidate = await Candidate.findById(id, {
      personalDetails: { password: 0 },
      candidateProfile: {
        additionalInputs: {
          // Remove publications or specific fields if needed
          publications: 0,
        },
      },
    });

    if (!candidate) {
      return res.status(404).json({
        message: `Unable to fetch the candidate with ID: ${id}`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Candidate fetched successfully",
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.log(`Error fetching candidate with ID ${id} :-:\n\n`, error);
    res.status(500).json({ message: "Error fetching candidate" });
  }
});

module.exports = {
  allCandidates,
  findCandidate,
  updateCandidate,
  completeDetails,
};
