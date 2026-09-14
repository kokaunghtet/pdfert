#!/usr/bin/env node

const fs = require("node:fs/promises");
const inquirer = require("inquirer");
const { convertToPdf } = require("../lib/converter");

async function main() {
  const currentDir = process.cwd();

  const dirEntries = await fs.readdir(currentDir, { withFileTypes: true });
  const htmlFiles = dirEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => entry.name);

  console.log("\n  \x1b[1mpdfert\x1b[0m — HTML to PDF converter\n");

  if (htmlFiles.length === 0) {
    console.log("  \x1b[31mNo HTML files found in current directory.\x1b[0m\n");
    process.exitCode = 1;
    return;
  }

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
            keysHelpTip: (keys) =>
              keys.map(([key, action]) => `${key} ${action}`).join(" • ") +
              " • ctrl+c exit",
          },
        },
      },
    ]);

    console.log("\n  \x1b[36mLaunching browser...\x1b[0m");

    const outputFile = await convertToPdf(selectedFile);
    console.log(`  \x1b[32m✔ Converted successfully: ${outputFile}\x1b[0m\n`);
  } catch (err) {
    if (err.name === "ExitPromptError") {
      console.log("\n  \x1b[2mBye!\x1b[0m\n");
      process.exitCode = 0;
      return;
    }
    console.log(`  \x1b[31m✖ Conversion failed: ${err.message}\x1b[0m\n`);
    process.exitCode = 1;
  }
}

main();
