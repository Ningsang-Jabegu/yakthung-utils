import {
  devanagariToLimbu,
  limbuToDevanagari,
} from "../src/index.js";

let passed = 0;
let failed = 0;

function codePoints(text) {
  return [...text]
    .map(
      (char) =>
        `U+${char
          .codePointAt(0)
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}`
    )
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
    console.log(`   Expected Unicode: ${codePoints(expected)}`);
    console.log(`   Actual Unicode  : ${codePoints(actual)}`);
    failed++;
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

/*
 * ============================================================================
 * IMPORTANT RESEARCH NOTE
 * ============================================================================
 *
 * The expected outputs in this file represent the observed computational
 * behavior discovered during exploratory testing of the current implementation.
 *
 * They do NOT automatically constitute:
 *
 *   1. modern Yakthung orthographic validation,
 *   2. linguistic validation,
 *   3. proof that the output is the preferred Sirijanga representation.
 *
 * If later research determines that a mapping should change, update the
 * expected value only after recording the decision in the
 * DISCOVERY, COVERAGE & EXCEPTION LOG and formal mapping inventory.
 */

/*
 * ============================================================================
 * 1. CONJUNCT / SEQUENCE DISCOVERIES
 * ============================================================================
 */

section("Conjunct / Sequence Discoveries");

const conjunctCases = [
  ["क्ष", "ᤰᤚ", "Observed v0.0.1 output"],
  ["त्र", "ᤞ", "Observed v0.0.1 output"],
  ["ज्ञ", "ᤝ", "Observed v0.0.1 output"],
  ["श्र", "ᤙᤪ", "Observed v0.0.1 output"],
];

for (const [input, expected, description] of conjunctCases) {
  test(
    `${description}: ${input} → ${expected}`,
    devanagariToLimbu(input),
    expected
  );
}

/*
 * ============================================================================
 * 2. NUKTA CHARACTER DISCOVERIES
 * ============================================================================
 *
 * Current implementation preserves the unsupported nukta mark.
 */

section("Nukta Character Discoveries");

const nuktaCases = [
  ["क़", "ᤁ़"],
  ["ख़", "ᤂ़"],
  ["ग़", "ᤃ़"],
  ["ज़", "ᤈ़"],
  ["फ़", "ᤑ़"],
];

for (const [input, expected] of nuktaCases) {
  test(
    `${input} → ${expected}`,
    devanagariToLimbu(input),
    expected
  );
}

/*
 * ============================================================================
 * 3. OTHER UNSUPPORTED DEVANAGARI CHARACTERS
 * ============================================================================
 */

section("Unsupported / Preserved Characters");

const unsupportedCases = [
  ["ऋ", "ऋ"],
  ["ृ", "ृ"],
  ["ॐ", "ॐ"],
];

for (const [input, expected] of unsupportedCases) {
  test(
    `${input} remains preserved`,
    devanagariToLimbu(input),
    expected
  );
}

/*
 * ============================================================================
 * 4. REAL-WORLD NEPALI WORDS WITH NUKTA CHARACTERS
 * ============================================================================
 */

section("Real-World Nepali Nukta Words");

const realWorldWords = [
  ["ज़िल्ला", "ज़ᤡᤸᤗᤠ"],
  ["कमज़ोर", "ᤁᤔज़ᤥᤖ"],
  ["फ़िल्म", "फ़ᤡᤸᤔ"],
  ["तक्लीफ़", "ᤋᤰᤗᤡ᤺फ़"],
  ["ख़बर", "ख़ᤒᤖ"],
  ["ख़ुशी", "ख़ᤢᤙᤡ᤺"],
  ["क़लम", "क़ᤗᤔ"],
  ["ग़लत", "ग़ᤗᤋ"],
];

for (const [input, expected] of realWorldWords) {
  test(
    `${input} → ${expected}`,
    devanagariToLimbu(input),
    expected
  );
}

/*
 * ============================================================================
 * 5. MIXED REAL-WORLD CASES
 * ============================================================================
 */

section("Mixed Real-World Input");

const mixedCases = [
  [
    "ज़िल्ला २०२६",
    "ज़ᤡᤸᤗᤠ ᥈᥆᥈᥌",
  ],
  [
    "ख़ुशी!",
    "ख़ᤢᤙᤡ᤺᥄",
  ],
];

for (const [input, expected] of mixedCases) {
  test(
    `${input} → ${expected}`,
    devanagariToLimbu(input),
    expected
  );
}

/*
 * ============================================================================
 * 6. UNICODE PRESERVATION CHECKS
 * ============================================================================
 */

section("Unicode Preservation");

const preservationCases = [
  ["क़", "ᤁ़"],
  ["ख़", "ᤂ़"],
  ["ग़", "ᤃ़"],
  ["ज़", "ᤈ़"],
  ["फ़", "ᤑ़"],
  ["ॐ", "ॐ"],
];

for (const [input, expected] of preservationCases) {
  const actual = devanagariToLimbu(input);

  test(
    `${input} Unicode sequence preserved correctly`,
    actual,
    expected
  );

  console.log(
    `   Unicode: ${codePoints(actual)}`
  );
}

/*
 * ============================================================================
 * FINAL RESULT
 * ============================================================================
 */

console.log("\n=== TEST SUMMARY ===");
console.log(`Total tests : ${passed + failed}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);

if (failed > 0) {
  console.error("\n❌ REAL-WORLD DEVANAGARI CASE TEST FAILED");
  process.exitCode = 1;
} else {
  console.log("\n✅ REAL-WORLD DEVANAGARI CASE TEST PASSED");
}