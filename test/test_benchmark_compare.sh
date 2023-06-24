#!/bin/sh
DATA1=$(cat <<-EOM
{"world z0":{"water":{"featureCount":"2","time":0.054234511861310974},"landcover":{"featureCount":"11","time":0.25328191520102906},"place":{"featureCount":"42","time":1.0943271995293875},"water_name":{"featureCount":"6","time":0.16907226338813058},"boundary":{"featureCount":"33","time":0.8796750853046593}},"kansas z14":{"landcover":{"featureCount":"1","time":0.03050667578182351},"transportation_name":{"featureCount":"5","time":0.2833461815632759},"transportation":{"featureCount":"4","time":0.2337247301196497},"building":{"featureCount":"1","time":0.036974993808978514}}}
EOM
)
DATA2=$(cat <<-EOM
{"world z0":{"water":{"featureCount":"2","time":0.055234511861310974},"landcover":{"featureCount":"11","time":0.25828191520102906},"place":{"featureCount":"42","time":1.0743271995293875},"water_name":{"featureCount":"6","time":0.16907226338813058},"boundary":{"featureCount":"33","time":0.8796750853046593}},"kansas z14":{"landcover":{"featureCount":"1","time":0.03050667578182351},"transportation_name":{"featureCount":"5","time":0.2833461815632759},"transportation":{"featureCount":"4","time":0.2337247301196497},"building":{"featureCount":"1","time":0.036974993808978514}}}
EOM
)

node scripts/benchmark_compare.js "$DATA1" "$DATA2"
