import fs from "node:fs";
import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  webkit,
} from "@playwright/test";
import type * as maplibre from "maplibre-gl";

// Declare a global augmentation for the Window interface
declare global {
  interface WindowWithMap extends Window {
    map?: maplibre.Map;
  }
}

type SampleSpecification = {
  /** location on the map, a string in the format "z/lat/lon" */
  location: string;
  /** language of the map, a string in the format "abc,def-GH,ijk" */
  language?: string;
  /** name of this screenshot, used for the filename */
  name: string;
  /** Size in pixels of the clip */
  viewport: {
    /** Width of the clip */
    width: number;
    /** height of the clip */
    height: number;
  };
  /** If true, include the Americana demo map controls in the screenshot */
  controls?: boolean;
};

// Load list of locations to take map screenshots
const loadSampleLocations = (filePath: string): SampleSpecification[] => {
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
};

const sampleFolder = "./samples";

const jsonSampleLocations = process.argv[3] ?? "test/sample_locations.json";

console.log(`Loading sample locations from ${jsonSampleLocations}`);

const browserType = process.argv[2] ?? "chrome";
console.log(`Using browser type: ${browserType}`);

const screenshots: SampleSpecification[] =
  loadSampleLocations(jsonSampleLocations);

fs.mkdirSync(sampleFolder, { recursive: true });

let browser: Browser;

switch (browserType) {
  case "chrome":
  default:
    browser = await chromium.launch({
      executablePath: process.env.CHROME_BIN,
      args: ["--headless=new"],
    });
    break;
  case "firefox":
    browser = await firefox.launch();
    break;
  case "safari":
    browser = await webkit.launch();
}

const context: BrowserContext = await browser.newContext({
  bypassCSP: true,
});

const page = await context.newPage();

for (const screenshot of screenshots) {
  await page.setViewportSize(screenshot.viewport);
  await createImage(screenshot);
}

async function createImage(screenshot: SampleSpecification) {
  const pagePath: string = screenshot.controls ? "" : "bare_map.html";

  await page.goto(
    `http://localhost:1776/${pagePath}#map=${screenshot.location}&language=${
      screenshot.language || "en"
    }`
  );

  // Wait for map to load, then wait two more seconds for images, etc. to load.
  try {
    await page.waitForFunction(() => (window as WindowWithMap).map?.loaded(), {
      timeout: 3000,
    });
  } catch (e) {
    console.log(`Timed out waiting for map load`);
  }

  try {
    await page.screenshot({
      path: `${sampleFolder}/${screenshot.name}.png`,
      type: "png",
    });
    console.log(`Created ${sampleFolder}/${screenshot.name}.png`);
  } catch (err) {
    console.error(err);
  }
}

await browser.close();
