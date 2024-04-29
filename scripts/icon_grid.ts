import sharp from "sharp";
import fs from "fs";
import path from "path";

const svgFilename = process.argv[2];
const outputFilenameBase = path.parse(svgFilename).name;
const outputFilename = `${outputFilenameBase}_preview.png`;
const scale = 40;

// Function to generate a pixel grid
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

// Convert and scale SVG
async function convertAndScaleSVG(svgFilename: string): Promise<void> {
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

if (!svgFilename) {
  console.error("Please provide an SVG filename.");
  process.exit(1);
}

try {
  await convertAndScaleSVG(svgFilename);
} catch (error) {
  console.error("Error: ", error);
  process.exit(1);
}
