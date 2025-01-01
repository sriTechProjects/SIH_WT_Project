const puppeteer = require("puppeteer");
const renderReportToHTML = require("./renderReportToHTML");

const generatePDF = async (data, outputPath) => {
  const htmlContent = renderReportToHTML(data); // Render HTML with dynamic data
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML content
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // Generate PDF
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
  });

  await browser.close();
};

module.exports = generatePDF;

