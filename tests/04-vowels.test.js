import assert from "node:assert/strict";
import { devanagariToLimbu, limbuToDevanagari } from "../src/index.js";

let total = 0;
let passed = 0;
let failed = 0;

function test(name, actual, expected) {
  total++;

  try {
    assert.equal(actual, expected);

    console.log(`✅ ${name}`);
    console.log(`   Input    : ${JSON.stringify(name)}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);

    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

function codePoints(text) {
  return [...text]
    .map(
      (char) =>
        `${char} U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
    )
    .join(" | ");
}

function testWithUnicode(name, actual, expected) {
  total++;

  try {
    assert.equal(actual, expected);

    console.log(`✅ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);
    console.log(`   Unicode  : ${codePoints(actual)}`);

    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);
    console.log(`   Expected Unicode: ${codePoints(expected)}`);
    console.log(`   Actual Unicode  : ${codePoints(actual)}`);
    console.log(`   ${error.message}`);
    failed++;
  }
}

/*
===============================================================================
01. INHERENT VOWEL
===============================================================================
A standalone consonant carries the inherent "a" sound.

Example:
क → ᤁ
===============================================================================
*/

testWithUnicode(
  "Inherent vowel: क",
  devanagariToLimbu("क"),
  "ᤁ"
);

testWithUnicode(
  "Inherent vowel: म",
  devanagariToLimbu("म"),
  "ᤔ"
);

testWithUnicode(
  "Inherent vowel: र",
  devanagariToLimbu("र"),
  "ᤖ"
);


/*
===============================================================================
02. LONG A / AA
===============================================================================
Devanagari:
का → Limbu consonant + ᤠ
===============================================================================
*/

testWithUnicode(
  "Long A: का",
  devanagariToLimbu("का"),
  "ᤁᤠ"
);

testWithUnicode(
  "Long A: मा",
  devanagariToLimbu("मा"),
  "ᤔᤠ"
);

testWithUnicode(
  "Long A: रा",
  devanagariToLimbu("रा"),
  "ᤖᤠ"
);


/*
===============================================================================
03. SHORT I / LONG I
===============================================================================
Mappings:
कि / की → ᤡ
===============================================================================
*/

testWithUnicode(
  "Short I: कि",
  devanagariToLimbu("कि"),
  "ᤁᤡ"
);

testWithUnicode(
  "Long I: की",
  devanagariToLimbu("की"),
  "ᤁᤡ᤺"
);

testWithUnicode(
  "Short I: मि",
  devanagariToLimbu("मि"),
  "ᤔᤡ"
);

testWithUnicode(
  "Long I: मी",
  devanagariToLimbu("मी"),
  "ᤔᤡ᤺"
);


/*
===============================================================================
04. SHORT U / LONG U
===============================================================================
Mappings:
कु / कू → ᤢ
===============================================================================
*/

testWithUnicode(
  "Short U: कु",
  devanagariToLimbu("कु"),
  "ᤁᤢ"
);

testWithUnicode(
  "Long U: कू",
  devanagariToLimbu("कू"),
  "ᤁᤢ᤺"
);

testWithUnicode(
  "Short U: मु",
  devanagariToLimbu("मु"),
  "ᤔᤢ"
);

testWithUnicode(
  "Long U: मू",
  devanagariToLimbu("मू"),
  "ᤔᤢ᤺"
);


/*
===============================================================================
05. E
===============================================================================
The mapping table contains two possible Devanagari "े" mappings:
  ᤣ
  ᤧ

The current implementation's .find() behavior determines which one is used.
This test records the actual configured forward mapping.
===============================================================================
*/

testWithUnicode(
  "E: के",
  devanagariToLimbu("के"),
  "ᤁᤣ"
);

testWithUnicode(
  "E: मे",
  devanagariToLimbu("मे"),
  "ᤔᤣ"
);


/*
===============================================================================
06. AI
===============================================================================
ै → ᤤ
===============================================================================
*/

testWithUnicode(
  "AI: कै",
  devanagariToLimbu("कै"),
  "ᤁᤤ"
);

testWithUnicode(
  "AI: मै",
  devanagariToLimbu("मै"),
  "ᤔᤤ"
);


/*
===============================================================================
07. O
===============================================================================
The mapping table contains:
ो → ᤥ
ो → ᤨ

The forward implementation uses the first matching mapping.
===============================================================================
*/

testWithUnicode(
  "O: को",
  devanagariToLimbu("को"),
  "ᤁᤥ"
);

testWithUnicode(
  "O: मो",
  devanagariToLimbu("मो"),
  "ᤔᤥ"
);


/*
===============================================================================
08. AU
===============================================================================
ौ → ᤦ
===============================================================================
*/

testWithUnicode(
  "AU: कौ",
  devanagariToLimbu("कौ"),
  "ᤁᤦ"
);

testWithUnicode(
  "AU: मौ",
  devanagariToLimbu("मौ"),
  "ᤔᤦ"
);


/*
===============================================================================
09. MULTIPLE VOWELS
===============================================================================
Test several vowels in one string so that index advancement and
vowel/consonant interaction are checked.
===============================================================================
*/

testWithUnicode(
  "Multiple vowels",
  devanagariToLimbu("का कि कु के कै को कौ"),
  "ᤁᤠ ᤁᤡ ᤁᤢ ᤁᤣ ᤁᤤ ᤁᤥ ᤁᤦ"
);


/*
===============================================================================
10. VOWELS WITH DIFFERENT CONSONANTS
===============================================================================
===============================================================================
*/

testWithUnicode(
  "Vowels with म",
  devanagariToLimbu("मा मि मु मे मै मो मौ"),
  "ᤔᤠ ᤔᤡ ᤔᤢ ᤔᤣ ᤔᤤ ᤔᤥ ᤔᤦ"
);

testWithUnicode(
  "Vowels with र",
  devanagariToLimbu("रा रि रु रे रै रो रौ"),
  "ᤖᤠ ᤖᤡ ᤖᤢ ᤖᤣ ᤖᤤ ᤖᤥ ᤖᤦ"
);


/*
===============================================================================
11. REVERSE VOWEL CONVERSION
===============================================================================
These tests verify Limbu → Devanagari using the current reverse mappings.
===============================================================================
*/

testWithUnicode(
  "Reverse A",
  limbuToDevanagari("ᤁ"),
  "क"
);

testWithUnicode(
  "Reverse AA",
  limbuToDevanagari("ᤁᤠ"),
  "का"
);

testWithUnicode(
  "Reverse I",
  limbuToDevanagari("ᤁᤡ"),
  "कि"
);

testWithUnicode(
  "Reverse U",
  limbuToDevanagari("ᤁᤢ"),
  "कु"
);

testWithUnicode(
  "Reverse E",
  limbuToDevanagari("ᤁᤣ"),
  "के"
);

testWithUnicode(
  "Reverse AI",
  limbuToDevanagari("ᤁᤤ"),
  "कै"
);

testWithUnicode(
  "Reverse O",
  limbuToDevanagari("ᤁᤥ"),
  "को"
);

testWithUnicode(
  "Reverse AU",
  limbuToDevanagari("ᤁᤦ"),
  "कौ"
);


/*
===============================================================================
12. EXACT UNICODE CODE POINTS
===============================================================================
===============================================================================
*/

testWithUnicode(
  "AA exact Unicode",
  devanagariToLimbu("का"),
  "ᤁᤠ"
);

testWithUnicode(
  "I exact Unicode",
  devanagariToLimbu("कि"),
  "ᤁᤡ"
);

testWithUnicode(
  "U exact Unicode",
  devanagariToLimbu("कु"),
  "ᤁᤢ"
);

testWithUnicode(
  "E exact Unicode",
  devanagariToLimbu("के"),
  "ᤁᤣ"
);

testWithUnicode(
  "AI exact Unicode",
  devanagariToLimbu("कै"),
  "ᤁᤤ"
);

testWithUnicode(
  "O exact Unicode",
  devanagariToLimbu("को"),
  "ᤁᤥ"
);

testWithUnicode(
  "AU exact Unicode",
  devanagariToLimbu("कौ"),
  "ᤁᤦ"
);


/*
===============================================================================
13. VOWEL + HALANTA INTERACTION
===============================================================================
These are important because the package has special Halanta handling.

क् → ᤹
===============================================================================
*/

testWithUnicode(
  "Halanta without vowel: क्",
  devanagariToLimbu("क्"),
  "ᤰ"
);

testWithUnicode(
  "Vowel after consonant: का",
  devanagariToLimbu("का"),
  "ᤁᤠ"
);


/*
===============================================================================
14. NO DEVANAGARI HALANTA LEAKAGE
===============================================================================
A valid vowel conversion must not accidentally retain U+094D.
===============================================================================
*/

const vowelInputs = [
  "का",
  "कि",
  "की",
  "कु",
  "कू",
  "के",
  "कै",
  "को",
  "कौ",
];

for (const input of vowelInputs) {
  total++;

  const actual = devanagariToLimbu(input);

  try {
    assert.equal(actual.includes("्"), false);

    console.log(`✅ No Devanagari Halanta leakage: ${input}`);
    console.log(`   Output  : ${actual}`);
    console.log(`   Unicode : ${codePoints(actual)}`);

    passed++;
  } catch (error) {
    console.log(`❌ Devanagari Halanta leakage: ${input}`);
    console.log(`   Output  : ${actual}`);
    console.log(`   Unicode : ${codePoints(actual)}`);

    failed++;
  }
}


/*
===============================================================================
FINAL SUMMARY
===============================================================================
*/

console.log("\n" + "=".repeat(80));
console.log("TEST SUMMARY");
console.log("=".repeat(80));
console.log(`Total tests : ${total}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);
console.log();

if (failed === 0) {
  console.log("✅ VOWEL TEST PASSED");
} else {
  console.log("❌ VOWEL TEST FAILED");
  process.exitCode = 1;
}