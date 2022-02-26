# Americana Style Development

_'murica!_

The repository is organized as follows:

- **layer/** - Individual style layers, organized by subject area
- **icons/** - SVG icons, which get converted into PNG stylesheets
- **constants/** - Style elements that are frequently re-used
- **js/** - Dynamic javascript code for highway shields and stylesheet building
- **config.js** - Configuration settings (MapTiler API key, OpenMapTiles URL, etc)
- **americana.js** - OpenMapTiles loader with layer ordering
- **index.html** - Demonstration map HTML page

## Install Node.js

Any [currently supported version of Node.js][31] should work. The current LTS
release is recommended. Installation options:

- Download and run the installer from [nodejs.org][52]
- Install via package manager (See [platform specific notes](#platform-specific-notes) below)
- [Use NVM][30] to manage multiple different Node.js versions

## Update NPM

NPM is included with the Node.js install, but as **NPM version 8.3** or newer is required
for this project, you may need to update it. To [update NPM to the latest version][32],
run either of these commands:

```
npm update -g npm
```

```
npm install -g npm@latest
```

It may be necessary to prefix these with `sudo` depending where NPM is installed on your system.

[30]: https://heynode.com/tutorial/install-nodejs-locally-nvm
[31]: https://nodejs.org/en/about/releases/
[32]: https://docs.npmjs.com/try-the-latest-stable-version-of-npm

## Platform Specific Notes

### MacOS

MacOS doesn't include a default package manager, but Node.js and NPM can be installed via
[Homebrew][50] or [MacPorts][51]:

- Homebrew - `brew install node`
- MacPorts - `sudo port install npm8`

#### Apple Silicon/ARM Macs

Running the project natively on an Apple Silicon Mac is not currently possible due to
[dependency issues][62]. However, it is possible to work around this by [running the
project through Rosetta][63].

### Windows

Running the project natively on Windows is not currently possible due to [dependency issues][61].
Instead running on [Ubuntu](#ubuntu-linux) via [Windows Subsystem for Linux][60] is recommended.

### Ubuntu Linux

The Node.js packages in the default Ubuntu repos are generally out of date. Instead, it is
recommended to use the [NodeSource repositories][40] for installing Node.js via APT. You can [choose
a specific version][41], or install the current LTS release:

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

[40]: https://github.com/nodesource/distributions/blob/master/README.md
[41]: https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
[50]: https://brew.sh/
[51]: https://www.macports.org/
[52]: https://nodejs.org
[60]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[61]: https://github.com/ZeLonewolf/openstreetmap-americana/issues/132#issuecomment-1036976993
[62]: https://github.com/ZeLonewolf/openstreetmap-americana/issues/132
[63]: https://github.com/ZeLonewolf/openstreetmap-americana/issues/132#issuecomment-1027274543

## Install Project Level NPM Dependencies

All other dependencies are installed via NPM. Dependencies are listed in the `package.json`,
and `package-lock.json` files. Run this command to install them in the project directory:

`npm install`

### NPM Troubleshooting

If you run into permissions errors with NPM, setting the user with this command may
help: `npm -g config set user $USER`. Issues like this this can usually be avoided by
[not running `npm` with `root` or `sudo`][80]. Another good troubleshooting step is
simply deleting the `node_modules` folder (contains all the installed dependencies)
and re-running `npm install`.

[80]: https://medium.com/@ExplosionPills/dont-use-sudo-with-npm-still-66e609f5f92

## Config File

Environment specific settings go in the untracked file `config.js`. Copy from one of
the templates in the style/configs/ folder `config.*.js` and rename it `config.js` in
the style/ folder. The variables in this file can then be changed without the risk of
accidentally comitting to the main repo.

You can create a new copy of the config file by running `npm run config`

### MapTiler API Key

This project can use vector tiles provided by MapTiler.
For this to work, you must create an account and obtain a free key from
[MapTiler Cloud][20]. This key should be pasted into the `MAPTILER_KEY` variable of
the `config.js` file.

### Custom OpenMapTiles URL

For testing upcoming features of the [OpenMapTiles schema][21] or for fresher data than
MapTiler Cloud provides, a custom vector tile url can be set in the `OPENMAPTILES_URL`
variable of the `config.js` file. However, this requires setting up a custom OpenMapTiles
server which is beyond the scope of this guide.

[20]: https://cloud.maptiler.com/maps/
[21]: https://openmaptiles.org/schema/

## Running the Americana style

### In development...

```
cd style/
npm install
npm start
```

The simplest way to run the style is to run `npm start`. This will generate the sprite
sheet and launch a simple HTTP server on port 1776 with a document root at the current
location. For a production installation, the .html and .js files, as well as the
generated sprites folder need to be installed on a production web server.

Running `npm run sprites` will re-generate the sprite sheets without needing to
restart the web server.

### Production builds

```
cd style/
npm install
npm run build
```

These commands will build a minified/bundled version of the Americana demo with
all assets in `dist/`. The contents of `dist/` can then be copied to a webserver
for distribution. A [taginfo project file][taginfo] will also be generated based on the
boilerplate in `scripts/taginfo_template.json`.

[taginfo]: https://wiki.openstreetmap.org/wiki/Taginfo/Projects

## Before submitting a PR

1. Please prettify all files prior to submission. Run `npm run code_format` to
   format all code files with [prettier][90].
2. If you are introducing a novel approach to depicting a layer or feature
   property from the OpenMapTiles schema, document how the corresponding
   OpenStreetMap key or tag is used in `scripts/taginfo_template.json`.

[90]: https://prettier.io/

## Highway Shield Contributor's Guide

Highway shields are a key feature of the OpenStreetMap Americana style. This guide describes some of the style principles that contributors of highway shield artwork should consider when submitting new shields. The required elements are as follows:

1. Shields are in .svg format, saved in "Optimized SVG" format in Inkscape
2. Shields are 20px on the smallest dimension (this will be rasterized to 20px or 40px depending on display resolution)
3. Shields are license-compatible (public domain or CC0)

In addition, the following style guidelines are recommended:

1. Use a 1px stroke size for line elements. Horizontal/vertical lines should be aligned to the pixel grid. In Inkscape, use Shift+Ctrl+D, and create a rectangular grid in the "Grids" tab and enable the "snap to grid" option.
2. Complex or intricate graphic elements should be simplified.
3. Background shading should be removed.
4. Route numbers should be large enough to be legible.
5. Shields should consistently use squared or rounded corners, but not a mix of both.

In general, this style is not trying to exactly replicate highway shields as seen on signage. Instead, we are trying to extract the key stylistic elements so that the graphics are recognizable as simplifications of their real-world counterparts. Here are some examples of Americana's simplified shields for small-size readability:

| Network                | Real-world Shield                                                                                          | Americana Representation                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| NJ Turnpike            | <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/New_Jersey_Turnpike_Shield.svg" width="40"/> | <img src="https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/style/icons/shield40_us_nj_njtp_noref.svg" width="40"/> |
| Washington State Route | <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/WA-blank.svg" width="40"/>                   | <img src="https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/style/icons/shield40_us_wa.svg" width="40"/>            |

More complicated shields may be more challenging to simplify. Consider taking some inspiration from the [rebusurance](https://github.com/1ec5/rebusurance) project, which effectivly simplifies a number of complex state shield designs by stretching, compressing, omitting, or simplifying graphic elements.

### Color Scheme

For consistency, shields should use the following color palette:

| color                                                                    | Pantone | RGB         | Hex triplet |
| ------------------------------------------------------------------------ | ------- | ----------- | ----------- |
| <img src="../doc-img/pantone_294.svg" height=18 width=50 /> Blue         | 294     | 0 63 135    | #003f87     |
| <img src="../doc-img/pantone_469.svg" height=18 width=50 /> Brown        | 469     | 105 63 35   | #693f23     |
| <img src="../doc-img/pantone_342.svg" height=18 width=50 /> Green        | 342     | 0 103 71    | #006747     |
| <img src="../doc-img/pantone_152.svg" height=18 width=50 /> Orange       | 152     | 243 143 0   | #f38f00     |
| <img src="../doc-img/pantone_198.svg" height=18 width=50 /> Pink         | 198     | 223 70 97   | #df4661     |
| <img src="../doc-img/pantone_259.svg" height=18 width=50 /> Purple       | 259     | 109 32 119  | #6d2077     |
| <img src="../doc-img/pantone_187.svg" height=18 width=50 /> Red          | 187     | 191 32 51   | #bf2033     |
| <img src="../doc-img/pantone_116.svg" height=18 width=50 /> Yellow       | 116     | 255 205 0   | #ffcd00     |
| <img src="../doc-img/pantone_382.svg" height=18 width=50 /> Yellow-Green | 382     | 196 214 0   | #c4d600     |
| <img src="../doc-img/white.svg" height=18 width=50 /> White              | N/A     | 255 255 255 | #ffffff     |
| <img src="../doc-img/black.svg" height=18 width=50 /> Black              | N/A     | 0 0 0       | #000000     |

Base data from MUTCD Color Specifications, Federal Highway Administration

See the [developer tools](../dev/README.md) for an importable, Inkscape-compatible palette file.

### Font Sizes

Shields should target 8-12px text actual-size character heights for readability:

| Example                                                    | Text height |
| ---------------------------------------------------------- | ----------- |
| <img src="../doc-img/16_px_text.svg" height=20 width=20 /> | 16px        |
| <img src="../doc-img/14_px_text.svg" height=20 width=20 /> | 14px        |
| <img src="../doc-img/12_px_text.svg" height=20 width=20 /> | 12px        |
| <img src="../doc-img/10_px_text.svg" height=20 width=20 /> | 10px        |
| <img src="../doc-img/8_px_text.svg" height=20 width=20 />  | 8px         |
| <img src="../doc-img/6_px_text.svg" height=20 width=20 />  | 6px         |

### Shield Definitions

The `loadShields` function in style/js/shield_defs.js contains a definition object for each shield displayed on the map. A definition object can contain the following properties:

- **`backgroundImage`** – A reference to the image file used as the shield background, based on the name of the file in style/icons/. To use a different image depending on the length of the inscribed text, specify an array of images.
- **`colorLighten`** – Replace the black portions of the specified background image with this color via a "lighten" operation.
- **`norefImage`** – A reference to an alternative image file used when there is no `ref`. This is appropriate if some routes in the network have a `ref` tag and others do not, and the routes with no ref need a special shield.
- **`notext`** – By default, a relation missing a `ref` tag will not appear as a shield. Set this property to `true` to display a shield even if it has no `ref`. This is appropriate for one-off shield networks, which are common for toll roads and touristic routes.
- **`padding`** – An object that specifies the amount of padding on each side of the inscribed text relative to the background image.
- **`textColor`** – The color of the inscribed text to superimpose on the background.
- **`textLayoutConstraint`** – A strategy for constraining the text within the background image, useful for shields of certain shapes. By default, the text will expand to fill a rectangle bounded by the specified padding while maintaining the same aspect ratio.

Additionally, **`refsByWayName`** is an object mapping way names to text that can be superimposed on the background as a fallback for a missing `ref` value. (`refsByWayName` implies `notext`.) This temporary fallback is designed for use in [limited situations](https://wiki.openstreetmap.org/wiki/United_States/Unusual_highway_networks) that meet each of the following criteria:

- Each route in a network has a distinct shield that is dominated by the road name as opposed to a glyph or logo.
- Each shield in the network has a common thematic design, and differs by only the road name, not a number, initialism, or color.
- Each route would be recognizable by an initialism, even though it is not signposted.

`refsByWayName` only works if there is no `ref` tag and the expression in the `routeConcurrency` function in style/layer/highway_shield.js includes the `name` property in the image name. The network needs to be listed as an input value that causes the `match` expression to append `name` to the image name.
