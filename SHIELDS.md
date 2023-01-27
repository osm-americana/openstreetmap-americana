# Developing Highway Shields

This page documents features of the shield generation code and development tools for designing shields.

## Shield Definitions

The `loadShields` function in js/shield_defs.js contains a definition object for each shield displayed on the map. A definition object can contain the following properties:

- **`backgroundImage`** – A reference to the image file used as the shield background, based on the name of the file in icons/. To use a different image depending on the length of the inscribed text, specify an array of images.
- **`colorLighten`** – Tint the black portions of `backgroundImage` with this color via a "lighten" operation. Best used on a black-and-white image.
- **`numberingSystem`** – If the shield should express the route number in Roman numerals for stylistic reasons, even though the same route number is normally expressed in (Western) Arabic numerals in other contexts, set this property to `roman` to automatically convert the `ref` to Roman numerals.
- **`norefImage`** – A reference to an alternative image file used when there is no `ref`. This is appropriate if some routes in the network have a `ref` tag and others do not, and the routes with no ref need a special shield.
- **`notext`** – By default, a relation missing a `ref` tag will not appear as a shield. Set this property to `true` to display a shield even if it has no `ref`. This is appropriate for one-off shield networks, which are common for toll roads and touristic routes.
- **`padding`** – An object that specifies the amount of padding on each side of the inscribed text relative to the background image.
- **`textColor`** – The color of the inscribed text to superimpose on the background.
- **`textHaloColor`** – The color of the halo surrounding the inscribed text.
- **`textLayoutConstraint`** – A strategy for constraining the text within the background image, useful for shields of certain shapes. By default, the text will expand to fill a rectangle bounded by the specified padding while maintaining the same aspect ratio.
- **`verticalReflect`** – Set this property to `true` to draw `backgroundImage` upside-down.

If special code is necessary to style a specific `ref` in a particular network, **`overrideByRef`** can be used to define and override any of the above properties. `overrideByRef` is an object mapping `ref` values to partial shield definition objects, containing whichever properties are to be overridden for that particular `ref` value. If necessary, this can be used to override the entire shield definition.

Additionally, **`refsByWayName`** is an object mapping way names to text that can be superimposed on the background as a fallback for a missing `ref` value. (`refsByWayName` implies `notext`.) This temporary fallback is designed for use in [limited situations](https://wiki.openstreetmap.org/wiki/United_States/Unusual_highway_networks). In the future, it is expected that these initialisms will be encoded on the server side by processing appropriate tagging which holds the initialism in the database.

`refsByWayName` only works if there is no `ref` tag and the expression in the `routeConcurrency` function in layer/highway_shield.js includes the `name` property in the image name. The network needs to be listed as an input value that causes the `match` expression to append `name` to the image name.

When using `overrideByRef` or `refsByWayName`, make sure to add a line to the Special Cases section of [CONTRIBUTING.md](CONTRIBUTING.md) explaining why it is necessary, as they are only intended for use in special cases.

## Banners

The shield definition supports a property **`modifiers`** which accepts an array of text strings which will be drawn atop each shield, in 10px height increments. This is used in cases where additional text is needed to differentiate shields with a common symbology, for example for [special routes of the US Numbered Highway System](https://en.wikipedia.org/wiki/List_of_special_routes_of_the_United_States_Numbered_Highway_System):

<img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Business-alternate-truck_plate.svg" width=40 /><br/><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/US_30.svg" width=40 />

Banners should be specified in the following cases:

- When a route represents a variant of a main route with which it shares a common shield design. The banner ensures that the variant route information, which is an important component of the route, is visually displayed.
- When two or more routes from different networks share a common symbology in the map within a common geographical area. Shields which are very similar may be drawn using common graphics for simplicity and readability, for example, when the networks differ only by a difference in text. In these cases, the most significant network should be drawn with no banner, and each of the less significant networks should be drawn with a banner.
- When a short text of up to 4 characters is a significant stylistic element of a shield that can't reasonably be incorporated into the main shield graphic for aesthetic reasons.

In all cases, banner text should be no more than **4** characters in length.

## Shield draw functions

Many common shield shapes are available as functions, which draw shapes on the fly with arbitrary widths, colors, corner radii, and more. 

```
circleShield(
  fillColor,
  strokeColor,
  textColor
)
```

FIXME

```
ovalShield(
  fillColor,
  strokeColor,
  textColor,
  rectWidth
)
```

FIXME

```
pillShield(
  fillColor,
  strokeColor,
  textColor,
  rectWidth
)
```

FIXME

```
escutcheonDownShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```
(Because _shield shield_ just didn't sound right.)

FIXME

```
triangleDownShield(
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

```
roundedRectShield(
  fillColor,
  strokeColor,
  textColor,
  rectWidth,
  radius
)
```

FIXME

```
trapezoidDownShield(
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

```
trapezoidUpShield(
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

```
diamondShield(
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

```
pentagonUpShield(
  offset,
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius1,
  radius2,
  rectWidth
)
```

FIXME

```
homePlateDownShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius1,
  radius2,
  rectWidth
)
```

FIXME

```
hexagonVerticalShield(
  offset,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

```
hexagonHorizontalShield(
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

```
octagonVerticalShield(
  offset,
  angle,
  fillColor,
  strokeColor,
  textColor,
  radius,
  rectWidth
)
```

FIXME

## Config Variables

In config.js, there are debug variables to help determine shield text padding values and avoid collisions with other design features. Both accept a CSS color value, such as an HTML color name or hex code:

- **`SHIELD_TEXT_BBOX_COLOR`** - Draws a rectangle in the specified color around text to show the boundaries defined by `padding`
- **`SHIELD_TEXT_HALO_COLOR_OVERRIDE`** - Overrides `textHaloColor` on all shields

## Shield Test Gallery

For testing out changes across a variety of different shield designs and ref lengths there is a shield test gallery available:

- In local development: http://localhost:1776/shieldtest.html
- On the public demo site: https://zelonewolf.github.io/openstreetmap-americana/shieldtest.html

This aims to display a table of all the unique shield designs in the style with some example refs from 1 to 6 characters. The `networks` and `refs` arrays can be modified for testing with a different set of either:

https://github.com/ZeLonewolf/openstreetmap-americana/blob/581e1e5d97f5745c1bf764689439d93403888505/src/shieldtest.js#L16-L31
https://github.com/ZeLonewolf/openstreetmap-americana/blob/581e1e5d97f5745c1bf764689439d93403888505/src/shieldtest.js#L203-L218

To test with a list of all the supported networks in the style this line can be uncommented:

https://github.com/ZeLonewolf/openstreetmap-americana/blob/581e1e5d97f5745c1bf764689439d93403888505/src/shieldtest.js#L200-L201

This results in a very long page and can be quite slow or even crash the browser tab.
