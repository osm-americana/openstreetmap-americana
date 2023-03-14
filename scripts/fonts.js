// read font file
import { Font } from "fonteditor-core";
import fs from "fs";
import { execSync } from "child_process";
import { promisify } from "util";
import { exec } from "child_process";

function createRangeArray(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function loadGoogleFonts(fontSpec, destFolder) {
  for (const fontFamily in fontSpec) {
    const downloadLockFile = `${downloadLockFolder}/${fontFamily}.lock`;
    if (fs.existsSync(downloadLockFile)) {
      console.log(`Already downloaded ${fontFamily}`);
      continue;
    }
    const variants = fontSpec[fontFamily].join(",");
    execSync(
      //Requires google-font-installer
      `npm exec -- gfi download "${fontFamily}" -v ${variants} -d ${destFolder}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          console.log(
            `Is google-font-installer present? Install with "npm install google-font-installer`
          );
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          console.log(
            `Is google-font-installer present? Install with "npm install google-font-installer`
          );
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
    console.log(`Downloaded ${fontFamily}`);
    fs.writeFileSync(downloadLockFile, "");
  }
}

const downloadLockFolder = "download/font-lock";
const downloadFolder = "download/font";
const distFontFolder = "dist/fonts";
const ttfFontFolder = "build/font/ttf";

[downloadFolder, ttfFontFolder, distFontFolder, downloadLockFolder].forEach(
  (folder) => {
    fs.mkdirSync(folder, { recursive: true }, (e) => {});
  }
);

const fontDef = JSON.parse(fs.readFileSync("scripts/fonts.json"));
const fontRanges = fontDef["glyph-ranges"];
const customFontStacks = fontDef["custom-font-stacks"];
const bundleFontStacks = fontDef["bundle-font-stacks"];
const fontFamilies = fontDef["font-families"];

loadGoogleFonts(fontFamilies, downloadFolder);

//Just copy fonts that are used unmodified
loadGoogleFonts(bundleFontStacks, ttfFontFolder);

for (const stack in customFontStacks) {
  let font;
  for (const stackPart in customFontStacks[stack]) {
    let stackPartDef = customFontStacks[stack][stackPart];
    const inputFontBuffer = fs.readFileSync(
      `${downloadFolder}/${stackPartDef.file}.ttf`
    );

    const ranges = stackPartDef.ranges;
    for (const range in ranges) {
      const namedRange = ranges[range];
      const numberedRanges = fontRanges[namedRange];
      for (const numberedRange in numberedRanges) {
        const subsetRange = numberedRanges[numberedRange];
        const subsetGlyphArray = createRangeArray(
          subsetRange[0],
          subsetRange[1]
        );
        const fontSegment = Font.create(inputFontBuffer, {
          type: "ttf",
          subset: subsetGlyphArray,
          hinting: true,
          compound2simple: true,
          inflate: null,
          combinePath: false,
        });
        if (font === undefined) {
          font = fontSegment;
          font.data.name = {
            copyright: "Repackaged from Google Fonts",
            fontFamily: "Americana",
            fullName: stack,
            manufacturer: "OpenStreetMap Americana Team",
          };
        } else {
          font.merge(fontSegment);
        }
      }
    }
  }

  // write font file
  const outputBuffer = font.write({
    // support ttf, woff, woff2, eot, svg
    type: "ttf",
    // save font hinting
    hinting: true,
    // deflate function for woff, eg. pako.deflate
    deflate: null,
    // for user to overwrite head.xMin, head.xMax, head.yMin, head.yMax, hhea etc.
    support: { head: {}, hhea: {} },
  });

  const ttfFile = `build/font/ttf/${stack}.ttf`;
  fs.writeFileSync(ttfFile, outputBuffer);
  console.log(`Built ${ttfFile}`);
}

const pbfBuilderFilename = "~/.cargo/bin/build_pbf_glyphs";

async function buildPbf() {
  try {
    const { stdout, stderr } = await promisify(exec)(
      `${pbfBuilderFilename} ${ttfFontFolder} ${distFontFolder}`
    );
    console.log(`${stdout}`);
    if (stderr) {
      console.log(`PBF stderr: ${stderr}`);
    }
  } catch (error) {
    console.log(`PBF build error: ${error.message}`);
    process.exit(-1);
  }
}

buildPbf();

console.log("Generated PBF fontstack.");
