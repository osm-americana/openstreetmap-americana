#!/bin/bash

if ! command -v xmlstarlet &> /dev/null
then
    echo "xmlstarlet is not available."
    exit -1
fi

find "build/rebusurance-v1.0.0/image2d" -name "*.svg" -type f -print0 | while read -d $'\0' f; do
  newfile=`echo "$f" | sed -e 's/ /_/g; s/U.S./us/g'`
  mv -n "$f" "$newfile";
done

for i in $( ls build/rebusurance-v1.0.0/image2d/ | grep [A-Z] );
do
  svg="build/rebusurance-v1.0.0/image2d/$i"

  #Remove text placeholder from shields
  #Scale shields to a reasonable size for rasterization
  xmlstarlet ed -L -N x=http://www.w3.org/2000/svg \
    -u "//x:svg/@height" \
    --value 50 \
    -u "//x:svg/@width" \
    --value 60 \
    -d "//x:svg/x:text" \
    -d "//x:svg/x:path/@transform" \
    -a "//x:svg/x:path" -t attr -n transform \
    --value "scale(0.5,0.5)" \
    -d "//x:svg/x:rect/@transform" \
    -a "//x:svg/x:rect" -t attr -n transform \
    --value "scale(0.5,0.5)" \
    -d "//x:svg/x:g/@transform" \
    -a "//x:svg/x:g" -t attr -n transform \
    --value "scale(0.5,0.5)" "$svg"

  #Copy files to icons folder, converting space to underscore and lowercase letters
  cp "$svg" icons/us_`echo "$i" | tr 'A-Z' 'a-z'`
done


#Customizations

#Make the crown on US Interstate highway shields pointier
xmlstarlet ed -L -N x=http://www.w3.org/2000/svg \
  -u "//x:svg/@height" \
  --value 70 \
  -u "//x:svg/x:path[@id='interstate-crown']/@transform" \
  --value "scale(0.50,1.5) translate(0,18)" \
  icons/us_interstate.svg

#Fix resizing of Florida state outline
xmlstarlet ed -L -N x=http://www.w3.org/2000/svg \
  -u "//x:svg/x:path[@id='florida-state']/@transform" \
  --value "scale(0.5, 0.5) translate(-17,-39)" \
  icons/us_florida.svg

