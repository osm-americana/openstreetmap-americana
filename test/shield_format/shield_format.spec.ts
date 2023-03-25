import { expect } from "chai";
import { shieldPredicate, routeParser } from "../../src/js/shield_format.js";

const image_id_I95 = "shield\nUS:I=95";
const route_def_I95 = {
  network: "US:I",
  ref: "95",
};

describe("shield_format", function () {
  describe("shieldPredicate", function () {
    it("rejects a non-shield images IDs", function () {
      expect(shieldPredicate(image_id_I95)).to.be.true;
      expect(shieldPredicate("poi\nice_cream")).to.be.false;
    });
  });
  describe("routeParser", function () {
    it("extracts a route", function () {
      let extractedDef = routeParser.parse(image_id_I95);
      expect(extractedDef.network).to.be.equal(route_def_I95.network);
      expect(extractedDef.ref).to.be.equal(route_def_I95.ref);
    });
  });
});
