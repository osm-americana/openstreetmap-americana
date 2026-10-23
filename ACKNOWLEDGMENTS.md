# Acknowledgments

OpenStreetMap Americana is only possible due to the sustained efforts of open data and open source communities. [OpenStreetMap U.S.](https://openstreetmap.us/), OpenStreetMap’s local chapter in the United States, supports OSM Americana as a community project by providing tile rendering and other computing infrastructure. You can support the work we do by [donating to OpenStreetMap U.S.](https://openstreetmap.us/get-involved/donate/)

## Data sources

The style is compatible with the [OpenMapTiles schema](https://openmaptiles.org/schema/), which includes:

- **[OpenStreetMap](https://www.openstreetmap.org/)** – Basemap data, including most of the features that appear on the map. [Learn how to contribute to OSM](https://wiki.openstreetmap.org/wiki/Beginners'_guide).
- **[Wikidata](https://www.wikidata.org/)** – More comprehensive translations of feature names. The translations come from [labels](https://www.wikidata.org/wiki/Help:Label) on the associated Wikidata item.
- **[Natural Earth](https://www.naturalearthdata.com/)** – Oceans and large bodies of water, boundaries, and urbanized areas at low zoom levels.

By default, the style is configured to load map tiles from the [OpenStreetMap U.S. Tileservice](https://tiles.openstreetmap.us/vector/openmaptiles/). The [tile server usage policy](https://tiles.openstreetmap.us/usage-policy/) describes the allowable usage of the tileset in any deployment of this software.

The legend’s “Route markers” section is labeled using labels of Wikidata items that are tagged with the [corresponding OSM tag](https://www.wikidata.org/wiki/Property:P1282).

## Design

- The stylized highway shields are inspired by "[Rebusurance](https://github.com/1ec5/rebusurance/)" by Minh Nguyễn.
- The route shield for New Mexico state routes incorporates a Sun Symbol [courtesy of the Pueblo of Zia](https://github.com/osm-americana/openstreetmap-americana/pull/323#issuecomment-2083591746).
- The font stack was [packaged from Google Fonts](https://fonts.google.com/attribution).

## Code

- Initial layer code is derived from Oliver Wipfli's [openmaptiles-starter](https://github.com/wipfli/openmaptiles-starter/) style.
