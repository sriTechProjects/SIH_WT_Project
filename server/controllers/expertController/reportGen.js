// import generatePDF from "../../config/renderReportToHTML"; // Adjust the path if needed
const generatePDF = require("../../config/renderReportToHTML");

// Controller function to test the PDF generation
const testPDFGeneration = async (req, res) => {
  try {
    // Example data to render in the PDF
    const reportData = {
      title: "Performance Report",
      content: "This is a test performance report generated dynamically.",
    };

    // Output path for the PDF
    const outputPath = "./output/PerformanceReport.pdf"; // Ensure this folder exists

    // Call the generatePDF function
    await generatePDF(reportData, outputPath);

    // Respond to the client
    res.status(200).send({
      message: "PDF generated successfully!",
      filePath: outputPath,
    });
  } catch (err) {
    console.error("Error generating PDF:", err);

    // Respond with error
    res.status(500).send({
      message: "Failed to generate PDF",
      error: err.message,
    });
  }
};

module.exports = testPDFGeneration;
// export default testPDFGeneration;
