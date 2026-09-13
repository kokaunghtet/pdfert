const puppeteer = require("puppeteer");
const path = require("path");

async function convertToPdf(inputFile) {
  const outputFile = inputFile.replace(/\.html$/, ".pdf");
  const fullPath = path.resolve(process.cwd(), inputFile);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.goto("file://" + fullPath, {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    path: outputFile,
    format: "A4",
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });

  await browser.close();

  return outputFile;
}

module.exports = { convertToPdf };
