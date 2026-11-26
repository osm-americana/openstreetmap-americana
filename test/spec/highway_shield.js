"use strict";

import { expect } from "chai";
import {
  getShieldExpression,
  getShieldLayer,
  parseShieldImageId,
} from "@americana/maplibre-shield-generator";
import * as HighwayShieldLayers from "../../src/layer/highway_shield.js";

describe("highway_shield", function () {
  describe("layer", function () {
    it("matches getShieldLayer for the OpenMapTiles schema", function () {
      expect(HighwayShieldLayers.shield).to.deep.equal(
        getShieldLayer("openmaptiles")
      );
      expect(HighwayShieldLayers.shield.layout["text-field"]).to.deep.equal(
        getShieldExpression("openmaptiles")
      );
      expect(HighwayShieldLayers.shield.layout["text-font"]).to.equal(
        undefined
      );
    });
  });

  describe("parseShieldImageId", function () {
    it("parses an image name for a numbered route", function () {
      expect(
        parseShieldImageId("openmaptiles", "shield\nNET\nREF\n\n")
      ).to.deep.equal({
        imageName: "shield\nNET\nREF\n\n",
        network: "NET",
        ref: "REF",
        name: "",
        color: "",
      });
      expect(
        parseShieldImageId("openmaptiles", "shield\nNET\nREF\nNAME\n")
      ).to.deep.equal({
        imageName: "shield\nNET\nREF\nNAME\n",
        network: "NET",
        ref: "REF",
        name: "NAME",
        color: "",
      });
    });

    it("parses an image name for an unnumbered route", function () {
      expect(
        parseShieldImageId("openmaptiles", "shield\nNET\n\n\n")
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
        parseShieldImageId("openmaptiles", "shield\nUS:KY:Parkway\n\nNAME\n")
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
        parseShieldImageId("openmaptiles", "shield\nNET\nREF\n\nblue")
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
