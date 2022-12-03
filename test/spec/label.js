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

  describe("#getLocales", function () {
    beforeEach(function () {
      global.window = {};
      global.navigator = {};
    });
    afterEach(function () {
      delete global.window;
      delete global.navigator;
    });

    it("gets locales from preferences", function () {
      window.location = new URL("http://localhost:1776/#map=1/2/3");
      navigator = { languages: ["tlh-UN", "ase"], language: "tlh" };
      expect(Label.getLocales()).to.eql(["tlh-UN", "tlh", "ase"]);
    });
    it("gets locales from the URL", function () {
      window.location = new URL(
        "http://localhost:1776/#map=1/2/3&language=tlh-UN,ase"
      );
      expect(Label.getLocales()).to.eql(["tlh-UN", "tlh", "ase"]);
    });
  });

  describe("#getLocalizedNameExpression", function () {
    it("coalesces names in each locale", function () {
      expect(
        Label.getLocalizedNameExpression(["en-US", "en", "fr"], false)
      ).to.eql([
        "coalesce",
        ["get", "name:en-US"],
        ["get", "name:en"],
        ["get", "name:fr"],
        ["get", "name"],
      ]);
    });
    it("falls back from English to Romanization", function () {
      expect(Label.getLocalizedNameExpression(["en-US", "en"], false)).to.eql([
        "coalesce",
        ["get", "name:en-US"],
        ["get", "name:en"],
        ["get", "name:latin"],
        ["get", "name"],
      ]);
    });
    it("includes legacy fields", function () {
      expect(
        Label.getLocalizedNameExpression(["en-US", "en", "de"], true)
      ).to.eql([
        "coalesce",
        ["get", "name:en-US"],
        ["get", "name:en"],
        ["get", "name_en"],
        ["get", "name:de"],
        ["get", "name_de"],
        ["get", "name"],
      ]);
    });
  });

  describe("#updateVariable", function () {
    it("replaces the value at the correct index", function () {
      let expr = [
        "let",
        "one",
        "won",
        "two",
        "too",
        "three",
        "tree",
        ["get", "fore"],
      ];
      Label.updateVariable(expr, "one", 1);
      Label.updateVariable(expr, "two", 2);
      Label.updateVariable(expr, "three", 3);
      expect(expr).to.eql([
        "let",
        "one",
        1,
        "two",
        2,
        "three",
        3,
        ["get", "fore"],
      ]);
    });
    it("avoids updating non-let expressions", function () {
      let expr = ["get", "fore"];
      Label.updateVariable(expr, "fore", 4);
      expect(expr).to.eql(["get", "fore"]);
    });
  });

  describe("#localizeLayers", function () {
    it("updates localized name", function () {
      let layers = [
        {
          layout: {
            "text-field": "Null Island",
          },
        },
        {
          layout: {
            "text-field": Label.localizedName,
          },
        },
      ];
      Label.localizeLayers(layers, ["en"]);
      expect(layers[0].layout["text-field"]).to.eql("Null Island");
      expect(layers[1].layout["text-field"][2]).to.deep.include([
        "get",
        "name:en",
      ]);
    });
    it("uses legacy name fields in transportation name layers", function () {
      let layers = [
        {
          "source-layer": "transportation_name",
          layout: {
            "text-field": Label.localizedName,
          },
        },
      ];
      Label.localizeLayers(layers, ["en"]);
      expect(layers[0].layout["text-field"][2]).to.deep.include([
        "get",
        "name_en",
      ]);
    });
    it("updates collator", function () {
      let layers = [
        {
          layout: {
            "text-field": [
              "let",
              "localizedCollator",
              "",
              ["var", "localizedCollator"],
            ],
          },
        },
      ];
      Label.localizeLayers(layers, ["tlh"]);
      expect(layers[0].layout["text-field"][2][0]).to.eql("collator");
      expect(layers[0].layout["text-field"][2][1]["case-sensitive"]).to.be
        .false;
      expect(layers[0].layout["text-field"][2][1]["diacritic-sensitive"]).to.be
        .true;
      expect(layers[0].layout["text-field"][2][1].locale).to.eql("tlh");
    });
    it("updates diacritic-insensitive collator in English", function () {
      let layers = [
        {
          layout: {
            "text-field": [
              "let",
              "diacriticInsensitiveCollator",
              "",
              ["var", "diacriticInsensitiveCollator"],
            ],
          },
        },
      ];
      Label.localizeLayers(layers, ["en-US"]);
      expect(layers[0].layout["text-field"][2][0]).to.eql("collator");
      expect(layers[0].layout["text-field"][2][1]["case-sensitive"]).to.be
        .false;
      expect(layers[0].layout["text-field"][2][1]["diacritic-sensitive"]).to.be
        .false;
      expect(layers[0].layout["text-field"][2][1].locale).to.eql("en-US");
    });
    it("updates diacritic-insensitive collator in a language other than English", function () {
      let layers = [
        {
          layout: {
            "text-field": [
              "let",
              "diacriticInsensitiveCollator",
              "",
              ["var", "diacriticInsensitiveCollator"],
            ],
          },
        },
      ];
      Label.localizeLayers(layers, ["enm"]);
      expect(layers[0].layout["text-field"][2][1]["diacritic-sensitive"]).to.be
        .true;
    });
  });
});
