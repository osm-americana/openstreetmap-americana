# OpenStreetMap Americana

_A quintessentially American map style_ [🗺 View the map](https://zelonewolf.github.io/openstreetmap-americana/)

<img src="doc-img/osm-americana-logo.png" alt="Americana map style logo" width="200"/>

The purpose of the Americana style is to:

- Promote collaboration and common purpose in the American mapping community
- Express the American experience through cartography, taking inspiration from the familiar features of North American paper maps
- Challenge the status quo by showcasing innovation and invention

The Americana style is the first digital map to achieve concurrent, state-specific highway shields arranged along the path of road. Representative highway shield rendering is of considerable cartographic importance to the American community. We do this proudly in an open source project using vector tile technology.

## How to use

You can install the OpenStreetMap Americana package and [deploy it anywhere](CONTRIBUTING.md#Production%20builds) as a static webpage. For your convenience, we’ve deployed it [on GitHub Pages](https://zelonewolf.github.io/openstreetmap-americana/). To explore how the style depicts various features, click the Samples button.

The style tries to label places in [your browser’s preferred language](https://www.w3.org/International/questions/qa-lang-priorities). To change this preference, consult your browser’s documentation: [Chrome](https://support.google.com/chrome/answer/173424), [Firefox](https://support.mozilla.org/en-US/kb/use-firefox-another-language), [Safari for macOS](https://support.apple.com/guide/mac-help/change-the-system-language-mh26684/mac), [Safari for iOS](https://support.apple.com/en-us/HT204031). You can also override this preference by adding `&language=` to the URL, followed by a comma-separated list of [IETF language tags](https://www.w3.org/International/articles/language-tags/). For example, here’s a map labeled [in Portuguese, falling back to Spanish](https://zelonewolf.github.io/openstreetmap-americana/#language=pt,es). If we don’t have the name of a place in any of your preferred languages, the style shows the name in the local language as a last resort.

## Contributor’s guide

_Contributors welcome!_

The repository is organized as follows:

- **src/** - The map style. See [CONTRIBUTING.md](CONTRIBUTING.md).
- **dev/** - Development tools used for style development. See [Style Developer Tools](dev/README.md)
- **test/** - Automated unit tests.
- _Coming soon! Other customized parts of the tech stack._

Some general guidelines:

- Please follow the coding style guidelines described in each sub-folder. These guidelines are designed to make it easier for collaboration and reduce the chance of edit conflicts.
- Innovation is encouraged! Please open a new ticket with your great ideas as a centralized focal point for discussion.
- New contributors are welcome!
- This style operates on the principle of consensus. Maintainers should ensure that changes represent a broad consensus within the American mapping community.
- Maintainers are also responsible to ensure that this principle of consensus does not cause stagnation or inaction. Contributor time is valuable; accepting the responsibility of being a maintainer means committing to responding to issues and PRs on a reasonable timeline that encourages community participation.

## Technology stack

The technology stack for this style can be summarized below:

<img src="doc-img/architecture.drawio.svg" alt="Americana technology stack" />

## Data sources

The OpenStreetMap Americana style is built upon the [OpenMapTiles schema](https://openmaptiles.org/schema/), which includes:

- Feature data from OpenStreetMap
- Translated name labels from [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page) for places, POIs, airports, roads, bodies of water, parks, and mountain peaks.
- Low-zoom ocean/water, boundary, and urbanized area data from [Natural Earth](https://www.naturalearthdata.com/).

## Coverage

Americana is compatible with vector tiles covering the entire world.

Americana displays custom route shields for routes in all U.S. states and territories, and for routes in the following countries:

<img src="doc-img/shield_map_world.svg" width="500" alt="Countries">

We are hoping that it will support more countries; you can [help us](https://github.com/ZeLonewolf/openstreetmap-americana/projects/1)!
