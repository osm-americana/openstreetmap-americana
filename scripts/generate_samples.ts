import fs from "fs";
import { chromium } from "@playwright/test";

// Declare a global augmentation for the Window interface
declare global {
  interface Window {
    map: {
      loaded: () => boolean;
    };
  }
}

type LocationClip = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type SampleSpecification = {
  location: string;
  name: string;
  viewport: {
    width: number;
    height: number;
  };
  clip: LocationClip;
};

// Load list of locations to take map screenshots
const loadSampleLocations = (filePath: string): SampleSpecification[] => {
  const rawData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
};

const sampleFolder = "./samples";

const screenshots: SampleSpecification[] = loadSampleLocations(
  "test/sample_locations.json"
);

fs.mkdirSync(sampleFolder, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();

const page = await context.newPage();

for (const screenshot of screenshots) {
  // Set viewport and double deviceScaleFactor to get a closer shot of the map
  await page.setViewportSize(screenshot.viewport);

  await createImage(screenshot);
}

async function createImage(screenshot: SampleSpecification) {
  await page.goto(`http://localhost:1776/#map=${screenshot.location}`);

  // Wait for map to load, then wait two more seconds for images, etc. to load.
  try {
    await page.waitForFunction(() => window.map && window.map.loaded(), {
      timeout: 3000,
    });

    // Wait for 1.5 seconds on 3D model examples, since this takes longer to load.
    const waitTime = 1500;
    console.log(`waiting for ${waitTime} ms`);
    await page.waitForTimeout(waitTime);
  } catch (e) {
    console.log(`Timed out waiting for map load`);
  }

  try {
    await page.screenshot({
      path: `${sampleFolder}/${screenshot.name}.png`,
      type: "png",
      clip: screenshot.clip,
    });
    console.log(`Created ${sampleFolder}/${screenshot.name}.png`);
  } catch (err) {
    console.log(err);
  }
}

await browser.close();
