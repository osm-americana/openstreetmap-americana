import fs from "fs";
import { basename } from "path";
import { execSync } from "child_process";

// Check if the right number of arguments are passed
if (process.argv.length !== 6) {
  console.log("Usage: <folder1> <folder2> <url-base> <sha>");
  process.exit(1);
}

const [folder1, folder2, urlBase, sha] = process.argv.slice(2);
const outputFolder = "samples-diff";

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Loop through files in folder1
fs.readdirSync(folder1)
  .filter((file) => file.endsWith(".png"))
  .forEach((file) => {
    const basefile = basename(file);

    // Check if file exists in folder2
    if (fs.existsSync(`${folder2}/${basefile}`)) {
      // Compare the files
      try {
        execSync(`cmp -s "${folder1}/${basefile}" "${folder2}/${basefile}"`);
      } catch (e) {
        // If files are different
        fs.copyFileSync(
          `${folder1}/${basefile}`,
          `${outputFolder}/${basefile.split(".")[0]}_${sha}_before.png`
        );
        fs.copyFileSync(
          `${folder2}/${basefile}`,
          `${outputFolder}/${basefile.split(".")[0]}_${sha}_after.png`
        );
      }
    }
  });

const outputMD = "pr_preview-extra.md";
let mdContent =
  "## Map Changes\n| Sample Name | Before | After |\n|-------------|--------|-------|\n";

// Loop through *_before.png files in the output folder
fs.readdirSync(outputFolder)
  .filter((file) => file.endsWith("_before.png"))
  .forEach((before_file) => {
    const basefile = basename(before_file, `_${sha}_before.png`);

    // Check if the after file exists
    if (fs.existsSync(`${outputFolder}/${basefile}_${sha}_after.png`)) {
      // Add an entry to the markdown table
      mdContent += `| ${basefile} | ![before](${urlBase}${before_file}) | ![after](${urlBase}${outputFolder}/${basefile}_${sha}_after.png) |\n`;
    }
  });

fs.writeFileSync(outputMD, mdContent);
