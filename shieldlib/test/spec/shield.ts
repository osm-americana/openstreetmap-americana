"use strict";

import { expect } from "chai";
import { romanizeRef } from "../../src/shield";

describe("shield", function () {
  describe("#romanizeRef", function () {
    it("adds", function () {
      expect(romanizeRef("0")).to.be.eql("");
      expect(romanizeRef("1")).to.be.eql("I");
      expect(romanizeRef("2")).to.be.eql("II");
      expect(romanizeRef("5")).to.be.eql("V");
      expect(romanizeRef("6")).to.be.eql("VI");
      expect(romanizeRef("10")).to.be.eql("X");
      expect(romanizeRef("11")).to.be.eql("XI");
      expect(romanizeRef("50")).to.be.eql("L");
      expect(romanizeRef("51")).to.be.eql("LI");
      expect(romanizeRef("60")).to.be.eql("LX");
      expect(romanizeRef("61")).to.be.eql("LXI");
      expect(romanizeRef("100")).to.be.eql("C");
      expect(romanizeRef("101")).to.be.eql("CI");
      expect(romanizeRef("111")).to.be.eql("CXI");
      expect(romanizeRef("555")).to.be.eql("DLV");
      expect(romanizeRef("5000")).to.be.eql("MMMMM");
    });
    it("subtracts", function () {
      expect(romanizeRef("4")).to.be.eql("IV");
      expect(romanizeRef("9")).to.be.eql("IX");
      expect(romanizeRef("14")).to.be.eql("XIV");
      expect(romanizeRef("40")).to.be.eql("XL");
      expect(romanizeRef("49")).to.be.eql("XLIX");
      expect(romanizeRef("90")).to.be.eql("XC");
      expect(romanizeRef("99")).to.be.eql("XCIX");
      expect(romanizeRef("400")).to.be.eql("CD");
      expect(romanizeRef("499")).to.be.eql("CDXCIX");
      expect(romanizeRef("900")).to.be.eql("CM");
      expect(romanizeRef("999")).to.be.eql("CMXCIX");
      expect(romanizeRef("4000")).to.be.eql("MMMM");
    });
    it("preserves suffixes", function () {
      expect(romanizeRef("2A")).to.be.eql("IIA");
      expect(romanizeRef("2I")).to.be.eql("III");
    });
  });
});
