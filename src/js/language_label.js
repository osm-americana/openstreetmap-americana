"use strict";

import Tokenfield from "tokenfield";
import { updateLanguageLabel } from "../americana";
import * as Label from "../constants/label.js";

var langField = labelControlElement("span", "language-field");

var langChanger = labelControlElement("button", "language-switcher");
langChanger.textContent = "Change";

var langPicker = labelControlElement("input", "language-picker");
hide(langPicker);

var langHeader = labelControlElement("span", "lang-header");
var langHints = labelControlElement("span", "lang-hints");
langHints.textContent = "Begin typing to add languages";

var langCancel = labelControlElement("button", "language-cancel");
langCancel.textContent = "X";
Object.assign(langCancel.style, {
  "margin-top": "0.3em",
});

langHeader.appendChild(langCancel);
langHeader.appendChild(langHints);

hide(langHeader);

function hide(element) {
  Object.assign(element.style, {
    display: "none",
  });
}
function show(element) {
  element.style.removeProperty("display");
}

let languageNames = new Intl.DisplayNames(Label.getLocales(), {
  type: "language",
});
let langCodes = [
  { id: "aaq", name: "Abenaki (Eastern)" },
  { id: "abe", name: "Abenaki (Western)" },
  { id: "acv", name: "Achumawi" },
  { id: "aes", name: "Alsea" },
  { id: "aht", name: "Ahtna" },
  { id: "akz" },
  { id: "ale" },
  { id: "am" },
  { id: "apj", name: "Jicarilla" },
  { id: "apk", name: "Plains Apache" },
  { id: "apl", name: "Lipan" },
  { id: "apm", name: "Mescalero-Chiricahua" },
  { id: "apw", name: "Western Apache" },
  { id: "aqp", name: "Atakapa" },
  { id: "ar" },
  { id: "ari", name: "Arikara" },
  { id: "arp" },
  { id: "asb", name: "Assiniboine" },
  { id: "ats", name: "Gros Ventre" },
  { id: "az" },
  { id: "be" },
  { id: "bg" },
  { id: "bla" },
  { id: "boi", name: "Barbareño" },
  { id: "br" },
  { id: "bs" },
  { id: "ca" },
  { id: "cad" },
  { id: "cay" },
  { id: "cea", name: "Lower Chehalis" },
  { id: "ch" },
  { id: "chc", name: "Catawba" },
  { id: "chh", name: "Lower Chinook" },
  { id: "chl", name: "Cahuilla" },
  { id: "chn" },
  { id: "cho" },
  { id: "chr-Latn" },
  { id: "chr" },
  { id: "chy" },
  { id: "cic" },
  { id: "cid", name: "Chimariko" },
  { id: "cjh", name: "Upper Chehalis" },
  { id: "cku", name: "Koasati" },
  { id: "clm", name: "Klallam" },
  { id: "co" },
  { id: "coc", name: "Cocopah" },
  { id: "col", name: "Columbia-Moses" },
  { id: "com", name: "Comanche" },
  { id: "coq", name: "Coquille" },
  { id: "cow", name: "Cowlitz" },
  { id: "crd", name: "Coeur d'Alene" },
  { id: "cro", name: "Crow" },
  { id: "crr" },
  { id: "crz", name: "Cruzeño" },
  { id: "cs" },
  { id: "csi", name: "Coast Miwok" },
  { id: "csm", name: "Central Sierra Miwok" },
  { id: "css", name: "Southern Ohlone" },
  { id: "cst", name: "Northern Ohlone" },
  { id: "csz", name: "Hanis" },
  { id: "ctc", name: "Chetco" },
  { id: "ctm", name: "Chitimacha" },
  { id: "cup", name: "Cupeño" },
  { id: "cy" },
  { id: "da" },
  { id: "dak" },
  { id: "de" },
  { id: "del" },
  { id: "dih", name: "Kumeyaay" },
  { id: "el" },
  { id: "ems", name: "Alutiiq" },
  { id: "en" },
  { id: "eo" },
  { id: "es" },
  { id: "esq", name: "Esselen" },
  { id: "ess", name: "Central Siberian Yupik" },
  { id: "esu" },
  { id: "et" },
  { id: "etc", name: "Etchemin" },
  { id: "eu" },
  { id: "eya", name: "Eyak" },
  { id: "fi" },
  { id: "fla", name: "Salish-Spokane-Kalispel" },
  { id: "fr" },
  { id: "fy" },
  { id: "ga" },
  { id: "gce", name: "Galice" },
  { id: "gd" },
  { id: "gwi", name: "Gwich'in" },
  { id: "haa", name: "Hän" },
  { id: "hai", name: "Haida" },
  { id: "haw" },
  { id: "he" },
  { id: "hi" },
  { id: "hid", name: "Hidatsa" },
  { id: "hoi", name: "Holikachuk" },
  { id: "hop", name: "Hopi" },
  { id: "hr" },
  { id: "hu" },
  { id: "hup" },
  { id: "hur" },
  { id: "hy" },
  { id: "id" },
  { id: "ik" },
  { id: "iml", name: "Miluk" },
  { id: "ing", name: "Deg Xinag" },
  { id: "inz", name: "Ineseño" },
  { id: "iow", name: "Chiwere" },
  { id: "is" },
  { id: "it" },
  { id: "ja" },
  { id: "ja-Hira" },
  // { id: "ja_kana"},
  { id: "ja-Latn" },
  { id: "ka" },
  { id: "kee", name: "Keres (Eastern)" },
  { id: "kii", name: "Kitsai" },
  { id: "kio", name: "Kiowa" },
  { id: "kjq", name: "Keres (Western)" },
  { id: "kk" },
  { id: "kla", name: "Klamath" },
  { id: "kn" },
  { id: "ko" },
  { id: "ko-Latn" },
  { id: "koy", name: "Koyukon" },
  { id: "krb", name: "Karkin" },
  { id: "ksk", name: "Kansa" },
  { id: "ktw", name: "Cahto" },
  { id: "ku" },
  { id: "kut" },
  { id: "kuu", name: "Upper Kuskokwim" },
  { id: "kyh", name: "Karuk" },
  { id: "kyl", name: "Central Kalapuyan" },
  { id: "la" },
  { id: "lb" },
  { id: "lkt" },
  { id: "lmw", name: "Lake Miwok" },
  { id: "lou", name: "Louisiana Creole" },
  { id: "lt" },
  { id: "lui", name: "Luiseño" },
  { id: "lut", name: "Lushootseed" },
  { id: "lv" },
  { id: "mez", name: "Menominee" },
  { id: "mhq", name: "Mandan" },
  { id: "mia", name: "Miami-Illinois" },
  { id: "mik", name: "Mikasuki" },
  { id: "mjd", name: "Konkow" },
  { id: "mjy", name: "Mohican" },
  { id: "mk" },
  { id: "ml" },
  { id: "mnr", name: "Mono" },
  { id: "moh" },
  { id: "mov", name: "Mohave" },
  { id: "mrc", name: "Maricopa" },
  { id: "mt" },
  { id: "mus" },
  { id: "nez", name: "Nez Perce" },
  { id: "nl" },
  { id: "nmu", name: "Maidu" },
  { id: "nnt", name: "Nanticoke" },
  { id: "no" },
  { id: "nok", name: "Nooksack" },
  { id: "nol", name: "Nomlaki" },
  { id: "nrt", name: "Northern Kalapuyan" },
  { id: "nsq", name: "Northern Sierra Miwok" },
  { id: "nsz", name: "Nisenan" },
  { id: "ntw", name: "Nottoway" },
  { id: "nv" },
  { id: "nwy", name: "Nottoway-Meherrin" },
  { id: "obi", name: "Obispeño" },
  { id: "oc" },
  { id: "oj" },
  { id: "oka" },
  { id: "oma", name: "Omaha-Ponca" },
  { id: "one", name: "Oneida" },
  { id: "ono", name: "Onondaga" },
  { id: "ood", name: "O'odham" },
  { id: "osa-Latn" },
  { id: "osa" },
  { id: "otw", name: "Ottawa" },
  { id: "pao", name: "Paiute" },
  { id: "par", name: "Timbisha" },
  { id: "paw", name: "Pawnee" },
  { id: "pim", name: "Powhatan" },
  { id: "pl" },
  { id: "pmw", name: "Plains Miwok" },
  { id: "pot", name: "Potawatomi" },
  { id: "pqm" },
  { id: "psy", name: "Piscataway" },
  { id: "pt" },
  { id: "puy", name: "Purisimeño" },
  { id: "pwi", name: "Patwin" },
  { id: "qua", name: "Quapaw" },
  { id: "qui", name: "Quileute" },
  { id: "qun", name: "Quinault" },
  { id: "qyp", name: "Quiripi" },
  { id: "rm" },
  { id: "ro" },
  { id: "ru" },
  { id: "sac", name: "Fox" },
  { id: "see" },
  { id: "ser", name: "Serrano" },
  { id: "shh", name: "Shoshoni" },
  { id: "sht", name: "Shasta" },
  { id: "sjw", name: "Shawnee" },
  { id: "sk" },
  { id: "skd", name: "Southern Sierra Miwok" },
  { id: "sl" },
  { id: "sm" },
  { id: "sq" },
  { id: "sqn", name: "Susquehannock" },
  { id: "sr" },
  { id: "sr-Latn" },
  { id: "str" },
  { id: "sv" },
  { id: "sxk", name: "Yoncalla" },
  { id: "ta" },
  { id: "taa", name: "Lower Tanana" },
  { id: "tau", name: "Upper Tanana" },
  { id: "tcb", name: "Tanacross" },
  { id: "te" },
  { id: "tew", name: "Tewa" },
  { id: "tfn", name: "Dena'ina" },
  { id: "th" },
  { id: "til", name: "Tillamook" },
  { id: "tix", name: "Southern Tiwa" },
  { id: "tkm", name: "Takelma" },
  { id: "tli" },
  { id: "tol", name: "Tolowa" },
  { id: "tow", name: "Jemez/Towa" },
  { id: "tqw", name: "Tonkawa" },
  { id: "tr" },
  { id: "tsi" },
  { id: "tub", name: "Tübatulabal" },
  { id: "tus", name: "Tuscarora" },
  { id: "tuu", name: "Tututni" },
  { id: "twa", name: "Twana" },
  { id: "twf", name: "Taos" },
  { id: "uk" },
  { id: "uma", name: "Umatilla" },
  { id: "umu" },
  { id: "unm", name: "Unami" },
  { id: "ute", name: "Colorado River Numic" },
  { id: "veo", name: "Ventureño" },
  { id: "vmv", name: "Chico" },
  { id: "wac", name: "Upper Chinook" },
  { id: "wam", name: "Massachusett" },
  { id: "wao", name: "Wappo" },
  { id: "was" },
  { id: "wdt", name: "Wendat" },
  { id: "wic", name: "Wichita" },
  { id: "win", name: "Ho-Chunk" },
  { id: "wiy", name: "Wiyot" },
  { id: "wlk", name: "Wailaki" },
  { id: "wnw", name: "Wintu" },
  { id: "wyn", name: "Wyandot" },
  { id: "xap", name: "Apalachee" },
  { id: "xaw", name: "Kawaiisu" },
  { id: "xch", name: "Chemakum" },
  { id: "xcn", name: "Cotoname" },
  { id: "xcw", name: "Coahuilteco" },
  { id: "xcy", name: "Cayuse" },
  { id: "xgf", name: "Tongva" },
  { id: "xnt", name: "Narragansett" },
  { id: "xpq", name: "Mohegan-Pequot" },
  { id: "xup", name: "Upper Umpqua" },
  { id: "xwc", name: "Woccon" },
  { id: "yak", name: "Sahaptin" },
  { id: "yaq", name: "Yaqui" },
  { id: "yok", name: "Yokuts" },
  { id: "yuc", name: "Yuchi" },
  { id: "yuf", name: "Havasupai-Hualapai" },
  { id: "yum", name: "Quechan" },
  { id: "yur", name: "Yurok" },
  { id: "zh" },
  { id: "zun" },
].map(({ id, name }) => {
  let cldrLangName = languageNames.of(id);
  return { id, name: cldrLangName === id ? name : cldrLangName };
});

function labelControlElement(tag, id) {
  var element = document.createElement(tag);
  element.id = id;
  Object.assign(element.style, {
    margin: "0 2.5px",
    color: "#444",
  });
  return element;
}

var tf = null;

langChanger.onclick = function () {
  hide(langChanger);
  show(langHeader);

  if (tf == null) {
    tf = new Tokenfield({
      el: document.querySelector("#language-picker"), // Attach Tokenfield to the input element with class "text-input"
      items: langCodes,
      newItems: false,
    });
    document.querySelectorAll(".tokenfield").forEach((e) => {
      Object.assign(e.style, {
        height: "5em",
        width: "20em",
        "margin-bottom": "4em",
        "margin-top": "0.3em",
      });
    });
    tf.on("change", function () {
      let items = tf.getItems();
      let langCodes = [];
      items.forEach((element) => langCodes.push(element.id));
      let langQuery = langCodes.join(",");
      let hash = window.location.hash.substr(1); // omit #
      let searchParams = new URLSearchParams(hash);
      searchParams.set("language", langQuery);
      window.location.hash = `#${searchParams}`;
    });
  }

  document.querySelectorAll(".tokenfield").forEach((e) => show(e));
  tf.focus();
};

langCancel.onclick = function () {
  document.querySelectorAll(".tokenfield").forEach((e) => hide(e));
  hide(langHeader);
  updateLanguageLabel();
  show(langChanger);
};

/**
 * Label for displaying the current language being used
 */
class LanguageControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    Object.assign(this._container.style, {
      margin: "0",
      padding: "0 5px",
      color: "#444",
      backgroundColor: "#ffffff80",
    });
    this._container.textContent = "";
    this._container.appendChild(langHeader);
    this._container.appendChild(langPicker);
    this._container.appendChild(langField);
    this._container.appendChild(langChanger);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export var label = new LanguageControl();

export function displayLocales(locales) {
  let languageNames = new Intl.DisplayNames(locales, { type: "language" });
  let listFormat = new Intl.ListFormat(locales, { type: "disjunction" });
  document.getElementById("language-field").textContent = listFormat.format(
    locales.map((locale) => languageNames.of(locale))
  );
}
