import assert from "node:assert/strict";
import {
  devanagariToLimbu,
  limbuToDevanagari
} from "../src/index.js";

let total = 0;
let passed = 0;
let failed = 0;

function codePoints(text) {
  return [...text]
    .map(
      char =>
        `${char} U+${char.codePointAt(0)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}`
    )
    .join(" | ");
}

function test(name, actual, expected) {
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
01. BASIC SUBJOINT MAPPINGS
===============================================================================

Devanagari:
क् + य → ᤁᤩ
क् + र → ᤁᤪ
क् + व → ᤁᤫ

The source implementation detects:
    consonant + halanta + य/र/व

and converts the medial portion using SUBJOINTS.
===============================================================================
*/

test(
  "Ka + Ya subjoint: क्या",
  devanagariToLimbu("क्य"),
  "ᤁᤩ"
);

test(
  "Ka + Ra subjoint: क्र",
  devanagariToLimbu("क्र"),
  "ᤁᤪ"
);

test(
  "Ka + Va subjoint: क्व",
  devanagariToLimbu("क्व"),
  "ᤁᤫ"
);


/*
===============================================================================
02. DIFFERENT CONSONANTS WITH YA
===============================================================================
*/

test(
  "Ma + Ya subjoint: म्य",
  devanagariToLimbu("म्य"),
  "ᤔᤩ"
);

test(
  "Ta + Ya subjoint: त्य",
  devanagariToLimbu("त्य"),
  "ᤋᤩ"
);

test(
  "Pa + Ya subjoint: प्य",
  devanagariToLimbu("प्य"),
  "ᤐᤩ"
);


/*
===============================================================================
03. DIFFERENT CONSONANTS WITH RA
===============================================================================
*/

test(
  "Ma + Ra subjoint: म्र",
  devanagariToLimbu("म्र"),
  "ᤔᤪ"
);

test(
  "Ta + Ra subjoint: त्र",
  devanagariToLimbu("त्र"),
  "ᤞ"
);

test(
  "Pa + Ra subjoint: प्र",
  devanagariToLimbu("प्र"),
  "ᤐᤪ"
);


/*
===============================================================================
04. DIFFERENT CONSONANTS WITH VA
===============================================================================
*/

test(
  "Ma + Va subjoint: म्व",
  devanagariToLimbu("म्व"),
  "ᤔᤫ"
);

test(
  "Ta + Va subjoint: त्व",
  devanagariToLimbu("त्व"),
  "ᤋᤫ"
);

test(
  "Pa + Va subjoint: प्व",
  devanagariToLimbu("प्व"),
  "ᤐᤫ"
);


/*
===============================================================================
05. SUBJOINT + VOWEL
===============================================================================

Verify that the subjoint is followed correctly by a vowel sign.

Example:
क्या → ᤁᤩᤠ
क्रि → ᤁᤪᤡ
क्वु → ᤁᤫᤢ
===============================================================================
*/

test(
  "Ya subjoint + AA: क्या",
  devanagariToLimbu("क्या"),
  "ᤁᤩᤠ"
);

test(
  "Ra subjoint + I: क्रि",
  devanagariToLimbu("क्रि"),
  "ᤁᤪᤡ"
);

test(
  "Va subjoint + U: क्वु",
  devanagariToLimbu("क्वु"),
  "ᤁᤫᤢ"
);

test(
  "Ya subjoint + E: म्ये",
  devanagariToLimbu("म्ये"),
  "ᤔᤩᤣ"
);

test(
  "Ra subjoint + O: प्रो",
  devanagariToLimbu("प्रो"),
  "ᤐᤪᤥ"
);

test(
  "Va subjoint + AU: क्वौ",
  devanagariToLimbu("क्वौ"),
  "ᤁᤫᤦ"
);


/*
===============================================================================
06. SUBJOINTS INSIDE WORDS
===============================================================================
*/

test(
  "Subjoint in word: प्रयास",
  devanagariToLimbu("प्रयास"),
  "ᤐᤪᤕᤠᤛ"
);

test(
  "Subjoint in word: क्रिया",
  devanagariToLimbu("क्रिया"),
  "ᤁᤪᤡᤕᤠ"
);

test(
  "Subjoint in word: प्यारा",
  devanagariToLimbu("प्यारा"),
  "ᤐᤩᤠᤖᤠ"
);


/*
===============================================================================
07. ALL THREE SUBJOINTS TOGETHER
===============================================================================
*/

test(
  "All three subjoint types",
  devanagariToLimbu("क्य क्र क्व"),
  "ᤁᤩ ᤁᤪ ᤁᤫ"
);


/*
===============================================================================
08. SUBJOINT MUST NOT LEAK DEVANAGARI HALANTA
===============================================================================
*/

const subjointInputs = [
  "क्य",
  "क्र",
  "क्व",
  "म्य",
  "म्र",
  "म्व",
  "त्य",
  "त्र",
  "त्व",
  "प्य",
  "प्र",
  "प्व"
];

for (const input of subjointInputs) {
  total++;

  const actual = devanagariToLimbu(input);

  try {
    assert.equal(actual.includes("्"), false);

    console.log(`✅ No Halanta leakage: ${input}`);
    console.log(`   Output  : ${actual}`);
    console.log(`   Unicode : ${codePoints(actual)}`);

    passed++;
  } catch (error) {
    console.log(`❌ Halanta leakage: ${input}`);
    console.log(`   Output  : ${actual}`);
    console.log(`   Unicode : ${codePoints(actual)}`);

    failed++;
  }
}


/*
===============================================================================
09. REVERSE SUBJOINT CONVERSION
===============================================================================

Verify:
ᤩ → ्य
ᤪ → ्र
ᤫ → ्व
===============================================================================
*/

test(
  "Reverse Ya subjoint",
  limbuToDevanagari("ᤁᤩ"),
  "क्य"
);

test(
  "Reverse Ra subjoint",
  limbuToDevanagari("ᤁᤪ"),
  "क्र"
);

test(
  "Reverse Va subjoint",
  limbuToDevanagari("ᤁᤫ"),
  "क्व"
);


/*
===============================================================================
10. REVERSE SUBJOINT + VOWEL
===============================================================================
*/

test(
  "Reverse Ya + AA",
  limbuToDevanagari("ᤁᤩᤠ"),
  "क्या"
);

test(
  "Reverse Ra + I",
  limbuToDevanagari("ᤁᤪᤡ"),
  "क्रि"
);

test(
  "Reverse Va + U",
  limbuToDevanagari("ᤁᤫᤢ"),
  "क्वु"
);


/*
===============================================================================
11. EXACT UNICODE CODE POINTS
===============================================================================
*/

test(
  "Ya subjoint exact Unicode",
  devanagariToLimbu("क्य"),
  "ᤁᤩ"
);

test(
  "Ra subjoint exact Unicode",
  devanagariToLimbu("क्र"),
  "ᤁᤪ"
);

test(
  "Va subjoint exact Unicode",
  devanagariToLimbu("क्व"),
  "ᤁᤫ"
);


/*
===============================================================================
12. SUBJOINT ORDER
===============================================================================

The expected order is:

CONSONANT + SUBJOINT + VOWEL

not:

CONSONANT + VOWEL + SUBJOINT
===============================================================================
*/

test(
  "Correct order: consonant + Ya + vowel",
  devanagariToLimbu("क्या"),
  "ᤁᤩᤠ"
);

test(
  "Correct order: consonant + Ra + vowel",
  devanagariToLimbu("क्रि"),
  "ᤁᤪᤡ"
);

test(
  "Correct order: consonant + Va + vowel",
  devanagariToLimbu("क्वु"),
  "ᤁᤫᤢ"
);


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
  console.log("✅ SUBJOINT TEST PASSED");
} else {
  console.log("❌ SUBJOINT TEST FAILED");
  process.exitCode = 1;
}