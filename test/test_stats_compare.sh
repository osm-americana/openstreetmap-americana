#!/bin/sh
DATA1=$(cat <<-EOM
{
  "layerCount": 349,
  "styleSize": 1005817,
  "layerGroup": {
    "background": { "size": 122, "count": 1 },
    "landuse": { "size": 309, "count": 1 },
    "park": { "size": 2365, "count": 3 },
    "aeroway": { "size": 2059, "count": 7 },
    "landcover": { "size": 361, "count": 2 },
    "boundary": { "size": 13691, "count": 9 },
    "water": { "size": 912, "count": 3 },
    "waterway": { "size": 3543, "count": 3 },
    "transportation": { "size": 920221, "count": 299 },
    "building": { "size": 292, "count": 1 },
    "transportation_name": { "size": 8838, "count": 3 },
    "poi": { "size": 10094, "count": 2 },
    "water_name": { "size": 4647, "count": 2 },
    "aerodrome_label": { "size": 5951, "count": 4 },
    "place": { "size": 32062, "count": 9 }
  }
}
EOM
)
DATA2=$(cat <<-EOM
{
  "layerCount": 351,
  "styleSize": 1004717,
  "layerGroup": {
    "background": { "size": 122, "count": 1 },
    "landuse": { "size": 309, "count": 1 },
    "park": { "size": 2365, "count": 3 },
    "aeroway": { "size": 2059, "count": 7 },
    "landcover": { "size": 361, "count": 2 },
    "boundary": { "size": 13991, "count": 9 },
    "water": { "size": 901, "count": 1 },
    "waterway": { "size": 3743, "count": 5 },
    "transportation": { "size": 920221, "count": 299 },
    "building": { "size": 292, "count": 1 },
    "transportation_name": { "size": 8838, "count": 3 },
    "poi": { "size": 10094, "count": 2 },
    "water_name": { "size": 4647, "count": 2 },
    "aerodrome_label": { "size": 5951, "count": 4 },
    "place": { "size": 32062, "count": 9 }
  }
}
EOM
)

node scripts/stats_compare.js "$DATA1" "$DATA2"
