The Americana fontstack is built from [Google Fonts](https://fonts.google.com/).

In order to add fontstack support, modify the `fonts.json` file as follows:

1. Add font-family and variant information to the `font-families` section. The font-family is the name of the font as listed on Google Fonts, e.g. "Noto Sans". Use `gfi download "<name of font>"` to get a full list of the variants. The variant is everything to the right of the dash in the filename, so if a file is named `NotoSans-700.ttf`, the variant is `700`, though it will be listed in Google as something like "Bold 700". The `gfi` command requires you to install the `google-font-installer` package into npm with `npm install -g google-font-installer`.
2. Define the range of characters that you want rendered in this font in the `glyph-ranges` section. Since this is JSON, you'll have to convert hex to decimal here. The named parameter is simply a name that is used in the rest of the file to refer to this range of characters. This is an _inclusive_ range so for example `[0, 255]` will include codepoint 0 and codepoint 255.
3. The `custom-font-stacks` section lists each font-stack and which font/glyph range combinations should be included in that fontstack.
4. The `bundle-font-stacks` section lists all font stacks which should be bundled in their original form.
