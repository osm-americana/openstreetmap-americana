"use strict";

import { expect } from "chai";
import * as HighwayShieldLayers from "../../src/layer/highway_shield.js";
import { expression } from "@maplibre/maplibre-gl-style-spec";

function expressionContext(properties) {
  return {
    properties: () => properties,
  };
}

describe("highway_shield", function () {
  describe("#parseImageName", function () {
    let evaluatedExpression = (properties) =>
      expression
        .createExpression(HighwayShieldLayers.getImageNameExpression(1))
        .value.expression.evaluate(expressionContext(properties));

    let expectImageName = (network, ref, name, color, expectedImageName) => {
      let properties = {
        route_1_network: network || "",
        route_1_ref: ref || "",
        route_1_name: name || "",
        route_1_color: color || "",
      };
      let evaluated = evaluatedExpression(properties);
      let expectedProperties = {
        imageName: expectedImageName,
        network: network || "",
        ref: ref || "",
        name: name || "",
        color: color || "",
      };
      expect(HighwayShieldLayers.parseImageName(evaluated)).to.be.deep.equal(
        expectedProperties
      );
    };

    it("parses an image name for a numbered route", function () {
      expectImageName(
        "NET",
        "REF",
        undefined,
        undefined,
        "shield\nNET\nREF\n\n"
      );
      expectImageName(
        "NET",
        "REF",
        "NAME",
        undefined,
        "shield\nNET\nREF\nNAME\n"
      );
    });
    it("parses an image name for an unnumbered route", function () {
      expectImageName(
        "NET",
        undefined,
        undefined,
        undefined,
        "shield\nNET\n\n\n"
      );
    });
    it("parses an image name for a named route", function () {
      expectImageName(
        "US:KY:Parkway",
        undefined,
        "NAME",
        undefined,
        "shield\nUS:KY:Parkway\n\nNAME\n"
      );
      expectImageName(
        "US:KY:Parkway",
        "REF",
        "NAME",
        undefined,
        "shield\nUS:KY:Parkway\nREF\nNAME\n"
      );
    });
    it("parses an image name for a network-independent route", function () {
      expectImageName(
        undefined,
        "REF",
        "NAME",
        undefined,
        "shield\n\nREF\nNAME\n"
      );
    });
  });
});
