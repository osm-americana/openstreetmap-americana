"use strict";

import * as PlaceLayers from "../layer/place.js";
import * as LanduseLayers from "../layer/landuse.js";
import * as BoundaryLayers from "../layer/boundary.js";
import * as RoadLayers from "../layer/road.js";
import * as ConstructionLayers from "../layer/construction.js";
import * as HighwayExitLayers from "../layer/highway_exit.js";
import * as RailLayers from "../layer/rail.js";
import * as AerowayLayers from "../layer/aeroway.js";
import * as POILayers from "../layer/poi.js";
import * as ParkLayers from "../layer/park.js";
import * as BuildingLayers from "../layer/building.js";
import * as WaterLayers from "../layer/water.js";
import * as FerryLayers from "../layer/ferry.js";

export const sections = [
  {
    name: "Populated places",
    entries: PlaceLayers.legendEntries,
  },
  {
    name: "Borders",
    entries: BoundaryLayers.legendEntries,
  },
  {
    name: "Roads",
    entries: [
      ...RoadLayers.legendEntries,
      ...ConstructionLayers.legendEntries,
      ...HighwayExitLayers.legendEntries,
    ],
  },
  {
    id: "shields",
    name: "Route markers",
    source: "Wikidata",
  },
  {
    name: "Railroads",
    entries: RailLayers.legendEntries,
  },
  {
    name: "Aviation",
    entries: AerowayLayers.legendEntries,
  },
  {
    name: "Points of interest",
    entries: POILayers.legendEntries,
  },
  {
    name: "Structures",
    entries: BuildingLayers.legendEntries,
  },
  {
    name: "Land use",
    entries: [...LanduseLayers.legendEntries, ...ParkLayers.legendEntries],
  },
  {
    name: "Water",
    entries: [...WaterLayers.legendEntries, ...FerryLayers.legendEntries],
  },
];
