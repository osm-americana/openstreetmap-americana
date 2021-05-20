# Americana Style Development

_'murica!_

The repository is organized as follows:

- **layer/** - Individual style layers, organized by subject area
- **americana.js** - OpenMapTiles loader with layer ordering
- **index.html** - Demonstration map HTML page
- **dev/** - Development tools

Pre-requisites:

- This guide is written for Ubuntu Linux. Users of Windows or other Linux distributions are encouraged to add OS-specific development guidelines.
- On Ubuntu, the following development tools are required:
  - **npm** (`apt install npm`)
  - **prettify** (`npm install --save-dev --save-exact prettier`)
  - **python3**, to run a local web server (`apt install python3`)

Before submitting a PR

- Please prettify all files prior to submission. Run the command `dev/code_format.sh` to format all code files.
