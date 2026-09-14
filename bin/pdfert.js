#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const { convertToPdf } = require("../lib/converter");

const currentDir = process.cwd();

const htmlFiles = fs
  .readdirSync(currentDir)
  .filter((file) => file.endsWith(".html"));

console.log("");
console.log("  \x1b[1mpdfert\x1b[0m — HTML to PDF converter");
console.log("");

if (htmlFiles.length === 0) {
  console.log("  \x1b[31mNo HTML files found in current directory.\x1b[0m");
  console.log("");
  process.exit(1);
}

async function main() {
  const prompt = inquirer.createPromptModule();
  try {
    const { selectedFile } = await prompt([
      {
        type: "select",
        name: "selectedFile",
        message: "Select an HTML file to convert:",
        choices: htmlFiles,
        pageSize: 12,
        theme: {
          style: {
            keysHelpTip: (keys) => {
              return (
                keys.map(([key, action]) => `${key} ${action}`).join(" • ") +
                " • ctrl+c exit"
              );
            },
          },
        },
      },
    ]);

    console.log("");
    console.log("  \x1b[36mLaunching browser...\x1b[0m");

    const outputFile = await convertToPdf(selectedFile);
    console.log(
      "  \x1b[32m✔ Converted successfully: " + outputFile + "\x1b[0m",
    );
    console.log("");

    console.log("  \x1b[36mCleanup complete. Browser closed.\x1b[0m");
  } catch (err) {
    if (err.name === "ExitPromptError") {
      console.log("");
      console.log("  \x1b[2mBye!\x1b[0m");
      console.log("");
      process.exit(0);
    }
    console.log("  \x1b[31m✖ Conversion failed: " + err.message + "\x1b[0m");
    console.log("");
    process.exit(1);
  }
}

main();
