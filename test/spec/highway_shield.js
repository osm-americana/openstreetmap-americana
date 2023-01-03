"use strict";

import chai, { expect } from "chai";
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

    let expectImageName = (network, ref, name, expectedImageName) => {
      let properties = {
        route_1: `${network || ""}=${ref || ""}`,
        name: name || null,
      };
      let evaluated = evaluatedExpression(properties);
      let expectedProperties = {
        imageName: expectedImageName,
        network: network || "",
        ref: ref || "",
        name:
          !ref && HighwayShieldLayers.namedRouteNetworks.includes(network)
            ? name
            : undefined,
      };
      expect(HighwayShieldLayers.parseImageName(evaluated)).to.be.deep.equal(
        expectedProperties
      );
    };

    it("parses an image name for a numbered route", function () {
      expectImageName("NET", "REF", undefined, "shield\nNET=REF");
      expectImageName("NET", "REF", "NAME", "shield\nNET=REF");
    });
    it("parses an image name for an unnumbered route", function () {
      expectImageName("NET", undefined, undefined, "shield\nNET=");
    });
    it("parses an image name for a named route", function () {
      expectImageName(
        "US:KY:Parkway",
        undefined,
        "NAME",
        "shield\nUS:KY:Parkway=\nNAME"
      );
      expectImageName(
        "US:KY:Parkway",
        "REF",
        "NAME",
        "shield\nUS:KY:Parkway=REF"
      );
    });
    it("parses an image name for a network-independent route", function () {
      expectImageName(undefined, "REF", "NAME", "shield\n=REF");
    });
  });
});
