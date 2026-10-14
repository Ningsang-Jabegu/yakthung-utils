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
 * 1. INDEPENDENT DEVANAGARI VOWELS → SIRIJANGA
 * ============================================================================
 *
 * Sirijanga/Limbu does not have separate independent vowel letters.
 * Syllable-initial vowels use U+1900 VOWEL-CARRIER LETTER plus a vowel sign.
 *
 * The long I/U cases additionally use U+193A KEMPHRENG.
 */

section("Independent Devanagari Vowels → Sirijanga");

const independentVowels = [
  ["अ", "ᤀ", "A / vowel carrier"],
  ["आ", "ᤀᤠ", "AA"],
  ["इ", "ᤀᤡ", "I"],
  ["ई", "ᤀᤡ᤺", "II / long I"],
  ["उ", "ᤀᤢ", "U"],
  ["ऊ", "ᤀᤢ᤺", "UU / long U"],
  ["ए", "ᤀᤣ", "E"],
  ["ऐ", "ᤀᤤ", "AI"],
  ["ओ", "ᤀᤥ", "O"],
  ["औ", "ᤀᤦ", "AU"],
];

for (const [devanagari, expectedLimbu, description] of independentVowels) {
  test(
    `${description}: ${devanagari} → ${expectedLimbu}`,
    devanagariToLimbu(devanagari),
    expectedLimbu
  );
}

/*
 * ============================================================================
 * 2. SIRIJANGA → DEVANAGARI
 * ============================================================================
 */

section("Sirijanga → Independent Devanagari Vowels");

const reverseVowels = [
  ["ᤀ", "अ", "A / vowel carrier"],
  ["ᤀᤠ", "आ", "AA"],
  ["ᤀᤡ", "इ", "I"],
  ["ᤀᤡ᤺", "ई", "II / long I"],
  ["ᤀᤢ", "उ", "U"],
  ["ᤀᤢ᤺", "ऊ", "UU / long U"],
  ["ᤀᤣ", "ए", "E"],
  ["ᤀᤤ", "ऐ", "AI"],
  ["ᤀᤥ", "ओ", "O"],
  ["ᤀᤦ", "औ", "AU"],
];

for (const [limbu, expectedDevanagari, description] of reverseVowels) {
  test(
    `${description}: ${limbu} → ${expectedDevanagari}`,
    limbuToDevanagari(limbu),
    expectedDevanagari
  );
}

/*
 * ============================================================================
 * 3. ALL INDEPENDENT VOWELS TOGETHER
 * ============================================================================
 */

section("All Independent Vowels Together");

const allDevanagari = independentVowels
  .map(([devanagari]) => devanagari)
  .join("");

const allExpectedLimbu = independentVowels
  .map(([, limbu]) => limbu)
  .join("");

test(
  "All independent vowels in one sequence",
  devanagariToLimbu(allDevanagari),
  allExpectedLimbu
);

/*
 * ============================================================================
 * 4. REAL WORD STRUCTURE WITH INITIAL VOWELS
 * ============================================================================
 *
 * These are computational sequence tests, not claims of linguistic validation.
 */

section("Initial Vowel + Consonant Sequences");

const wordCases = [
  ["आमा", "ᤀᤠᤔᤠ"],
  ["इटा", "ᤀᤡᤋᤠ"],
  ["ईश्वर", "ᤀᤡ᤺ᤙᤫᤖ"],
  ["उखु", "ᤀᤢᤂᤢ"],
  ["ऊर्जा", "ᤀᤢ᤺ᤖᤈᤠ"],
  ["एक", "ᤀᤣᤁ"],
  ["ऐना", "ᤀᤤᤏᤠ"],
  ["ओखर", "ᤀᤥᤂᤖ"],
  ["औषधि", "ᤀᤦᤚᤎᤡ"],
];

for (const [input, expected] of wordCases) {
  test(
    `${input} → ${expected}`,
    devanagariToLimbu(input),
    expected
  );
}

/*
 * ============================================================================
 * 5. UNICODE INTEGRITY
 * ============================================================================
 */

section("Independent Vowel Unicode Integrity");

for (const [, expectedLimbu, description] of independentVowels) {
  console.log(
    `ℹ️ ${description}: ${codePoints(expectedLimbu)}`
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
  console.error("\n❌ INDEPENDENT VOWEL TEST FAILED");
  process.exitCode = 1;
} else {
  console.log("\n✅ INDEPENDENT VOWEL TEST PASSED");
}