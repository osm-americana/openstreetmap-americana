import { ShieldDefinition, TextLayout } from "./types";

/**
 * Constrain the text to a rounded rectangle
 *
 * @param radius 1x pixel radius of the constraint corners
 * @returns a constraint definition
 */
export function roundedRectTextConstraint(radius: number): TextLayout {
  return {
    constraintFunc: "roundedRect",
    options: {
      radius: radius,
    },
  };
}

/**
 * Constrain the text to a specified constraint type
 *
 * @returns a constraint definition
 */
export function textConstraint(fxn: string): TextLayout {
  return {
    constraintFunc: fxn,
  };
}

/**
 * Draws a shield with an ellipse background
 *
 * @param {*} fillColor - Color of ellipse background fill
 * @param {*} strokeColor - Color of ellipse outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of ellipse (defaults to variable-width)
 * @returns a shield definition object
 */
export function ovalShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  return {
    shapeBlank: {
      drawFunc: "ellipse",
      params: {
        fillColor,
        strokeColor,
        rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor,
  };
}

/**
 * Draws a shield with circle background (special case of ovalShield)
 *
 * @param {*} fillColor - Color of circle background fill
 * @param {*} strokeColor - Color of circle outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @returns a shield definition object
 */
export function circleShield(
  fillColor: string,
  strokeColor: string,
  textColor: string
): Partial<ShieldDefinition> {
  return ovalShield(fillColor, strokeColor, textColor, 20);
}

/**
 * Draws a shield with a rectangle background
 *
 * @param {*} fillColor - Color of rectangle background fill
 * @param {*} strokeColor - Color of rectangle outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of rectangle (defaults to variable-width)
 * @param {*} radius - Corner radius of rectangle (defaults to 2)
 * @returns a shield definition object
 */
export function roundedRectShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number,
  radius: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "roundedRectangle",
      params: {
        fillColor,
        strokeColor,
        rectWidth,
        radius,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
    },
    textColor,
  };
}

/**
 * Draws a shield with an escutcheon background, pointed downward
 *
 * @param {*} yOffset - Height of curved portion
 * @param {*} fillColor - Color of escutcheon background fill
 * @param {*} strokeColor - Color of escutcheon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of escutcheon (defaults to 0)
 * @param {*} rectWidth - Width of escutcheon (defaults to variable-width)
 * @returns a shield definition object
 */
export function escutcheonDownShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 0;
  return {
    shapeBlank: {
      drawFunc: "escutcheon",
      params: {
        yOffset,
        fillColor,
        strokeColor,
        rectWidth,
        radius,
        outlineWidth: 1,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 0 + yOffset / 2,
    },
    textColor,
  };
}

/**
 * Draws a shield with a fishhead background, pointed downward
 *
 * @param {*} fillColor - Color of fishhead background fill
 * @param {*} strokeColor - Color of fishhead outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of fishhead (defaults to variable-width)
 * @returns a shield definition object
 */
export function fishheadDownShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  return {
    shapeBlank: {
      drawFunc: "fishhead",
      params: {
        fillColor,
        strokeColor,
        rectWidth,
        outlineWidth: 1,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 5,
    },
    textColor,
  };
}

/**
 * Draws a shield with a triangle background, pointed downward
 *
 * @param {*} fillColor - Color of triangle background fill
 * @param {*} strokeColor - Color of triangle outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of triangle (defaults to 2)
 * @param {*} rectWidth - Width of triangle (defaults to variable-width)
 * @returns a shield definition object
 */
export function triangleDownShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;

  return {
    shapeBlank: {
      drawFunc: "triangle",
      params: {
        pointUp: false,
        fillColor,
        strokeColor,
        rectWidth,
        radius,
      },
    },
    textLayout: textConstraint("triangleDown"),
    padding: {
      left: 1,
      right: 1,
      top: 2,
      bottom: 1,
    },
    textColor,
  };
}

/**
 * Draws a shield with a trapezoid background, with the short side on bottom
 *
 * @param {*} sideAngle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of trapezoid background fill
 * @param {*} strokeColor - Color of trapezoid outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of trapezoid (defaults to 0)
 * @param {*} rectWidth - Width of trapezoid (defaults to variable-width)
 * @returns a shield definition object
 */
export function trapezoidDownShield(
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  let angleInRadians = (sideAngle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 0;

  return {
    shapeBlank: {
      drawFunc: "trapezoid",
      params: {
        sideAngle: angleInRadians,
        fillColor,
        strokeColor,
        rectWidth,
        radius,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2 + 10 * Math.tan(angleInRadians),
      right: 2 + 10 * Math.tan(angleInRadians),
      top: 2,
      bottom: 4,
    },
    textColor,
  };
}

/**
 * Draws a shield with a trapezoid background, with the short side on top
 *
 * @param {*} sideAngle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of trapezoid background fill
 * @param {*} strokeColor - Color of trapezoid outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of trapezoid (defaults to 0)
 * @param {*} rectWidth - Width of trapezoid (defaults to variable-width)
 * @returns a shield definition object
 */
export function trapezoidUpShield(
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  let angleInRadians = (sideAngle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 0;
  return {
    shapeBlank: {
      drawFunc: "trapezoid",
      params: {
        shortSideUp: true,
        sideAngle: angleInRadians,
        fillColor,
        strokeColor,
        rectWidth,
        radius,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2 + 10 * Math.tan(angleInRadians),
      right: 2 + 10 * Math.tan(angleInRadians),
      top: 4,
      bottom: 2,
    },
    textColor,
  };
}

/**
 * Draws a shield with a diamond background
 *
 * @param {*} fillColor - Color of diamond background fill
 * @param {*} strokeColor - Color of diamond outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of diamond (defaults to 2)
 * @param {*} rectWidth - Width of diamond (defaults to variable-width)
 * @returns a shield definition object
 */
export function diamondShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "diamond",
      params: {
        fillColor,
        strokeColor,
        radius,
        rectWidth,
      },
    },
    textLayout: textConstraint("diamond"),
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1,
    },
    textColor,
  };
}

/**
 * Draws a shield with a pentagon background, pointed upward
 *
 * @param {*} yOffset - Height of diagonal edges
 * @param {*} sideAngle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of pentagon background fill
 * @param {*} strokeColor - Color of pentagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius1 - Corner radius of pointed side of pentagon (defaults to 2)
 * @param {*} radius2 - Corner radius of flat side of pentagon (defaults to 0)
 * @param {*} rectWidth - Width of pentagon (defaults to variable-width)
 * @returns a shield definition object
 */
export function pentagonUpShield(
  yOffset: number,
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  let angleInRadians = (sideAngle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius1 = radius1 ?? 2;
  radius2 = radius2 ?? 0;
  return {
    shapeBlank: {
      drawFunc: "pentagon",
      params: {
        yOffset,
        sideAngle: angleInRadians,
        fillColor,
        strokeColor,
        radius1,
        radius2,
        rectWidth,
      },
    },
    textLayout: {
      constraintFunc: "rect",
    },
    padding: {
      left: 2 + ((20 - yOffset) * Math.tan(angleInRadians)) / 2,
      right: 2 + ((20 - yOffset) * Math.tan(angleInRadians)) / 2,
      top: 1 + yOffset / 2,
      bottom: 3,
    },
    textColor,
  };
}

/**
 * Draws a shield with a home plate background, pointed downward
 *
 * @param {*} yOffset - Height of diagonal edges
 * @param {*} fillColor - Color of home plate background fill
 * @param {*} strokeColor - Color of home plate outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius1 - Corner radius of pointed side of home plate (defaults to 2)
 * @param {*} radius2 - Corner radius of flat side of home plate (defaults to 2)
 * @param {*} rectWidth - Width of home plate (defaults to variable-width)
 * @returns a shield definition object
 */
export function homePlateDownShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius1 = radius1 ?? 2;
  radius2 = radius2 ?? 2;
  return {
    shapeBlank: {
      drawFunc: "pentagon",
      params: {
        pointUp: false,
        yOffset,
        sideAngle: 0,
        fillColor,
        strokeColor,
        radius1,
        radius2,
        rectWidth,
      },
    },
    textLayout: roundedRectTextConstraint(radius2),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 1 + yOffset,
    },
    textColor,
  };
}

/**
 * Draws a shield with a home plate background, pointed upward
 *
 * @param {*} yOffset - Height of diagonal edges
 * @param {*} fillColor - Color of home plate background fill
 * @param {*} strokeColor - Color of home plate outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius1 - Corner radius of pointed side of home plate (defaults to 2)
 * @param {*} radius2 - Corner radius of flat side of home plate (defaults to 2)
 * @param {*} rectWidth - Width of home plate (defaults to variable-width)
 * @returns a shield definition object
 */
export function homePlateUpShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius1 = radius1 ?? 2;
  radius2 = radius2 ?? 2;
  return {
    shapeBlank: {
      drawFunc: "pentagon",
      params: {
        pointUp: true,
        yOffset,
        sideAngle: 0,
        fillColor,
        strokeColor,
        radius1,
        radius2,
        rectWidth,
      },
    },
    textLayout: roundedRectTextConstraint(radius2),
    padding: {
      left: 2,
      right: 2,
      top: 1 + yOffset,
      bottom: 2,
    },
    textColor,
  };
}

/**
 * Draws a shield with a vertically-aligned hexagon background
 *
 * @param {*} yOffset - Height of diagonal edges
 * @param {*} fillColor - Color of hexagon background fill
 * @param {*} strokeColor - Color of hexagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of hexagon (defaults to 2)
 * @param {*} rectWidth - Width of hexagon (defaults to variable-width)
 * @returns a shield definition object
 */
export function hexagonVerticalShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "hexagonVertical",
      params: {
        yOffset,
        fillColor,
        strokeColor,
        radius,
        rectWidth,
      },
    },
    textLayout: roundedRectTextConstraint(radius),
    padding: {
      left: 2,
      right: 2,
      top: 1 + yOffset,
      bottom: 1 + yOffset,
    },
    textColor,
  };
}

/**
 * Draws a shield with a horizontally-aligned hexagon background
 *
 * @param {*} sideAngle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of hexagon background fill
 * @param {*} strokeColor - Color of hexagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of hexagon (defaults to 2)
 * @param {*} rectWidth - Width of hexagon (defaults to variable-width)
 * @returns a shield definition object
 */
export function hexagonHorizontalShield(
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  let angleInRadians = (sideAngle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "hexagonHorizontal",
      params: {
        sideAngle: angleInRadians,
        fillColor,
        strokeColor,
        radius,
        rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2,
    },
    textColor,
  };
}

/**
 * Draws a shield with an octagon background
 *
 * @param {*} yOffset - Height of diagonal edges
 * @param {*} sideAngle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of octagon background fill
 * @param {*} strokeColor - Color of octagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of octagon (defaults to 2)
 * @param {*} rectWidth - Width of octagon (defaults to variable-width)
 * @returns a shield definition object
 */
export function octagonVerticalShield(
  yOffset: number,
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): Partial<ShieldDefinition> {
  let angleInRadians = (sideAngle * Math.PI) / 180;
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  return {
    shapeBlank: {
      drawFunc: "octagonVertical",
      params: {
        yOffset,
        sideAngle: angleInRadians,
        fillColor,
        strokeColor,
        radius,
        rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor,
  };
}

/**
 * Draws a shield with a pill-shaped background
 *
 * @param {*} fillColor - Color of pill background fill
 * @param {*} strokeColor - Color of pill outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} rectWidth - Width of pill (defaults to variable-width)
 * @returns a shield definition object
 */
export function pillShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number
): Partial<ShieldDefinition> {
  textColor = textColor ?? strokeColor;
  return {
    shapeBlank: {
      drawFunc: "pill",
      params: {
        fillColor,
        strokeColor,
        rectWidth,
      },
    },
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor,
  };
}

/**
 * Adds banner text above a shield
 *
 * @param {*} baseDef - Shield definition object
 * @param {*} banners - Array of strings to be displayed above shield
 * @returns a shield definition object
 */
export function banneredShield(
  baseDef: ShieldDefinition,
  banners: string[],
  bannerColor?: string
): ShieldDefinition {
  return {
    banners,
    bannerTextColor: bannerColor,
    ...baseDef,
  };
}

/**
 * Draws a circle icon inside a black-outlined white square shield
 *
 * @param {*} fillColor - Color of circle icon background fill
 * @param {*} strokeColor - Color of circle icon outline
 * @returns a shield definition object
 */
export function paBeltShield(
  fillColor: string,
  strokeColor: string
): Partial<ShieldDefinition> {
  return {
    notext: true,
    shapeBlank: {
      drawFunc: "paBelt",
      params: {
        fillColor,
        strokeColor,
      },
    },
  };
}

/**
 * Draws a Branson, Missouri route shield
 *
 * @param {*} fillColor - Color of rectangle icon background fill
 * @param {*} strokeColor - Color of rectangle icon outline
 * @returns a shield definition object
 */
export function bransonRouteShield(
  fillColor: string,
  strokeColor: string
): Partial<ShieldDefinition> {
  return {
    notext: true,
    shapeBlank: {
      drawFunc: "branson",
      params: {
        fillColor,
        strokeColor,
      },
    },
  };
}
