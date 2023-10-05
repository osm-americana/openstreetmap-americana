# OpenStreetMap Americana Development Tools

Development tools used in style development.

## Color palette

The highway shield [color palette](americana.gpl) can be imported into Inkscape using the following steps:

1. Open the Preferences dialog and go to the System section.
2. Click the Open button next to the User Palettes field to open the Palettes folder.
3. Import [americana.gpl](americana.gpl).
4. Restart Inkscape.
5. Click the ◀ button to the right of the color palette strip at the bottom of the window (or in the top-right corner of the Color Palette panel), then choose americana.gpl from the menu.

## Map sample images

Map sample images can be generated with a script. See [sample_locations.json](test/sample_locations.json) for the format.

1. Create a JSON file with the map location and clipping rectangles
2. Start the server in the background with `npm start &`
3. Configure playwright: either `npx playwright install chromium` or `export CHROME_BIN=/usr/bin/chromium`
4. Run the generate_samples script and pass the JSON file location: `npm run generate_samples -- test/sample_locations.json``
