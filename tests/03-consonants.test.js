import {
  devanagariToLimbu,
  limbuToDevanagari,
} from "../src/index.js";

function showUnicode(text) {
  return [...text]
    .map(
      (char) =>
        `${char} U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
    )
    .join(" | ");
}

function assertConversion(label, input, expected, actual) {
  if (actual !== expected) {
    console.error(`\n❌ ${label}`);
    console.error(`Input:    "${input}"`);
    console.error(`Expected: "${expected}"`);
    console.error(`Actual:   "${actual}"`);
    console.error(`Expected Unicode: ${showUnicode(expected)}`);
    console.error(`Actual Unicode:   ${showUnicode(actual)}`);
    throw new Error(`${label} failed`);
  }

  console.log(`✅ ${label}`);
  console.log(`   ${input} → ${actual}`);
}

/*
|--------------------------------------------------------------------------
| 1. Individual consonants
|--------------------------------------------------------------------------
*/

const consonants = [
  ["अ", "ᤀ", "A / Vowel Carrier"],
  ["क", "ᤁ", "Ka"],
  ["ख", "ᤂ", "Kha"],
  ["ग", "ᤃ", "Ga"],
  ["घ", "ᤄ", "Gha"],
  ["ङ", "ᤅ", "Nga"],
  ["च", "ᤆ", "Ca"],
  ["छ", "ᤇ", "Cha"],
  ["ज", "ᤈ", "Ja"],
  ["झ", "ᤉ", "Jha"],
  ["ञ", "ᤊ", "Nya"],
  ["त", "ᤋ", "Ta"],
  ["थ", "ᤌ", "Tha"],
  ["द", "ᤍ", "Da"],
  ["ध", "ᤎ", "Dha"],
  ["न", "ᤏ", "Na"],
  ["प", "ᤐ", "Pa"],
  ["फ", "ᤑ", "Pha"],
  ["ब", "ᤒ", "Ba"],
  ["भ", "ᤓ", "Bha"],
  ["म", "ᤔ", "Ma"],
  ["य", "ᤕ", "Ya"],
  ["र", "ᤖ", "Ra"],
  ["ल", "ᤗ", "La"],
  ["व", "ᤘ", "Wa"],
  ["श", "ᤙ", "Sha"],
  ["ष", "ᤚ", "Ssa"],
  ["स", "ᤛ", "Sa"],
  ["ह", "ᤜ", "Ha"],
  ["ज्ञ", "ᤝ", "Gya"],
  ["त्र", "ᤞ", "Tra"],
];

for (const [devanagari, limbu, name] of consonants) {
  assertConversion(
    `${name}: ${devanagari} → ${limbu}`,
    devanagari,
    limbu,
    devanagariToLimbu(devanagari)
  );

  assertConversion(
    `${name} reverse: ${limbu} → ${devanagari}`,
    limbu,
    devanagari,
    limbuToDevanagari(limbu)
  );
}

/*
|--------------------------------------------------------------------------
| 2. Fallback consonants
|--------------------------------------------------------------------------
| Retroflex Devanagari characters normalize to their native dental
| equivalents according to mappings.js.
|--------------------------------------------------------------------------
*/

const fallbacks = [
  ["ट", "ᤋ", "त"],
  ["ठ", "ᤌ", "थ"],
  ["ड", "ᤍ", "द"],
  ["ढ", "ᤎ", "ध"],
  ["ण", "ᤏ", "न"],
];

for (const [retroflex, limbu, nativeDevanagari] of fallbacks) {
  assertConversion(
    `Fallback: ${retroflex} → ${limbu}`,
    retroflex,
    limbu,
    devanagariToLimbu(retroflex)
  );

  assertConversion(
    `Fallback reverse: ${limbu} → ${nativeDevanagari}`,
    limbu,
    nativeDevanagari,
    limbuToDevanagari(limbu)
  );
}

/*
|--------------------------------------------------------------------------
| 3. Gyan and Tra
|--------------------------------------------------------------------------
| IMPORTANT:
|
| ज्ञ is two Devanagari code points:
|   ज + ् + ञ
|
| But mappings.js defines the complete Devanagari sequence "ज्ञ"
| as the single Limbu character ᤝ U+191D.
|
| त्र is similarly defined as:
|   त + ् + र
|
| and maps to the single Limbu character ᤞ U+191E.
|--------------------------------------------------------------------------
*/

assertConversion(
  "Gyan compound: ज्ञ → ᤝ",
  "ज्ञ",
  "ᤝ",
  devanagariToLimbu("ज्ञ")
);

assertConversion(
  "Gyan reverse: ᤝ → ज्ञ",
  "ᤝ",
  "ज्ञ",
  limbuToDevanagari("ᤝ")
);

assertConversion(
  "Tra compound: त्र → ᤞ",
  "त्र",
  "ᤞ",
  devanagariToLimbu("त्र")
);

assertConversion(
  "Tra reverse: ᤞ → त्र",
  "ᤞ",
  "त्र",
  limbuToDevanagari("ᤞ")
);

/*
|--------------------------------------------------------------------------
| 4. All consonants together
|--------------------------------------------------------------------------
*/

const allConsonantsDevanagari =
  "अकखगघङचछजझञतथदधनपफबभमयरलवशषसहज्ञत्र";

const allConsonantsLimbu =
  "ᤀᤁᤂᤃᤄᤅᤆᤇᤈᤉᤊᤋᤌᤍᤎᤏᤐᤑᤒᤓᤔᤕᤖᤗᤘᤙᤚᤛᤜᤝᤞ";

assertConversion(
  "ALL CONSONANTS TOGETHER",
  allConsonantsDevanagari,
  allConsonantsLimbu,
  devanagariToLimbu(allConsonantsDevanagari)
);

assertConversion(
  "ALL CONSONANTS REVERSE",
  allConsonantsLimbu,
  allConsonantsDevanagari,
  limbuToDevanagari(allConsonantsLimbu)
);

/*
|--------------------------------------------------------------------------
| 5. Gyan and Tra inside words
|--------------------------------------------------------------------------
*/

const wordCases = [
  ["ज्ञान", "ᤝᤠᤏ"],
  ["त्राण", "ᤞᤠᤏ"],
  ["ज्ञानी", "ᤝᤠᤏᤡ᤺"],
  ["मन्त्र", "ᤔᤴᤞ"],
];

for (const [devanagari, expectedLimbu] of wordCases) {
  assertConversion(
    `Word: ${devanagari} → ${expectedLimbu}`,
    devanagari,
    expectedLimbu,
    devanagariToLimbu(devanagari)
  );
}

console.log("\n🎉 Test 03: ALL CONSONANT TESTS PASSED");