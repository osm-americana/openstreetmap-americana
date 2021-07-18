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

In order to run the style, you must create an account to obtain a free key from
[MapTiler Cloud][20]. This key should be pasted into the `key.js` file.

[20]: https://cloud.maptiler.com/maps/

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
