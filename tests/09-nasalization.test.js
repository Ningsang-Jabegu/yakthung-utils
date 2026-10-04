// tests/09-nasalization.test.js

import {
  devanagariToLimbu,
  limbuToDevanagari
} from "../src/index.js";

let passed = 0;
let failed = 0;

function unicodeSequence(text) {
  return [...text]
    .map(char => `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`)
    .join(" ");
}

function test(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);
    console.log(`   Expected Unicode: ${unicodeSequence(expected)}`);
    console.log(`   Actual Unicode  : ${unicodeSequence(actual)}`);
    console.log("");
    failed++;
  }
}

function section(title) {
  console.log("");
  console.log(`=== ${title} ===`);
}

// ============================================================
// FORWARD CONVERSION
// ============================================================

section("Forward Conversion");

// Anusvara
test(
  "ं → ᤱ",
  devanagariToLimbu("ं"),
  "ᤱ"
);

// Chandrabindu
test(
  "ँ → ᤱ",
  devanagariToLimbu("ँ"),
  "ᤱ"
);

// Anusvara after consonant
test(
  "कं → ᤁᤱ",
  devanagariToLimbu("कं"),
  "ᤁᤱ"
);

// Chandrabindu after consonant
test(
  "कँ → ᤁᤱ",
  devanagariToLimbu("कँ"),
  "ᤁᤱ"
);

// Anusvara with vowel sign
test(
  "कां → ᤁᤠᤱ",
  devanagariToLimbu("कां"),
  "ᤁᤠᤱ"
);

test(
  "किं → ᤁᤡᤱ",
  devanagariToLimbu("किं"),
  "ᤁᤡᤱ"
);

test(
  "कुं → ᤁᤢᤱ",
  devanagariToLimbu("कुं"),
  "ᤁᤢᤱ"
);

test(
  "कों → ᤁᤥᤱ",
  devanagariToLimbu("कों"),
  "ᤁᤥᤱ"
);

// Multiple nasalizations
test(
  "कंमं → ᤁᤱᤔᤱ",
  devanagariToLimbu("कंमं"),
  "ᤁᤱᤔᤱ"
);

// Nasalization inside a longer word
test(
  "संसार → ᤛᤱᤛᤠᤖ",
  devanagariToLimbu("संसार"),
  "ᤛᤱᤛᤠᤖ"
);

// ============================================================
// REVERSE CONVERSION
// ============================================================

section("Reverse Conversion");

// Limbu Small Nga
test(
  "ᤱ → ं",
  limbuToDevanagari("ᤱ"),
  "ं"
);

// Limbu Small Anusvara
test(
  "ᤲ → ं",
  limbuToDevanagari("ᤲ"),
  "ं"
);

// After consonant
test(
  "ᤁᤱ → कं",
  limbuToDevanagari("ᤁᤱ"),
  "कं"
);

// Small Anusvara after consonant
test(
  "ᤁᤲ → कं",
  limbuToDevanagari("ᤁᤲ"),
  "कं"
);

// With vowels
test(
  "ᤁᤠᤱ → कां",
  limbuToDevanagari("ᤁᤠᤱ"),
  "कां"
);

test(
  "ᤁᤡᤱ → किं",
  limbuToDevanagari("ᤁᤡᤱ"),
  "किं"
);

test(
  "ᤁᤢᤱ → कुं",
  limbuToDevanagari("ᤁᤢᤱ"),
  "कुं"
);

test(
  "ᤁᤥᤱ → कों",
  limbuToDevanagari("ᤁᤥᤱ"),
  "कों"
);

// Multiple nasalizations
test(
  "ᤁᤱᤔᤱ → कंमं",
  limbuToDevanagari("ᤁᤱᤔᤱ"),
  "कंमं"
);

// Word
test(
  "ᤛᤱᤛᤠᤖ → संसार",
  limbuToDevanagari("ᤛᤱᤛᤠᤖ"),
  "संसार"
);

// ============================================================
// ANUSVARA VS CHANDRABINDU
// ============================================================

section("Anusvara and Chandrabindu Normalization");

test(
  "Anusvara and Chandrabindu share Limbu output",
  devanagariToLimbu("ं"),
  devanagariToLimbu("ँ")
);

test(
  "Both normalize to ᤱ",
  devanagariToLimbu("ँ"),
  "ᤱ"
);

// Reverse normalization
test(
  "ᤱ always returns Devanagari anusvara",
  limbuToDevanagari("ᤱ"),
  "ं"
);

// ============================================================
// SURROUNDING TEXT PRESERVATION
// ============================================================

section("Surrounding Text Preservation");

test(
  "Nasalization preserves prefix",
  devanagariToLimbu("कंम"),
  "ᤁᤱᤔ"
);

test(
  "Nasalization preserves suffix",
  devanagariToLimbu("मंक"),
  "ᤔᤱᤁ"
);

test(
  "Multiple nasal marks remain separate",
  devanagariToLimbu("ंं"),
  "ᤱᤱ"
);

test(
  "Reverse multiple nasal marks",
  limbuToDevanagari("ᤱᤱ"),
  "ंं"
);

// ============================================================
// UNICODE INTEGRITY
// ============================================================

section("Unicode Integrity");

test(
  "ᤱ is exactly U+1931",
  unicodeSequence("ᤱ"),
  "U+1931"
);

test(
  "ᤲ is exactly U+1932",
  unicodeSequence("ᤲ"),
  "U+1932"
);

test(
  "ं is exactly U+0902",
  unicodeSequence("ं"),
  "U+0902"
);

test(
  "ँ is exactly U+0901",
  unicodeSequence("ँ"),
  "U+0901"
);

// ============================================================
// RESULTS
// ============================================================

console.log("");
console.log(`Passed: ${passed} Failed: ${failed} Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
}