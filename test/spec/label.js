"use strict";

import chai, { expect } from "chai";
import * as Label from "../../src/constants/label.js";

describe("label", function () {
  describe("#getLanguageFromURL", function () {
    it("accepts an unset language", function () {
      expect(
        Label.getLanguageFromURL(new URL("http://localhost:1776/#map=1/2/3"))
      ).to.be.null;
    });
    it("accepts an empty language", function () {
      expect(
        Label.getLanguageFromURL(
          new URL("http://localhost:1776/#map=1/2/3&language=")
        )
      ).to.eql("");
    });
    it("accepts an ISO 639 code", function () {
      expect(
        Label.getLanguageFromURL(
          new URL("http://localhost:1776/#map=1/2/3&language=tlh")
        )
      ).to.eql("tlh");
    });
    it("accepts arbitrary text", function () {
      expect(
        Label.getLanguageFromURL(
          new URL(
            "http://localhost:1776/#map=1/2/3&language=the King's English"
          )
        )
      ).to.eql("the King's English");
    });
  });
});
