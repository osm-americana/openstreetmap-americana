import {
  calculateDifference,
  mdCompareRow,
} from "../../scripts/object_compare";
import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";

const a = 3;
const b = 4;

const simpleA = { a };
const simpleB = { b };

const complexA = { foo: { a } };
const complexB = { bar: { b } };

const simpleA0 = { a: 0 };
const complexA0 = { foo: { a: 0 } };

const negSimpleA = { a: -a };
const negComplexA = { foo: { a: -a } };

const diffSimpleAB = { a: -a, b };
const diffComplexAB = { foo: { a: -a }, bar: { b } };

const aStr = a.toLocaleString("en");

const simpleAAmdRow = `a | ${aStr} | ${aStr} | 0 | 0.0%`;
const simpleAnullmdRow = `a | ${aStr} | N/A | ${-aStr} | -100.0%`;

describe("stats_compare", function () {
  describe("#calculateDifference", function () {
    it("tests stats equality", function () {
      expect(calculateDifference(simpleA, simpleA)).to.deep.equal(simpleA0);
      expect(calculateDifference(complexA, complexA)).to.deep.equal(complexA0);
    });
    it("tests stats remove", function () {
      expect(calculateDifference(simpleA, null)).to.deep.equal(negSimpleA);
      expect(calculateDifference(complexA, null)).to.deep.equal(negComplexA);
    });
    it("tests stats add", function () {
      expect(calculateDifference(null, simpleA)).to.deep.equal(simpleA);
      expect(calculateDifference(null, complexA)).to.deep.equal(complexA);
    });
    it("tests stats diff", function () {
      expect(calculateDifference(simpleA, simpleB)).to.deep.equal(diffSimpleAB);
      expect(calculateDifference(complexA, complexB)).to.deep.equal(
        diffComplexAB
      );
    });
  });
  describe("#mdCompareRow", function () {
    it("tests md compare same", function () {
      expect(mdCompareRow("a", simpleA.a, simpleA.a, simpleA0.a)).to.deep.equal(
        simpleAAmdRow
      );
      expect(mdCompareRow("a", simpleA.a, null, negSimpleA.a)).to.deep.equal(
        simpleAnullmdRow
      );
    });
  });

  describe("#calculateDifference with JSON test cases", function () {
    interface Stats {
      layerCount: number;
      styleSize: number;
      gzipStyleSize: number;
      shieldJSONSize: number;
      gzipShieldJSONSize: number;
      spriteSheet1xSize: number;
      spriteSheet2xSize: number;
      layerGroup: {
        [key: string]: {
          layerCount: number;
          size: number;
        };
      };
    }

    function loadStats(filename: string): Stats {
      const filePath = path.join(
        path.dirname(new URL(import.meta.url).pathname),
        "test-cases",
        filename
      );
      const content = fs.readFileSync(filePath, "utf8");
      return JSON.parse(content);
    }

    it("tests layer group added", function () {
      const baseStats = loadStats("base_stats.json");
      const addedStats = loadStats("layer_group_added.json");
      const difference = calculateDifference(baseStats, addedStats);

      // Check that urbanareas was added
      expect(difference.layerGroup.urbanareas).to.deep.equal({
        size: 18183,
        layerCount: 3,
      });

      // Check that place was modified
      expect(difference.layerGroup.place).to.deep.equal({
        size: -18113, // 21701 - 39814
        layerCount: -3, // 9 - 12
      });

      // Check overall stats changes
      expect(difference.layerCount).to.equal(3); // 350 - 347
      expect(difference.styleSize).to.equal(70); // 1122329 - 1122259
    });

    it("tests layer group removed", function () {
      const baseStats = loadStats("base_stats.json");
      const removedStats = loadStats("layer_group_removed.json");
      const difference = calculateDifference(baseStats, removedStats);

      // Check that place was removed (negated)
      expect(difference.layerGroup.place).to.deep.equal({
        size: -39814, // -39814
        layerCount: -12, // -12
      });

      // Check overall stats changes
      expect(difference.layerCount).to.equal(-12); // 335 - 347
      expect(difference.styleSize).to.equal(-7259); // 1115000 - 1122259
    });

    it("tests mixed changes (removed and added)", function () {
      const removedStats = loadStats("layer_group_removed.json");
      const addedStats = loadStats("layer_group_added.json");
      const difference = calculateDifference(removedStats, addedStats);

      // Check that place was added back (since it was removed in removedStats)
      expect(difference.layerGroup.place).to.deep.equal({
        size: 21701, // Just the new value since it was missing in removedStats
        layerCount: 9, // Just the new value since it was missing in removedStats
      });

      // Check that urbanareas was added
      expect(difference.layerGroup.urbanareas).to.deep.equal({
        size: 18183,
        layerCount: 3,
      });

      // Check overall stats changes
      expect(difference.layerCount).to.equal(15); // 350 - 335
      expect(difference.styleSize).to.equal(7329); // 1122329 - 1115000
    });
  });
});
