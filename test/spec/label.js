"use strict";

import { expect } from "chai";
import * as Label from "../../src/constants/label.js";
import { expression } from "@maplibre/maplibre-gl-style-spec";

function localizedTextField(textField, locales) {
  let layers = [
    {
      layout: {
        "text-field": textField,
      },
    },
  ];
  Label.localizeLayers(layers, locales);
  return layers[0].layout["text-field"];
}

function expressionContext(properties) {
  return {
    properties: () => properties,
  };
}

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
      ).to.be.null;
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
            "text-field": [...Label.localizedName],
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
            "text-field": [...Label.localizedName],
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
    it("updates country names in English", function () {
      Label.localizeLayers([], ["en-US"]);
      expect(Object.keys(Label.countryNamesByCode).length).to.be.at.least(200);
      expect(Label.countryNamesByCode.MEX).to.be.eql("MEXICO");
    });
    it("updates country names in a language other than English", function () {
      Label.localizeLayers([], ["eo"]);
      expect(Object.keys(Label.countryNamesByCode).length).to.be.at.least(200);
      expect(Label.countryNamesByCode.USA).to.be.eql("USONO");
    });
    it("widens spaces", function () {
      Label.localizeLayers([], ["en-US"]);
      expect(Label.countryNamesByCode.USA).to.be.eql("UNITED  STATES");
    });
    it("returns undefined for a nonexistent country", function () {
      Label.localizeLayers([], ["en-US"]);
      expect(Label.countryNamesByCode.UNO).to.be.undefined;
    });
  });

  describe("#localizedName", function () {
    let evaluatedExpression = (locales, properties) =>
      expression
        .createExpression(localizedTextField([...Label.localizedName], ["en"]))
        .value.expression.evaluate(expressionContext(properties));

    it("is empty by default", function () {
      expect(
        expression
          .createExpression(Label.localizedName)
          .value.expression.evaluate(
            expressionContext({
              name: "Null Island",
            })
          )
      ).to.be.eql("");
    });
    it("localizes to preferred language", function () {
      expect(
        evaluatedExpression(["en"], {
          "name:en": "Null Island",
          name: "Insula Nullius",
        })
      ).to.be.eql("Null Island");
    });
  });

  describe("#localizedNameWithLocalGloss", function () {
    let evaluatedExpression = (locales, properties) =>
      expression
        .createExpression(
          localizedTextField([...Label.localizedNameWithLocalGloss], locales)
        )
        .value.expression.evaluate(expressionContext(properties));

    let evaluatedLabelAndGloss = (locales, properties) => {
      let evaluated = evaluatedExpression(locales, properties);
      if (typeof evaluated === "string") {
        return [evaluated];
      }
      return [evaluated.sections[0].text, evaluated.sections[3]?.text];
    };

    let expectGloss = (
      locale,
      localized,
      local,
      expectedLabel,
      expectedGloss
    ) => {
      let properties = {
        name: local,
      };
      properties[`name:${locale}`] = localized;
      expect(evaluatedLabelAndGloss([locale], properties)).to.be.deep.equal([
        expectedLabel,
        expectedGloss,
      ]);
    };

    it("puts an unlocalized name by itself", function () {
      let evaluated = evaluatedExpression(["en"], {
        name: "Null Island",
      });

      expect(evaluated.sections.length).to.be.eql(1);
      expect(evaluated.sections[0].text).to.be.eql("Null Island");
    });
    it("spreads multiple unlocalized names across multiple lines", function () {
      let evaluated = evaluatedExpression(["en"], {
        name: "Null Island;Insula Nullius",
      });

      expect(evaluated.sections.length).to.be.eql(1);
      expect(evaluated.sections[0].text).to.be.eql(
        "Null Island\nInsula Nullius"
      );
    });
    it("glosses an anglicized name with the local name", function () {
      let evaluated = evaluatedExpression(["en"], {
        "name:en": "Null Island",
        name: "Insula Nullius",
      });

      expect(evaluated.sections.length).to.be.eql(5);
      expect(evaluated.sections[0].text).to.be.eql("Null Island");
      expect(evaluated.sections[1].text).to.be.eql("\n");
      expect(evaluated.sections[2].text).to.be.eql("(\u2068");
      expect(evaluated.sections[3].text).to.be.eql("Insula Nullius");
      expect(evaluated.sections[4].text).to.be.eql("\u2069)");

      expect(evaluated.sections[3].scale).to.be.below(1);
    });
    it("deduplicates matching anglicized and local names", function () {
      expectGloss("en", "Null Island", "Null Island", "Null Island");
      expectGloss("en", "Null Island", "NULL Island", "Null Island");
      expectGloss("en", "Montreal", "Montréal", "Montréal");
      expectGloss("en", "Quebec City", "Québec", "Québec City");
      expectGloss("en", "Da Nang", "Đà Nẵng", "Đà Nẵng");
      expectGloss("en", "Nūll Island", "Ñüłl Íşlåńđ", "Ñüłl Íşlåńđ");
      expectGloss("en", "New York City", "New York", "New York City");
      expectGloss("en", "Washington, D.C.", "Washington", "Washington, D.C.");
      expectGloss(
        "en",
        "Santiago de Querétaro",
        "Querétaro",
        "Santiago de Querétaro"
      );

      // Suboptimal but expected cases

      expectGloss("en", "Córdobaaa", "Córdoba", "Córdobaaa", "Córdoba");
      expectGloss(
        "en",
        "Derry",
        "Derry/Londonderry",
        "Derry",
        "Derry/Londonderry"
      );
    });
    it("glosses non-English localized name with lookalike local name", function () {
      expectGloss(
        "es",
        "Los Ángeles",
        "Los Angeles",
        "Los Ángeles",
        "Los Angeles"
      );
      expectGloss("es", "Montreal", "Montréal", "Montreal", "Montréal");
      expectGloss("es", "Quebec", "Québec", "Quebec", "Québec");
      expectGloss("pl", "Ryga", "Rīga", "Ryga", "Rīga");
      expectGloss("pl", "Jurmała", "Jūrmala", "Jurmała", "Jūrmala");
    });
    it("glosses multiple local names", function () {
      expectGloss(
        "en",
        "Null Island",
        "Terra Nullius;空虛島",
        "Null Island",
        "Terra Nullius • 空虛島"
      );
    });
    it("deduplicates anglicized name and one of the local names", function () {
      expectGloss(
        "en",
        "Null Island",
        "Null Island;Terra Nullius;空虛島",
        "Null Island",
        "Terra Nullius • 空虛島"
      );
      expectGloss(
        "en",
        "Null Island",
        "Terra Nullius;Null Island;空虛島",
        "Null Island",
        "Terra Nullius • 空虛島"
      );
      expectGloss(
        "en",
        "Null Island",
        "Terra Nullius;空虛島;Null Island",
        "Null Island",
        "Terra Nullius • 空虛島"
      );
      expectGloss(
        "en",
        "Null Island",
        "Null Island;Null Island;Null Island",
        "Null Island",
        ""
      );
    });
  });

  describe("#listValuesExpression", function () {
    let evaluatedExpression = (valueList, separator, valueToOmit) =>
      expression
        .createExpression(
          localizedTextField(
            [...Label.listValuesExpression(valueList, separator, valueToOmit)],
            ["en"]
          )
        )
        .value.expression.evaluate(expressionContext({}));

    it("lists an empty list", function () {
      expect(evaluatedExpression("", ", ")).to.be.eql("");
    });

    it("lists a single value", function () {
      expect(evaluatedExpression("ABC", ", ")).to.be.eql("ABC");
    });

    it("lists empty values", function () {
      expect(evaluatedExpression(";", ", ")).to.be.eql(", ");
    });

    it("lists multiple values", function () {
      expect(evaluatedExpression("ABC;DEF", ", ")).to.be.eql("ABC, DEF");
      expect(evaluatedExpression("ABC;DEF;GHI", ", ")).to.be.eql(
        "ABC, DEF, GHI"
      );
      expect(evaluatedExpression(";ABC;DEF", ", ")).to.be.eql(", ABC, DEF");
      expect(evaluatedExpression("ABC;DEF;", ", ")).to.be.eql("ABC, DEF, ");
    });

    it("ignores a space after a semicolon", function () {
      expect(evaluatedExpression("ABC; DEF", ", ")).to.be.eql("ABC, DEF");
    });

    it("ignores an escaped semicolon", function () {
      expect(evaluatedExpression("ABC;;DEF", ", ")).to.be.eql("ABC;DEF");
      expect(evaluatedExpression("ABC;;DEF;GHI", ", ")).to.be.eql(
        "ABC;DEF, GHI"
      );
      expect(evaluatedExpression("ABC;DEF;;GHI", ", ")).to.be.eql(
        "ABC, DEF;GHI"
      );
      expect(evaluatedExpression("ABC;;DEF;;GHI", ", ")).to.be.eql(
        "ABC;DEF;GHI"
      );
      expect(evaluatedExpression("ABC;;;DEF", ", ")).to.be.eql("ABC;, DEF");
      expect(evaluatedExpression("ABC;;;;DEF", ", ")).to.be.eql("ABC;;DEF");
    });

    it("accepts an expression as the separator", function () {
      expect(evaluatedExpression("ABC;DEF", ["concat", ", "])).to.be.eql(
        "ABC, DEF"
      );
    });

    it("lists a maximum number of values", function () {
      // https://www.openstreetmap.org/node/9816809799
      expect(
        evaluatedExpression(
          "马岔河村;菜园村;刘灿东村;后于口村;王石楼村;李岔河村;岔河新村;富康新村;前鱼口村",
          "、"
        )
      ).to.be.eql(
        "马岔河村、菜园村、刘灿东村;后于口村;王石楼村;李岔河村;岔河新村;富康新村;前鱼口村"
      );
      expect(
        evaluatedExpression(
          "one;two;three;four;five;six;seven;eight;nine;ten",
          ", "
        )
      ).to.be.eql("one, two, three;four;five;six;seven;eight;nine;ten");
    });

    it("omits a specified value", function () {
      expect(evaluatedExpression("ABC;DEF;GHI", ", ", "")).to.be.eql(
        "ABC, DEF, GHI"
      );
      expect(evaluatedExpression("ABC;DEF;GHI", ", ", "ABC")).to.be.eql(
        "DEF, GHI"
      );
      expect(evaluatedExpression("ABC;DEF;GHI", ", ", "DEF")).to.be.eql(
        "ABC, GHI"
      );
      expect(evaluatedExpression("ABC;DEF;GHI", ", ", "GHI")).to.be.eql(
        "ABC, DEF"
      );
    });
  });
});
