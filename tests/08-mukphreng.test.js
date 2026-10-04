import {
  devanagariToLimbu,
  limbuToDevanagari,
} from "../src/index.js";

function codePoint(char) {
  return `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;
}

function unicodeSequence(text) {
  return [...text]
    .map((char) => `${char} ${codePoint(char)}`)
    .join(" | ");
}

function assertEqual(label, actual, expected) {
  if (actual !== expected) {
    console.error(`\n❌ ${label}`);
    console.error(`Expected: "${expected}"`);
    console.error(`Actual:   "${actual}"`);
    console.error(`Expected Unicode: ${unicodeSequence(expected)}`);
    console.error(`Actual Unicode:   ${unicodeSequence(actual)}`);
    throw new Error(`${label} failed`);
  }

  console.log(`✅ ${label}`);
  console.log(`   "${actual}"`);
}

/*
|--------------------------------------------------------------------------
| 1. Unicode identity
|--------------------------------------------------------------------------
| Mukphreng = U+1939
| Sa-i      = U+193B
|--------------------------------------------------------------------------
*/

const MUKPHRENG = "᤹";
const SAI = "᤻";

assertEqual(
  "Mukphreng Unicode code point",
  codePoint(MUKPHRENG),
  "U+1939"
);

assertEqual(
  "Sa-i Unicode code point",
  codePoint(SAI),
  "U+193B"
);

/*
|--------------------------------------------------------------------------
| 2. Mukphreng and Sa-i must be different characters
|--------------------------------------------------------------------------
*/

assertEqual(
  "Mukphreng must not equal Sa-i",
  MUKPHRENG === SAI,
  false
);

assertEqual(
  "Mukphreng length",
  [...MUKPHRENG].length,
  1
);

assertEqual(
  "Sa-i length",
  [...SAI].length,
  1
);

/*
|--------------------------------------------------------------------------
| 3. Mukphreng must survive generic JavaScript string handling
|--------------------------------------------------------------------------
*/

const mukphrengWord = `ᤁ${MUKPHRENG}`;

assertEqual(
  "Ka + Mukphreng character count",
  [...mukphrengWord].length,
  2
);

assertEqual(
  "Ka + Mukphreng exact Unicode sequence",
  unicodeSequence(mukphrengWord),
  "ᤁ U+1901 | ᤹ U+1939"
);

/*
|--------------------------------------------------------------------------
| 4. Mukphreng must not silently become Sa-i
|--------------------------------------------------------------------------
*/

const mukphrengInput = `ᤁ${MUKPHRENG}`;
const saiInput = `ᤁ${SAI}`;

if (mukphrengInput === saiInput) {
  throw new Error(
    "❌ Mukphreng and Sa-i were incorrectly treated as identical."
  );
}

console.log("✅ Mukphreng and Sa-i remain distinct");

/*
|--------------------------------------------------------------------------
| 5. Direct reverse conversion of Mukphreng
|--------------------------------------------------------------------------
| Mukphreng is a Limbu-specific modifier. It is NOT the Devanagari
| halanta and therefore must not become "्".
|
| The current mapping matrix does not define a Devanagari equivalent
| for Mukphreng.
|--------------------------------------------------------------------------
*/

const mukphrengReverse = limbuToDevanagari(MUKPHRENG);

if (mukphrengReverse === "्") {
  throw new Error(
    `❌ Mukphreng ${MUKPHRENG} was incorrectly converted to Devanagari halanta "्".`
  );
}

if (mukphrengReverse === SAI) {
  throw new Error(
    `❌ Mukphreng ${MUKPHRENG} was incorrectly converted to Sa-i ${SAI}.`
  );
}

console.log(
  `✅ Mukphreng does not convert to halanta or Sa-i: "${mukphrengReverse}"`
);

/*
|--------------------------------------------------------------------------
| 6. Sa-i remains the actual Devanagari-halanta mapping
|--------------------------------------------------------------------------
*/

assertEqual(
  "Sa-i → Devanagari halanta",
  limbuToDevanagari(SAI),
  "्"
);

assertEqual(
  "Devanagari halanta → Sa-i",
  devanagariToLimbu("्"),
  SAI
);

/*
|--------------------------------------------------------------------------
| 7. Mukphreng must not be confused with Sa-i inside text
|--------------------------------------------------------------------------
*/

const mixed = `ᤁ${MUKPHRENG}${SAI}`;

assertEqual(
  "Mixed Mukphreng + Sa-i character count",
  [...mixed].length,
  3
);

assertEqual(
  "Mixed Mukphreng + Sa-i Unicode sequence",
  unicodeSequence(mixed),
  "ᤁ U+1901 | ᤹ U+1939 | ᤻ U+193B"
);

/*
|--------------------------------------------------------------------------
| 8. Production safety check
|--------------------------------------------------------------------------
| The forward converter receives Devanagari text. A raw Limbu
| Mukphreng character should therefore not be interpreted as a
| Devanagari halanta.
|--------------------------------------------------------------------------
*/

const forwardMukphreng = devanagariToLimbu(MUKPHRENG);
// console.log(MUKPHRENG)
// console.log(devanagariToLimbu(MUKPHRENG));
// console.log(SAI)
// console.log(devanagariToLimbu(SAI));
if (forwardMukphreng === SAI) {
  throw new Error(
    `❌ Forward converter incorrectly changes Mukphreng ${MUKPHRENG} into Sa-i ${SAI}.`
  );
}

console.log(
  `✅ Forward converter does not treat Mukphreng ${MUKPHRENG} as Sa-i`
);

console.log("\n🎉 Test 08: MUKPHRENG TESTS PASSED");