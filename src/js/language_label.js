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
  { id: "am" },
  { id: "ar" },
  { id: "az" },
  { id: "be" },
  { id: "bg" },
  { id: "br" },
  { id: "bs" },
  { id: "ca" },
  { id: "co" },
  { id: "cs" },
  { id: "cy" },
  { id: "da" },
  { id: "de" },
  { id: "el" },
  { id: "en" },
  { id: "eo" },
  { id: "es" },
  { id: "et" },
  { id: "eu" },
  { id: "fi" },
  { id: "fr" },
  { id: "fy" },
  { id: "ga" },
  { id: "gd" },
  { id: "he" },
  { id: "hi" },
  { id: "hr" },
  { id: "hu" },
  { id: "hy" },
  { id: "id" },
  { id: "is" },
  { id: "it" },
  { id: "ja" },
  // { id: "ja_kana"},
  { id: "ja-Latn" },
  { id: "ja-Hira" },
  { id: "ka" },
  { id: "kk" },
  { id: "kn" },
  { id: "ko" },
  { id: "ko-Latn" },
  { id: "ku" },
  { id: "la" },
  { id: "lb" },
  { id: "lt" },
  { id: "lv" },
  { id: "mk" },
  { id: "ml" },
  { id: "mt" },
  { id: "nl" },
  { id: "no" },
  { id: "oc" },
  { id: "pl" },
  { id: "pt" },
  { id: "rm" },
  { id: "ro" },
  { id: "ru" },
  { id: "sk" },
  { id: "sl" },
  { id: "sq" },
  { id: "sr" },
  { id: "sr-Latn" },
  { id: "sv" },
  { id: "ta" },
  { id: "te" },
  { id: "th" },
  { id: "tr" },
  { id: "uk" },
  { id: "zh" },

  // Indigenous languages of the United States

  // These languages are grouped by linguistic family, in loose geographical
  // order from northwest to southeast. The English name of each language is
  // included as a fallback, in case CLDR is missing data on language names.

  // Eskaleut
  { id: "ale", name: "Aleut" },
  { id: "ems", name: "Alutiiq" },
  { id: "ess", name: "Central Siberian Yupik" },
  { id: "esu", name: "Central Alaskan Yupik" },
  { id: "ik", name: "Iñupiaq" },
  // Na-Dené
  { id: "aht", name: "Ahtna" },
  { id: "apj", name: "Jicarilla" },
  { id: "apk", name: "Plains Apache" },
  { id: "apl", name: "Lipan" },
  { id: "apm", name: "Mescalero-Chiricahua" },
  { id: "apw", name: "Western Apache" },
  { id: "coq", name: "Coquille" },
  { id: "ctc", name: "Chetco" },
  { id: "eya", name: "Eyak" },
  { id: "gce", name: "Galice" },
  { id: "gwi", name: "Gwich'in" },
  { id: "haa", name: "Hän" },
  { id: "hoi", name: "Holikachuk" },
  { id: "hup", name: "Hupa" },
  { id: "ing", name: "Deg Xinag" },
  { id: "koy", name: "Koyukon" },
  { id: "ktw", name: "Cahto" },
  { id: "kuu", name: "Upper Kuskokwim" },
  { id: "nv", name: "Navajo" },
  { id: "taa", name: "Lower Tanana" },
  { id: "tau", name: "Upper Tanana" },
  { id: "tcb", name: "Tanacross" },
  { id: "tfn", name: "Dena'ina" },
  { id: "tli", name: "Tlingit" },
  { id: "tol", name: "Tolowa" },
  { id: "tuu", name: "Tututni" },
  { id: "wlk", name: "Wailaki" },
  { id: "xup", name: "Upper Umpqua" },
  // Salishan
  { id: "cea", name: "Lower Chehalis" },
  { id: "cjh", name: "Upper Chehalis" },
  { id: "clm", name: "Klallam" },
  { id: "col", name: "Columbia-Moses" },
  { id: "cow", name: "Cowlitz" },
  { id: "crd", name: "Coeur d'Alene" },
  { id: "fla", name: "Salish-Spokane-Kalispel" },
  { id: "hur", name: "Halkomelem" },
  { id: "lut", name: "Lushootseed" },
  { id: "nok", name: "Nooksack" },
  { id: "oka", name: "Okanagan" },
  { id: "qun", name: "Quinault" },
  { id: "str", name: "Straits Salish" },
  { id: "til", name: "Tillamook" },
  { id: "twa", name: "Twana" },
  // (Penutian)
  { id: "kyl", name: "Central Kalapuyan" },
  { id: "kla", name: "Klamath" },
  { id: "mjd", name: "Konkow" },
  { id: "nez", name: "Nez Perce" },
  { id: "nmu", name: "Maidu" },
  { id: "nol", name: "Nomlaki" },
  { id: "nrt", name: "Northern Kalapuyan" },
  { id: "nsz", name: "Nisenan" },
  { id: "pwi", name: "Patwin" },
  { id: "sxk", name: "Yoncalla" },
  { id: "uma", name: "Umatilla" },
  { id: "vmv", name: "Chico" },
  { id: "wnw", name: "Wintu" },
  { id: "yak", name: "Sahaptin" },
  // (Hokan)
  { id: "acv", name: "Achumawi" },
  { id: "cid", name: "Chimariko" },
  { id: "esq", name: "Esselen" },
  { id: "sht", name: "Shasta" },
  { id: "xcn", name: "Cotoname" },
  { id: "xcw", name: "Coahuilteco" },
  // Chumashan
  { id: "boi", name: "Barbareño" },
  { id: "crz", name: "Cruzeño" },
  { id: "inz", name: "Ineseño" },
  { id: "obi", name: "Obispeño" },
  { id: "puy", name: "Purisimeño" },
  { id: "veo", name: "Ventureño" },
  // Yok-Utian
  { id: "csi", name: "Coast Miwok" },
  { id: "csm", name: "Central Sierra Miwok" },
  { id: "css", name: "Southern Ohlone" },
  { id: "cst", name: "Northern Ohlone" },
  { id: "krb", name: "Karkin" },
  { id: "lmw", name: "Lake Miwok" },
  { id: "nsq", name: "Northern Sierra Miwok" },
  { id: "pmw", name: "Plains Miwok" },
  { id: "skd", name: "Southern Sierra Miwok" },
  { id: "yok", name: "Yokuts" },
  // Uto-Aztecan
  { id: "chl", name: "Cahuilla" },
  { id: "com", name: "Comanche" },
  { id: "cup", name: "Cupeño" },
  { id: "hop", name: "Hopi" },
  { id: "lui", name: "Luiseño" },
  { id: "mnr", name: "Mono" },
  { id: "ood", name: "O'odham" },
  { id: "pao", name: "Paiute" },
  { id: "par", name: "Timbisha" },
  { id: "ser", name: "Serrano" },
  { id: "shh", name: "Shoshoni" },
  { id: "tub", name: "Tübatulabal" },
  { id: "ute", name: "Colorado River Numic" },
  { id: "xaw", name: "Kawaiisu" },
  { id: "xgf", name: "Tongva" },
  { id: "yaq", name: "Yaqui" },
  // Yuman
  { id: "coc", name: "Cocopah" },
  { id: "dih", name: "Kumeyaay" },
  { id: "mov", name: "Mohave" },
  { id: "mrc", name: "Maricopa" },
  { id: "yuf", name: "Havasupai-Hualapai" },
  { id: "yum", name: "Quechan" },
  // Tanoan
  { id: "kio", name: "Kiowa" },
  { id: "tew", name: "Tewa" },
  { id: "tix", name: "Southern Tiwa" },
  { id: "tow", name: "Jemez/Towa" },
  { id: "twf", name: "Taos" },
  // Caddoan
  { id: "ari", name: "Arikara" },
  { id: "cad", name: "Caddo" },
  { id: "kii", name: "Kitsai" },
  { id: "paw", name: "Pawnee" },
  { id: "wic", name: "Wichita" },
  // Siouan
  { id: "asb", name: "Assiniboine" },
  { id: "chc", name: "Catawba" },
  { id: "cro", name: "Crow" },
  { id: "dak", name: "Dakota" },
  { id: "hid", name: "Hidatsa" },
  { id: "iow", name: "Chiwere" },
  { id: "ksk", name: "Kansa" },
  { id: "lkt", name: "Lakota" },
  { id: "mhq", name: "Mandan" },
  { id: "oma", name: "Omaha-Ponca" },
  { id: "osa", name: "Osage" },
  { id: "osa-Latn", name: "Osage (Latin)" },
  { id: "qua", name: "Quapaw" },
  { id: "win", name: "Ho-Chunk" },
  { id: "xwc", name: "Woccon" },
  // Algic
  { id: "aaq", name: "Abenaki (Eastern)" },
  { id: "abe", name: "Abenaki (Western)" },
  { id: "arp", name: "Arapahoe" },
  { id: "ats", name: "Gros Ventre" },
  { id: "bla", name: "Siksiká" },
  { id: "chy", name: "Cheyenne" },
  { id: "crr", name: "Carolina Algonquian" },
  { id: "del", name: "Delaware (Broad)" },
  { id: "etc", name: "Etchemin" },
  { id: "mez", name: "Menominee" },
  { id: "mia", name: "Miami-Illinois" },
  { id: "mjy", name: "Mohican" },
  { id: "nnt", name: "Nanticoke" },
  { id: "oj", name: "Ojibwe" },
  { id: "otw", name: "Ottawa" },
  { id: "pim", name: "Powhatan" },
  { id: "pot", name: "Potawatomi" },
  { id: "pqm", name: "Maliseet-Passamaquoddy" },
  { id: "psy", name: "Piscataway" },
  { id: "qyp", name: "Quiripi" },
  { id: "sac", name: "Fox" },
  { id: "sjw", name: "Shawnee" },
  { id: "umu", name: "Munsee" },
  { id: "unm", name: "Unami" },
  { id: "wam", name: "Massachusett" },
  { id: "wiy", name: "Wiyot" },
  { id: "xnt", name: "Narragansett" },
  { id: "xpq", name: "Mohegan-Pequot" },
  { id: "yur", name: "Yurok" },
  // Iroquoian
  { id: "cay", name: "Cayuga" },
  { id: "chr", name: "Cherokee" },
  { id: "chr-Latn", name: "Cherokee (Latin)" },
  { id: "moh", name: "Mohawk" },
  { id: "ntw", name: "Nottoway" },
  { id: "nwy", name: "Nottoway-Meherrin" },
  { id: "one", name: "Oneida" },
  { id: "ono", name: "Onondaga" },
  { id: "see", name: "Seneca" },
  { id: "sqn", name: "Susquehannock" },
  { id: "tus", name: "Tuscarora" },
  { id: "wdt", name: "Wendat" },
  { id: "wyn", name: "Wyandot" },
  // Muskogean
  { id: "akz", name: "Alabama-Coushatta" },
  { id: "cic", name: "Chickasaw" },
  { id: "cho", name: "Choctaw" },
  { id: "cku", name: "Koasati" },
  { id: "mik", name: "Mikasuki" },
  { id: "mus", name: "Muscogee" },
  { id: "xap", name: "Apalachee" },
  // Austronesian
  { id: "ch", name: "Chamorro" },
  { id: "haw", name: "Hawaiian" },
  { id: "sm", name: "Samoan" },
  // Isolates, creoles and others
  { id: "aes", name: "Alsea" },
  { id: "aqp", name: "Atakapa" },
  { id: "chh", name: "Lower Chinook" },
  { id: "chn", name: "Chinook Jargon" },
  { id: "ctm", name: "Chitimacha" },
  { id: "csz", name: "Hanis" },
  { id: "hai", name: "Haida" },
  { id: "iml", name: "Miluk" },
  { id: "kee", name: "Keres (Eastern)" },
  { id: "kjq", name: "Keres (Western)" },
  { id: "kut", name: "Kutenai" },
  { id: "kyh", name: "Karuk" },
  { id: "lou", name: "Louisiana Creole" },
  { id: "qui", name: "Quileute" },
  { id: "tkm", name: "Takelma" },
  { id: "tsi", name: "Coast Tsimshian" },
  { id: "tqw", name: "Tonkawa" },
  { id: "wac", name: "Upper Chinook" },
  { id: "wao", name: "Wappo" },
  { id: "was", name: "Washo" },
  { id: "xch", name: "Chemakum" },
  { id: "xcy", name: "Cayuse" },
  { id: "yuc", name: "Yuchi" },
  { id: "zun", name: "Zuni" },
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
