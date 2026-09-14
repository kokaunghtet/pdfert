# pdfert

> Terminal UI tool that converts HTML files to PDF with interactive file selection.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- Chromium (bundled with Puppeteer, installed automatically)

## Installation

```bash
# Clone the repository
git clone https://github.com/kokaunghtet/pdfert.git
cd pdfert

# Install dependencies
npm install

# Link globally (makes `pdfert` command available everywhere)
npm link
```

## Usage

Navigate to any directory containing HTML files, then run:

```bash
pdfert
```

## Demo

```
$ pdfert

  pdfert — HTML to PDF converter

? Select an HTML file to convert:
❯ resume.html
  cover-letter.html
  report.html

  Launching browser...
  ✔ Converted successfully: resume.pdf
```

## Features

- Interactive arrow-key file selection
- Auto-scans current directory for `.html` files
- High-fidelity rendering (CSS backgrounds, zero margins, A4 format)
- Clean terminal output with colored status messages
- Error handling for missing HTML files

## Modification

To rename the command from `pdfert` to something else:

1. Change the bin entry in `package.json`:

   ```json
   "bin": {
     "yourname": "./bin/pdfert.js"
   }
   ```

2. Rename the file `bin/pdfert.js` to `bin/yourname.js`

3. Re-run `npm link`

## Project Structure

```
pdfert/
├── bin/
│   └── pdfert.js          # CLI entry point
├── lib/
│   └── converter.js        # Puppeteer PDF conversion logic
├── package.json
├── .gitignore
└── README.md
```

## Dependencies

| Package                                              | Purpose                           |
| ---------------------------------------------------- | --------------------------------- |
| [puppeteer](https://github.com/puppeteer/puppeteer)  | Headless Chrome for PDF rendering |
| [inquirer](https://github.com/SBoudrias/Inquirer.js) | Interactive terminal prompts      |

## How It Works

1. Scans the current working directory for `.html` files
2. Presents an interactive selection menu via Inquirer
3. Launches headless Chromium via Puppeteer
4. Navigates to the local HTML file and renders it
5. Generates a PDF with A4 format and zero margins
6. Saves the output alongside the original file

## License

[MIT](LICENSE) © 2026 KaungHtet
