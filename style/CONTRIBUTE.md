# Americana Style Development

_'murica!_

The repository is organized as follows:

- **layer/** - Individual style layers, organized by subject area
- **icons/** - SVG icons, which get converted into PNG stylesheets
- **constants/** - Style elements that are frequently re-used
- **config.js** - Configuration settings (MapTiler API key, OpenMapTiles URL, etc)
- **americana.js** - OpenMapTiles loader with layer ordering
- **index.html** - Demonstration map HTML page

## Config File

Environment specific settings go in the untracked file `config.js`. Copy the template
`config.default.js` and rename it `config.js`. The variables in this file can then
be changed without the risk of accidentally comitting to the main repo.

### MapTiler API Key

By default this project is set up to use vector tiles provided by MapTiler.
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

## Install Pre-requisites

These development tools are required and must be installed manually on your system:

- **NodeJS 14** or newer with **NPM 7** or newer
- **xmlstarlet** - to preprocess imported SVGs for map displays

See platform specific installation instructions below. Users of other platforms are
encouraged to contribute additional OS-specific instuctions. These instructions install
NodeJS directly, but if you need multiple versions another option is to [use NVM][30].

[30]: https://heynode.com/tutorial/install-nodejs-locally-nvm

### Ubuntu Linux

The NodeJS & NPM packages available from the default Ubuntu repos are generally out of
date. To get newer versions you'll need to add the [NodeSource][40] repo.

- **Add NodeSource repo** - `curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -`
- **Install NodeJS & NPM** - `sudo apt install nodejs`
- **Install xmlstarlet** - `sudo apt install xmlstarlet`

[40]: https://github.com/nodesource/distributions/blob/master/README.md

### MacOS

Since MacOS doesn't include a package manager you'll need [Homebrew][50] or [MacPorts][51].

- **Install NodeJS & NPM**
  - Download and run the installer from [nodejs.org][52]
  - _Or_ via Homebrew - `brew install node`
  - _Or_ via MacPorts - `sudo port install npm7`
- **Install xmlstarlet**
  - via Homebrew - `brew install xmlstarlet`
  - _Or_ via MacPorts - `sudo port install xmlstarlet`

[50]: https://brew.sh/
[51]: https://www.macports.org/
[52]: https://nodejs.org

### Windows

Running Ubuntu via [Windows Subsystem for Linux][60] is recommended. Follow the
instructions for [Ubuntu Linux](#ubuntu-linux) above.

Running the project natively on Windows may also be possible but instructions have not
been written.

[60]: https://docs.microsoft.com/en-us/windows/wsl/install-win10

## Install Project Level NPM Dependencies

NPM dependencies are tracked in the `package.json` file and are installed with one command:

    npm install

This step is the same on all platforms. It installs the following packages locally to
the project:

- **[browser-sync][70]** - to run a local web server with live reloading
- **[spritezero][71]** - to combine icons into a sprite sheet
- **[prettier][72]** - to keep our code style consistent

[70]: https://browsersync.io/
[71]: https://github.com/mapbox/spritezero
[72]: https://prettier.io/

### NPM Troubleshooting

If you run into permissions errors with NPM, setting the user with this command may
help: `npm -g config set user $USER`. Issues like this this can usually be avoided by
[not running `npm` with `root` or `sudo`][80]. Another good troubleshooting step is
simply deleting the `node_modules` folder and re-running `npm install`.

[80]: https://medium.com/@ExplosionPills/dont-use-sudo-with-npm-still-66e609f5f92

## Running the Americana style

The simplest way to run the style is to run `make run`. This will generate the sprite
sheet and launch a simple HTTP server on port 1776 with a document root at the current
location. For a production installation, the .html and .js files, as well as the
generated sprites folder need to be installed on a production web server.

Running `make clean sprites` will re-generate the sprite sheets without needing to
restart the web server.

## Before submitting a PR

Please prettify all files prior to submission. Run `make code_format` to format all
code files with js-prettifier.

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
