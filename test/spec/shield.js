"use strict";

import { expect } from "chai";
import {
  routeParser,
  shieldPredicate,
  networkPredicate,
} from "../../src/js/shield_format";
import { loadShields } from "../../src/js/shield_defs";
import {
  ShieldRenderer,
  InMemorySpriteRepository,
} from "@americana/maplibre-shield-generator";

import { HeadlessGraphicsFactory } from "@americana/maplibre-shield-generator/src/headless_graphics";

const shields = loadShields();
const mockRepo = new InMemorySpriteRepository();

const shieldRenderer = new ShieldRenderer(shields, routeParser)
  .filterImageID(shieldPredicate)
  .filterNetwork(networkPredicate)
  .graphicsFactory(new HeadlessGraphicsFactory())
  .renderOnRepository(mockRepo);

const handler = shieldRenderer.getStyleImageMissingHandler();

handler({ id: "shield\nBAB\n5\n\n" });
handler({ id: "shield\nUS:RI\n\n\n" });
handler({ id: "shield\nUS:RI\nABC123\n\n" });
handler({ id: "shield\nUS:RI\nEquator\n\n" });
handler({ id: "shield\nrwn\n\n\n" });
handler({ id: "foo" });

function isBlankSprite(id) {
  return mockRepo.getSprite(id).width == 1;
}

describe("shield", function () {
  describe("#isValidNetwork", function () {
    it("rejects a recreational network", function () {
      expect(isBlankSprite("shield\nBAB\n5\n\n")).to.be.false;
      expect(isBlankSprite("shield\nrwn\n\n\n")).to.be.true;
    });
    it("rejects other missing image prefixes", function () {
      expect(mockRepo.hasSprite("foo")).to.be.false;
    });
  });
  describe("#isValidRef", function () {
    it("rejects an empty ref", function () {
      expect(isBlankSprite("shield\nUS:RI\n\n\n")).to.be.true;
    });
    it("rejects a long ref", function () {
      expect(mockRepo.hasSprite("shield\nUS:RI\nABC123\n\n")).to.be.true;
      expect(isBlankSprite("shield\nUS:RI\nABC123\n\n")).to.be.false;
      expect(isBlankSprite("shield\nUS:RI\nEquator\n\n")).to.be.true;
    });
  });
});
