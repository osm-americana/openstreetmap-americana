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

  describe("#romanizeRef", function () {
    it("adds", function () {
      expect(Shield.romanizeRef("0")).to.be.eql("");
      expect(Shield.romanizeRef("1")).to.be.eql("I");
      expect(Shield.romanizeRef("2")).to.be.eql("II");
      expect(Shield.romanizeRef("5")).to.be.eql("V");
      expect(Shield.romanizeRef("6")).to.be.eql("VI");
      expect(Shield.romanizeRef("10")).to.be.eql("X");
      expect(Shield.romanizeRef("11")).to.be.eql("XI");
      expect(Shield.romanizeRef("50")).to.be.eql("L");
      expect(Shield.romanizeRef("51")).to.be.eql("LI");
      expect(Shield.romanizeRef("60")).to.be.eql("LX");
      expect(Shield.romanizeRef("61")).to.be.eql("LXI");
      expect(Shield.romanizeRef("100")).to.be.eql("C");
      expect(Shield.romanizeRef("101")).to.be.eql("CI");
      expect(Shield.romanizeRef("111")).to.be.eql("CXI");
      expect(Shield.romanizeRef("555")).to.be.eql("DLV");
      expect(Shield.romanizeRef("5000")).to.be.eql("MMMMM");
    });
    it("subtracts", function () {
      expect(Shield.romanizeRef("4")).to.be.eql("IV");
      expect(Shield.romanizeRef("9")).to.be.eql("IX");
      expect(Shield.romanizeRef("14")).to.be.eql("XIV");
      expect(Shield.romanizeRef("40")).to.be.eql("XL");
      expect(Shield.romanizeRef("49")).to.be.eql("XLIX");
      expect(Shield.romanizeRef("90")).to.be.eql("XC");
      expect(Shield.romanizeRef("99")).to.be.eql("XCIX");
      expect(Shield.romanizeRef("400")).to.be.eql("CD");
      expect(Shield.romanizeRef("499")).to.be.eql("CDXCIX");
      expect(Shield.romanizeRef("900")).to.be.eql("CM");
      expect(Shield.romanizeRef("999")).to.be.eql("CMXCIX");
      expect(Shield.romanizeRef("4000")).to.be.eql("MMMM");
    });
    it("preserves suffixes", function () {
      expect(Shield.romanizeRef("2A")).to.be.eql("IIA");
      expect(Shield.romanizeRef("2I")).to.be.eql("III");
    });
  });
});
