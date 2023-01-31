import { expect } from "chai";
import {
  shieldPredicate,
  routeParser,
  parseImageName,
} from "../../src/js/shield_format.js";
import { getImageNameExpression } from "../../src/layer/highway_shield.js";
import { expression } from "@maplibre/maplibre-gl-style-spec";

const image_id_I95 = "shield\nUS:I\n95\nEye Ninety-Five";
const route_def_I95 = {
  network: "US:I",
  ref: "95",
  name: "Eye Ninety-Five",
};

function expressionContext(properties) {
  return {
    properties: () => properties,
  };
}

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
      expect(extractedDef.name).to.be.equal(route_def_I95.name);
    });
  });
  describe("#parseImageName", function () {
    let evaluatedExpression = (properties) =>
      expression
        .createExpression(
          getImageNameExpression(1),
          "layers[0].layout.text-field"
        )
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
      expect(parseImageName(evaluated)).to.be.deep.equal(expectedProperties);
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
