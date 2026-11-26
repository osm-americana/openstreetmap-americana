import { expect } from "chai";
import { filterNetworks } from "../../src/js/shield_format.js";

describe("shield_format", function () {
  describe("filterNetworks", function () {
    it("matches recreational route scope networks", function () {
      expect(filterNetworks.test("rwn")).to.be.true;
      expect(filterNetworks.test("lcn")).to.be.true;
      expect(filterNetworks.test("US:I")).to.be.false;
    });
  });
});
