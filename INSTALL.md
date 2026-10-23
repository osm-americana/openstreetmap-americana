# Installation

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

## Platform-specific notes

### macOS

macOS doesn't include a default package manager, but Node.js and NPM can be installed via
[Homebrew][50] or [MacPorts][51]:

- Homebrew - `brew install node`
- MacPorts - `sudo port install npm8`

#### Apple Silicon/ARM Macs

Running the project natively on an Apple Silicon Mac is not currently possible due to
[dependency issues][62]. However, it is possible to work around this by [running the
project through Rosetta][63].

### Windows

The project can be run from any Windows command line environment provided that Node.js
and npm are installed.

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
[62]: https://github.com/osm-americana/openstreetmap-americana/issues/132
[63]: https://github.com/osm-americana/openstreetmap-americana/issues/132#issuecomment-1027274543

## Install project-level NPM dependencies

All other dependencies are installed via NPM. Dependencies are listed in the `package.json`,
and `package-lock.json` files. Run this command to install them in the project directory:

`npm install`

### NPM troubleshooting

If you run into permissions errors with NPM, setting the user with this command may
help: `npm -g config set user $USER`. Issues like this this can usually be avoided by
[not running `npm` with `root` or `sudo`][80]. Another good troubleshooting step is
simply deleting the `node_modules` folder (contains all the installed dependencies)
and re-running `npm install`.

[80]: https://medium.com/@ExplosionPills/dont-use-sudo-with-npm-still-66e609f5f92

## Configuration file

Environment specific settings go in the untracked file `config.js`. Copy from one of
the templates in the configs/ folder `config.*.js` and rename it `config.js` in
the src/ root. The variables in this file can then be changed without the risk of
accidentally committing to the main repo. By default, the repository `config.js` points
to a development tile server operated by the project maintainers. It is free to use
for development purposes but service is not guaranteed.

You can create a new copy of the config file by running `npm run config`

### MapTiler API key

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

### Running your own tile server

For production usages, consider running your own tile server. Thanks to advances in technology, it is possible to run an OpenMapTiles tile server for a modest cost. See the diary entry [Host an OpenMapTiles Vector Tile Server on AWS for $19.75/month](https://www.openstreetmap.org/user/ZeLonewolf/diary/401697) for more details.

## Running the Americana style

### In development

```
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
npm install
npm run build
```

These commands will build a minified/bundled version of the Americana demo with
all assets in `dist/`. The contents of `dist/` can then be copied to a webserver
for distribution. A [taginfo project file][taginfo] will also be generated based on the
boilerplate in `scripts/taginfo_template.json`.

[taginfo]: https://wiki.openstreetmap.org/wiki/Taginfo/Projects
