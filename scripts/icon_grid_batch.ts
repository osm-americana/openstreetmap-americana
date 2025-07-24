import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ICONS_DIR = "icons";
const OUTPUT_DIR = "dist/icon-grids";
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Get changed/new icons from git diff
const diff = execSync(
  `git diff --name-status origin/main...HEAD -- ${ICONS_DIR}/`
)
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("\t"))
  .filter(
    ([status, file]) =>
      (status === "A" || status === "M") && file.endsWith(".svg")
  )
  .map(([, file]) => file);

let md = `## Changed/New Icons\n\n`;

if (diff.length === 0) {
  md += "No icon changes detected.\n";
} else {
  for (const icon of diff) {
    const outPng = path.join(
      OUTPUT_DIR,
      path.basename(icon, ".svg") + "_preview.png"
    );
    try {
      execSync(`npm run icon_grid -- ${icon}`);
      fs.renameSync(path.basename(icon, ".svg") + "_preview.png", outPng);
      md += `- \`${icon}\`<br><img src="./${outPng}" height="80"/>\n`;
    } catch (e) {
      md += `- \`${icon}\` (error generating preview)\n`;
    }
  }
}

fs.writeFileSync(path.join(OUTPUT_DIR, "icon-changes.md"), md);
console.log("Wrote icon grid previews and markdown.");
