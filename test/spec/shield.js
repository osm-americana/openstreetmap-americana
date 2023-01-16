"use strict";

import chai, { expect } from "chai";
import * as Shield from "../../src/js/shield.js";

describe("shield", function () {
  describe("#isValidNetwork", function () {
    it("rejects a recreational network", function () {
      expect(Shield.isValidNetwork("BAB")).to.be.true;
      expect(Shield.isValidNetwork("rwn")).to.be.false;
    });
  });
  describe("#isValidRef", function () {
    it("rejects a null ref", function () {
      expect(Shield.isValidRef(null)).to.be.false;
    });
    it("rejects an empty ref", function () {
      expect(Shield.isValidRef("")).to.be.false;
    });
    it("rejects a long ref", function () {
      expect(Shield.isValidRef("ABC123")).to.be.true;
      expect(Shield.isValidRef("Equator")).to.be.false;
    });
  });
});
