import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import sharp from "sharp";

const mainIconsDir = process.argv[2];
const prIconsDir = process.argv[3];
const outputDir = process.argv[4] || "icon-grids";

if (!mainIconsDir || !prIconsDir) {
  console.error("Usage: <main-icons-dir> <pr-icons-dir> [output-dir]");
  process.exit(1);
}

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const scale = 40;

// Function to generate a pixel grid (copied from icon_grid.ts)
function generateGridPattern(xOffset: number, yOffset: number): Buffer {
  const gridSvg = `<svg width="${scale}" height="${scale}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${scale}" height="${scale}" fill="none"/>
        <path d="M ${scale - xOffset} 0 V ${scale} M 0 ${
    scale - yOffset
  } H ${scale}" stroke="magenta" stroke-opacity="0.9" stroke-width="1"/>
        <path d="M ${scale / 2 - xOffset} 0 V ${scale} M 0 ${
    scale / 2 - yOffset
  } H ${scale}" stroke="gray" stroke-opacity="0.2" stroke-width="1"/>
  </svg>`;
  return Buffer.from(gridSvg);
}

// Convert and scale SVG (copied from icon_grid.ts)
async function convertAndScaleSVG(svgFilename: string, outputFilename: string): Promise<void> {
  const svgBuffer = fs.readFileSync(svgFilename);

  // Get dimensions of the original SVG
  const metadata = await sharp(svgBuffer).metadata();
  const width = metadata.width! * scale;
  const height = metadata.height! * scale;

  // Resize the SVG
  const resizedSvgBuffer = await sharp(svgBuffer, {
    density: 72 * scale,
  })
    .resize(width, height)
    .toBuffer();

  const xOffset: number = metadata.width! % 2 == 0 ? scale / 2 : 0;
  const yOffset: number = metadata.height! % 2 == 0 ? scale / 2 : 0;

  // Generate a pixel grid pattern
  const gridPattern = generateGridPattern(xOffset, yOffset);

  // Composite the scaled image over the grid
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 211, g: 211, b: 211, alpha: 1 }, // Light gray to show white borders
    },
  })
    .composite([
      { input: resizedSvgBuffer, blend: "over" },
      { input: gridPattern, tile: true, blend: "over" },
    ])
    .toFile(outputFilename);
  console.log(`Wrote ${outputFilename}`);
}

// Get list of SVG files in a directory
function getSvgFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.svg'))
    .map(file => path.join(dir, file));
}

// Check if two files are different
function filesAreDifferent(file1: string, file2: string): boolean {
  try {
    execSync(`cmp -s "${file1}" "${file2}"`);
    return false; // Files are identical
  } catch (e) {
    return true; // Files are different
  }
}

// Main function
async function main() {
  const mainSvgFiles = getSvgFiles(mainIconsDir);
  const prSvgFiles = getSvgFiles(prIconsDir);
  
  const changedIcons: string[] = [];
  const newIcons: string[] = [];
  
  // Check for changed icons
  for (const prFile of prSvgFiles) {
    const filename = path.basename(prFile);
    const mainFile = path.join(mainIconsDir, filename);
    
    if (fs.existsSync(mainFile)) {
      if (filesAreDifferent(mainFile, prFile)) {
        changedIcons.push(filename);
      }
    } else {
      newIcons.push(filename);
    }
  }
  
  // Generate icon grids for changed and new icons
  const allChangedIcons = [...changedIcons, ...newIcons];
  
  for (const icon of allChangedIcons) {
    const prIconPath = path.join(prIconsDir, icon);
    const outputFilename = path.join(outputDir, `${path.parse(icon).name}_preview.png`);
    
    try {
      await convertAndScaleSVG(prIconPath, outputFilename);
    } catch (error) {
      console.error(`Error generating grid for ${icon}:`, error);
    }
  }
  
  // Generate markdown report
  let mdContent = "## Icon Changes\n\n";
  
  if (allChangedIcons.length === 0) {
    mdContent += "No icon changes detected.\n";
  } else {
    mdContent += `### Changed Icons (${changedIcons.length})\n`;
    for (const icon of changedIcons) {
      const iconName = path.parse(icon).name;
      mdContent += `- \`${icon}\` ![${iconName}](${outputDir}/${iconName}_preview.png)\n`;
    }
    
    if (newIcons.length > 0) {
      mdContent += `\n### New Icons (${newIcons.length})\n`;
      for (const icon of newIcons) {
        const iconName = path.parse(icon).name;
        mdContent += `- \`${icon}\` ![${iconName}](${outputDir}/${iconName}_preview.png)\n`;
      }
    }
  }
  
  // Write markdown report
  fs.writeFileSync(path.join(outputDir, "icon-changes.md"), mdContent);
  
  console.log(`Generated icon grids for ${allChangedIcons.length} icons in ${outputDir}/`);
  console.log(`Changed icons: ${changedIcons.length}`);
  console.log(`New icons: ${newIcons.length}`);
}

main().catch(console.error); 