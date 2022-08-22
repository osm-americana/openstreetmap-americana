"use strict";

import { map } from "./americana.js";
import * as shield from "./js/shield.js";
import { shields } from "./js/shield_defs.js";
import * as gfx from "./js/screen_gfx.js";

const once = (emitter, name, { signal } = {}) =>
  new Promise((resolve, reject) => {
    emitter.once(name, resolve);
    signal?.addEventListener("abort", reject);
  });

await once(map, "load");

let networks = [
  "default",

  // Circles, pills, ovals
  "US:DE",
  "KR:national",
  "US:IA",
  "US:NM",
  "US:KS",

  // Rectangles
  "US:CT",
  "US:AR:Lee",
  "US:AR:Baxter",
  "US:WY",
  "CA:NS:R",
  "CA:YT",

  // Basic Angular Shapes
  "CA:ON:secondary",
  "US:NE",
  "US:MN:Aitkin:Park_Access",
  "US:PA",
  "US:PA:Turnpike",

  "CA:AB:primary",
  "CA:SK:tertiary",
  "CA:SK:primary",
  "PH:N",
  "PH:E",
  "US:TX:Montgomery:MCTRA",

  "US:TN:secondary",
  "US:NC",

  "US:IA:CR",
  "US:CO:Douglas",
  "US:MN:Aitkin:CSAH",
  "US:TX:Harris:HCTRA",

  "JP:prefectural",

  "my:federal",
  "TR:motorway",
  "US:NY",
  "US:NY:Parkway",
  "NL:S:Amsterdam",

  // Basic Rounded Shapes
  "US:GU",

  "US:HI",
  "US:CA",

  "US:OR",

  "JP:national",
  "TW:expressway",
  "US:TX:Fort_Bend:FBCTRA",
  "US:VA",
  "US:PR:primary",
  "HK",
  "PK:motorway",
  "NZ:SH",

  // Basic shapes with more detail
  "US:I",
  "US:I:Business:Loop",

  "CA:QC:A",
  "CA:NS:H",

  "CA:PE",
  "US:FL:Toll",
  "CA:BC",
  "US:US",
  "US:US:Historic",
  "CL:national",

  "md:national",
  "KR:expressway",
  "CA:QC:R",
  "VE:T:AM",
  "co:national",
  "US:BIA",
  "US:MT:secondary",

  "TW:freeway",
  "US:UT",
  "US:MP",
  "US:WI",
  "CA:MB:Winnipeg",
  "US:AS",

  // Fancy Rectangles
  "US:AK",
  "US:KY:Parkway",
  "US:MD",
  "US:MN",
  "US:ID",
  "US:CO",
  "US:CO:E470",
  "US:DC",
  "US:FL",
  "US:NH",
  "US:NY:Parkway:NYC",
  "US:OK",
  "US:SC",
  "US:TN:primary",
  "US:VT",
  "US:WI:Rustic",
  "CA:NT",
  "CA:SK:secondary",
  "CN:expressway",
  "CN:AH:expressway",

  // Detailed Shapes
  "US:AL",
  "US:AR",

  "US:AZ",
  "US:GA",
  "US:LA",
  "US:MO",

  "US:ND",
  "US:NV",
  "US:OH",
  "US:OH:ASD",
  "US:OH:SCI",
  "US:OH:TUS:Salem",
  "US:SD",
  "US:TX:FM",
  "US:WA",
  "CA:transcanada",
  "CA:NB:primary",
  "CA:ON:primary",
  "CA:ON:primary:Toll",

  // With banners
  "US:I:Truck",
  "US:I:Express",
  "US:US:Business",
  "US:US:Spur",
  "US:US:Business:Alternate",
  "US:US:Alternate:Truck:Business",
  "US:AL:Truck",
  "US:AZ:Loop",
  "US:CA:Business",
  "US:DE:Truck",
  "US:GA:Connector",
  "US:LA:Business",
  "US:MD:Business",
  "US:VT:Alternate",
  "US:MO:Spur",
  "US:NC:Bypass",
  "US:ND:Alternate",
  "US:NE:Link",
  "US:NH:Bypass",
  "US:OH:Business",
  "US:OK:Spur",
  "US:OR:Business",
  "US:PA:Truck",
  "US:SC:Business",
  "US:TX:Park",
  "US:WA:Spur",
  "US:WI:Spur",
  "CA:ON:Waterloo:Wilmot",
  "CA:ON:Brant:Highway",
  "CA:ON:Muskoka:West",
];

// Uncomment for a list of all supported networks.  This makes for a very long page.
//networks = Object.keys(shields);

let refs = [
  "1",
  "5",
  "11",
  "81",
  "69",
  "95",
  "111",
  "281",
  "980",
  "H201",
  "480N",
  "A 562",
];

export function getShieldCanvas(shield_id) {
  let ctx = shield.generateShieldCtx(shield_id);
  if (ctx == null) {
    // Want to return null here, but that gives a corrupted display. See #243
    console.warn("Didn't produce a shield for", JSON.stringify(e.id));
    ctx = gfx.getGfxContext({ width: 1, height: 1 });
  }
  return ctx.canvas;
}

const PXR = gfx.getPixelRatio();

let table = document.querySelector("#shield-table");

for (let network of networks) {
  let row = table.insertRow();
  row.insertCell().appendChild(document.createTextNode(`${network}`));
  for (let ref of refs) {
    let cell = row.insertCell();
    let shield_id = `shield\n${network}=${ref}`;
    let shieldCanvas = getShieldCanvas(shield_id);
    let img = document.createElement("img");
    img.src = shieldCanvas.toDataURL("image/png");
    img.width = shieldCanvas.width / PXR;
    img.height = shieldCanvas.height / PXR;
    cell.appendChild(img);
  }
}
