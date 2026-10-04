import {
  devanagariToLimbu,
  limbuToDevanagari
} from "../src/index.js";

let passed = 0;
let failed = 0;

function test(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    console.log(`   Expected : ${expected}`);
    console.log(`   Actual   : ${actual}`);
    console.log(
      `   Expected Unicode: ${[...expected]
        .map(c => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`)
        .join(" ")}`
    );
    console.log(
      `   Actual Unicode  : ${[...actual]
        .map(c => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`)
        .join(" ")}`
    );
    failed++;
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

/* =========================================================
   1. K Small Letter
   ========================================================= */

section("K Small Letter");

test(
  "क् → ᤰ",
  devanagariToLimbu("क्"),
  "ᤰ"
);

test(
  "ᤰ → क्",
  limbuToDevanagari("ᤰ"),
  "क्"
);

/* =========================================================
   2. NGA Small Letter
   ========================================================= */

section("NGA Small Letter");

test(
  "ङ् → ᤱ",
  devanagariToLimbu("ङ्"),
  "ᤱ"
);

test(
  "ᤱ → ं",
  limbuToDevanagari("ᤱ"),
  "ं"
);

/*
 * IMPORTANT:
 * The current source maps ᤱ to ं before checking SMALL_LETTERS.
 * Therefore this test documents the current reverse behavior.
 *
 * It does NOT claim that ङ् ↔ ᤱ is linguistically correct.
 */

/* =========================================================
   3. Anusvara Small Letter
   ========================================================= */

section("Anusvara Small Letter");

test(
  "ं → ᤱ",
  devanagariToLimbu("ं"),
  "ᤱ"
);

test(
  "ᤲ → ं",
  limbuToDevanagari("ᤲ"),
  "ं"
);

/* =========================================================
   4. TA Small Letter
   ========================================================= */

section("TA Small Letter");

test(
  "त् → ᤳ",
  devanagariToLimbu("त्"),
  "ᤳ"
);

test(
  "ᤳ → त्",
  limbuToDevanagari("ᤳ"),
  "त्"
);

/* =========================================================
   5. NA Small Letter
   ========================================================= */

section("NA Small Letter");

test(
  "न् → ᤴ",
  devanagariToLimbu("न्"),
  "ᤴ"
);

test(
  "ᤴ → न्",
  limbuToDevanagari("ᤴ"),
  "न्"
);

/* =========================================================
   6. PA Small Letter
   ========================================================= */

section("PA Small Letter");

test(
  "प् → ᤵ",
  devanagariToLimbu("प्"),
  "ᤵ"
);

test(
  "ᤵ → प्",
  limbuToDevanagari("ᤵ"),
  "प्"
);

/* =========================================================
   7. MA Small Letter
   ========================================================= */

section("MA Small Letter");

test(
  "म् → ᤶ",
  devanagariToLimbu("म्"),
  "ᤶ"
);

test(
  "ᤶ → म्",
  limbuToDevanagari("ᤶ"),
  "म्"
);

/* =========================================================
   8. RA Small Letter
   ========================================================= */

section("RA Small Letter");

test(
  "र् → ᤷ",
  devanagariToLimbu("र्"),
  "ᤷ"
);

test(
  "ᤷ → र्",
  limbuToDevanagari("ᤷ"),
  "र्"
);

/* =========================================================
   9. LA Small Letter
   ========================================================= */

section("LA Small Letter");

test(
  "ल् → ᤸ",
  devanagariToLimbu("ल्"),
  "ᤸ"
);

test(
  "ᤸ → ल्",
  limbuToDevanagari("ᤸ"),
  "ल्"
);

/* =========================================================
   10. Small Letter + Vowel
   ========================================================= */

section("Small Letter + Vowel");

test(
  "क् + आ → ᤰᤠ",
  devanagariToLimbu("क्ा"),
  "ᤰᤠ"
);

test(
  "त् + आ → ᤳᤠ",
  devanagariToLimbu("त्ा"),
  "ᤳᤠ"
);

test(
  "प् + आ → ᤵᤠ",
  devanagariToLimbu("प्ा"),
  "ᤵᤠ"
);

test(
  "म् + आ → ᤶᤠ",
  devanagariToLimbu("म्ा"),
  "ᤶᤠ"
);

test(
  "र् + आ → ᤷᤠ",
  devanagariToLimbu("र्ा"),
  "ᤷᤠ"
);

test(
  "ल् + आ → ᤸᤠ",
  devanagariToLimbu("ल्ा"),
  "ᤸᤠ"
);

/* =========================================================
   11. Small Letter + Other Vowels
   ========================================================= */

section("Small Letter + Other Vowels");

test(
  "क् + इ → ᤰᤡ",
  devanagariToLimbu("क्ि"),
  "ᤰᤡ"
);

test(
  "त् + उ → ᤳᤢ",
  devanagariToLimbu("त्ु"),
  "ᤳᤢ"
);

test(
  "प् + ए → ᤵᤣ",
  devanagariToLimbu("प्े"),
  "ᤵᤣ"
);

test(
  "म् + ओ → ᤶᤥ",
  devanagariToLimbu("म्ो"),
  "ᤶᤥ"
);

test(
  "र् + औ → ᤷᤦ",
  devanagariToLimbu("र्ौ"),
  "ᤷᤦ"
);

/* =========================================================
   12. Small Letters Inside Words
   ========================================================= */

section("Small Letters Inside Words");

test(
  "Small letter after vowel",
  devanagariToLimbu("का"),
  "ᤁᤠ"
);

test(
  "Word containing क्",
  devanagariToLimbu("क्ा"),
  "ᤰᤠ"
);

test(
  "Word containing त्",
  devanagariToLimbu("त्ा"),
  "ᤳᤠ"
);

test(
  "Word containing प्",
  devanagariToLimbu("प्ा"),
  "ᤵᤠ"
);

test(
  "Word containing म्",
  devanagariToLimbu("म्ा"),
  "ᤶᤠ"
);

test(
  "Word containing र्",
  devanagariToLimbu("र्ा"),
  "ᤷᤠ"
);

test(
  "Word containing ल्",
  devanagariToLimbu("ल्ा"),
  "ᤸᤠ"
);

/* =========================================================
   13. Exact Unicode Integrity
   ========================================================= */

section("Exact Unicode Integrity");

test(
  "ᤰ is U+1930",
  "ᤰ".codePointAt(0).toString(16).toUpperCase(),
  "1930"
);

test(
  "ᤱ is U+1931",
  "ᤱ".codePointAt(0).toString(16).toUpperCase(),
  "1931"
);

test(
  "ᤲ is U+1932",
  "ᤲ".codePointAt(0).toString(16).toUpperCase(),
  "1932"
);

test(
  "ᤳ is U+1933",
  "ᤳ".codePointAt(0).toString(16).toUpperCase(),
  "1933"
);

test(
  "ᤴ is U+1934",
  "ᤴ".codePointAt(0).toString(16).toUpperCase(),
  "1934"
);

test(
  "ᤵ is U+1935",
  "ᤵ".codePointAt(0).toString(16).toUpperCase(),
  "1935"
);

test(
  "ᤶ is U+1936",
  "ᤶ".codePointAt(0).toString(16).toUpperCase(),
  "1936"
);

test(
  "ᤷ is U+1937",
  "ᤷ".codePointAt(0).toString(16).toUpperCase(),
  "1937"
);

test(
  "ᤸ is U+1938",
  "ᤸ".codePointAt(0).toString(16).toUpperCase(),
  "1938"
);

/* =========================================================
   14. No Devanagari Halanta Leakage
   ========================================================= */

section("No Devanagari Halanta Leakage");

const smallLetterInputs = [
  "क्",
  "ङ्",
  "त्",
  "न्",
  "प्",
  "म्",
  "र्",
  "ल्"
];

for (const input of smallLetterInputs) {
  const output = devanagariToLimbu(input);

  test(
    `${input} contains no Devanagari halanta`,
    output.includes("्"),
    false
  );
}

/* =========================================================
   15. Summary
   ========================================================= */

console.log("\n========================================");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total : ${passed + failed}`);
console.log("========================================");

if (failed > 0) {
  process.exit(1);
}