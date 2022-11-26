"use strict";

// Name fields in order of preference
export const localizedName = [
  "coalesce",
  ["get", "name:en"],
  ["get", "name:latin"],
  ["get", "name"],
];
