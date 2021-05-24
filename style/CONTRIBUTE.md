# Americana Style Development

_'murica!_

The repository is organized as follows:

- **layer/** - Individual style layers, organized by subject area
- **icons/** - SVG icons, which get converted into PNG stylesheets
- **constants/** - Style elements that are frequently re-used
- **key.js** - Put your MapTiler API key here (see below)
- **layers.js** - OpenMapTiles loader with layer ordering
- **index.html** - Demonstration map HTML page

## MapTiler API Key

- In order to run the style, you must create an account to obtain a free key from [MapTiler Cloud](https://cloud.maptiler.com/maps/). This key should be pasted into the `key.js` file.

https://cloud.maptiler.com/maps/

## Developer Notes

Pre-requisites:

- This guide is written for Ubuntu Linux. Users of Windows or other Linux distributions are encouraged to add OS-specific development guidelines.
- On Ubuntu, the following development tools are required:
  - **npm** (`apt install npm`)
  - **prettify** (`npm install --save-dev --save-exact prettier`)
  - **python3**, to run a local web server (`apt install python3`)
  - **nvm** (https://heynode.com/tutorial/install-nodejs-locally-nvm)
  - **spritezero**, to combine icons into a stylesheet (`npm install -g @beyondtracks/spritezero-cli`)

Before submitting a PR

- Please prettify all files prior to submission. Run `make code_format` to format all code files with js-prettifier.

## Running the Americana style

The simplest way to run the style is to run `make run`. This will generate the sprite sheet and launch a simple HTTP server on port 1776 with a document root at the current location. For a production installation, the .html and .js files, as well as the generated sprites folder need to be installed on a production web server.

Running `make clean sprites` will re-generate the sprite sheets without needing to restart the web server.
