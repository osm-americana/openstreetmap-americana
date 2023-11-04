function loadFontByCreatingInvisibleDiv(fontFamily, dummyText) {
  // Create a div element
  const div = document.createElement("div");

  // Set the font-family
  div.style.fontFamily = fontFamily;

  // Set the dummy text
  div.textContent = dummyText;

  // Make the div invisible
  div.style.position = "absolute";
  div.style.opacity = "0";
  div.style.pointerEvents = "none";
  div.style.zIndex = "-1";
  div.style.left = "-1000px";
  div.style.top = "-1000px";

  // Append the div to the body
  document.body.appendChild(div);

  return div;
}

loadFontByCreatingInvisibleDiv("Noto Sans Condensed", "dummy");
loadFontByCreatingInvisibleDiv("Noto Sans Armenian Condensed", "Քանզի անդամ");
