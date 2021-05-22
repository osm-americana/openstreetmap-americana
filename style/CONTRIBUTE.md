# Americana Style Development

_'murica!_

The repository is organized as follows:

- **layer/** - Individual style layers, organized by subject area
- **layers.js** - OpenMapTiles loader with layer ordering
- **index.html** - Demonstration map HTML page
- **dev/** - Development tools

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

- Please prettify all files prior to submission. Run the command `dev/code_format.sh` to format all code files.
