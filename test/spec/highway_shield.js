"use strict";

import { expect } from "chai";
import {
  OPENMAPTILES,
  getShieldExpression,
  getShieldLayer,
  routeParserFromSchema,
} from "@americana/maplibre-shield-generator";
import * as HighwayShieldLayers from "../../src/layer/highway_shield.js";

describe("highway_shield", function () {
  describe("layer", function () {
    it("matches getShieldLayer for OpenMapTiles with Americana's font", function () {
      expect(HighwayShieldLayers.shield).to.deep.equal(
        getShieldLayer(OPENMAPTILES, {
          textFont: ["Americana-Regular"],
        })
      );
      expect(HighwayShieldLayers.shield.layout["text-field"]).to.deep.equal(
        getShieldExpression(OPENMAPTILES)
      );
    });
  });

  describe("#parseImageName", function () {
    const parser = routeParserFromSchema(OPENMAPTILES);

    it("parses an image name for a numbered route", function () {
      expect(
        HighwayShieldLayers.parseImageName("shield\nNET\nREF\n\n")
      ).to.deep.equal({
        imageName: "shield\nNET\nREF\n\n",
        network: "NET",
        ref: "REF",
        name: "",
        color: "",
      });
      expect(
        HighwayShieldLayers.parseImageName("shield\nNET\nREF\nNAME\n")
      ).to.deep.equal({
        imageName: "shield\nNET\nREF\nNAME\n",
        network: "NET",
        ref: "REF",
        name: "NAME",
        color: "",
      });
      expect(parser.parse("shield\nNET\nREF\nNAME\n")).to.include({
        network: "NET",
        ref: "REF",
        name: "NAME",
      });
    });

    it("parses an image name for an unnumbered route", function () {
      expect(
        HighwayShieldLayers.parseImageName("shield\nNET\n\n\n")
      ).to.deep.equal({
        imageName: "shield\nNET\n\n\n",
        network: "NET",
        ref: "",
        name: "",
        color: "",
      });
    });

    it("parses an image name for a named route", function () {
      expect(
        HighwayShieldLayers.parseImageName("shield\nUS:KY:Parkway\n\nNAME\n")
      ).to.deep.equal({
        imageName: "shield\nUS:KY:Parkway\n\nNAME\n",
        network: "US:KY:Parkway",
        ref: "",
        name: "NAME",
        color: "",
      });
    });

    it("keeps color in the parsed metadata", function () {
      expect(
        HighwayShieldLayers.parseImageName("shield\nNET\nREF\n\nblue")
      ).to.deep.equal({
        imageName: "shield\nNET\nREF\n\nblue",
        network: "NET",
        ref: "REF",
        name: "",
        color: "blue",
      });
    });
  });
});
