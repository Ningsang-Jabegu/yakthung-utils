import assert from "node:assert/strict";
import {
  devanagariToLimbu,
  limbuToDevanagari,
} from "../src/index.js";

function unicodeCodePoints(text) {
  return Array.from(text).map(
    (char) =>
      `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
  );
}

function printResult(name, input, expected, actual) {
  console.log(`\n${name}`);
  console.log(`   Input    : ${input}`);
  console.log(`   Expected : ${expected}`);
  console.log(`   Actual   : ${actual}`);
  console.log(
    `   Input Unicode    : ${unicodeCodePoints(input).join(" ")}`
  );
  console.log(
    `   Expected Unicode : ${unicodeCodePoints(expected).join(" ")}`
  );
  console.log(
    `   Actual Unicode   : ${unicodeCodePoints(actual).join(" ")}`
  );
}

function testExact(name, actual, expected, input) {
  try {
    assert.equal(actual, expected);
    console.log(`✅ ${name}`);
  } catch (error) {
    printResult(name, input, expected, actual);
    throw error;
  }
}

console.log("=== Unicode Integrity Tests ===");

// ============================================================
// 1. Basic Limbu Unicode characters
// ============================================================

testExact(
  "Limbu consonant U+1901",
  devanagariToLimbu("क"),
  "ᤁ",
  "क"
);

testExact(
  "Limbu consonant U+1919",
  devanagariToLimbu("श"),
  "ᤙ",
  "श"
);

testExact(
  "Limbu consonant U+191A",
  devanagariToLimbu("ष"),
  "ᤚ",
  "ष"
);

testExact(
  "Limbu consonant U+191B",
  devanagariToLimbu("स"),
  "ᤛ",
  "स"
);

// ============================================================
// 2. Important Limbu special code points
// ============================================================

testExact(
  "Sa-i U+193B → Devanagari halanta",
  limbuToDevanagari("᤻"),
  "्",
  "᤻"
);

testExact(
  "Loo U+1940",
  limbuToDevanagari("᥀"),
  "लो! (punctuation mark)",
  "᥀"
);

// ============================================================
// 3. Exact Unicode code-point checks
// ============================================================

const unicodeCases = [
  ["ᤁ", "U+1901"],
  ["ᤂ", "U+1902"],
  ["ᤃ", "U+1903"],
  ["ᤄ", "U+1904"],
  ["ᤅ", "U+1905"],
  ["ᤙ", "U+1919"],
  ["ᤚ", "U+191A"],
  ["ᤛ", "U+191B"],
  ["ᤜ", "U+191C"],
  ["ᤠ", "U+1920"],
  ["ᤡ", "U+1921"],
  ["ᤢ", "U+1922"],
  ["ᤣ", "U+1923"],
  ["ᤤ", "U+1924"],
  ["ᤥ", "U+1925"],
  ["ᤦ", "U+1926"],
  ["᤹", "U+1939"],
  ["᤺", "U+193A"],
  ["᤻", "U+193B"],
  ["᥀", "U+1940"],
];

for (const [char, expectedCodePoint] of unicodeCases) {
  const actualCodePoint =
    `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;

  testExact(
    `${char} has Unicode ${expectedCodePoint}`,
    actualCodePoint,
    expectedCodePoint,
    char
  );
}

// ============================================================
// 4. Devanagari punctuation must remain exact
// ============================================================

testExact(
  "Danda । preserved exactly",
  devanagariToLimbu("।"),
  "।",
  "।"
);

testExact(
  "Double danda ॥ preserved exactly",
  devanagariToLimbu("॥"),
  "॥",
  "॥"
);

testExact(
  "Danda reverse preserved exactly",
  limbuToDevanagari("।"),
  "।",
  "।"
);

testExact(
  "Double danda reverse preserved exactly",
  limbuToDevanagari("॥"),
  "॥",
  "॥"
);

// ============================================================
// 5. No UTF-16 surrogate corruption
// ============================================================

const integrityInputs = [
  "ᤁ",
  "ᤁᤠ",
  "ᤁᤡ᤺",
  "ᤏᤧᤛ᤻ᤛᤧ",
  "᥀",
  "᤹",
  "᤺",
  "᤻",
  "।",
  "॥",
];

for (const input of integrityInputs) {
  const output = limbuToDevanagari(input);

  assert.equal(
    output.includes("\uFFFD"),
    false,
    `Replacement character U+FFFD found in output for: ${input}`
  );

  assert.equal(
    /[\uD800-\uDFFF]/.test(output),
    false,
    `Unpaired UTF-16 surrogate found in output for: ${input}`
  );

  console.log(`✅ No Unicode corruption: ${input}`);
}

// ============================================================
// 6. Code-point count must use Array.from(), not .length
// ============================================================

const codePointCases = [
  "ᤁ",
  "ᤁᤠ",
  "ᤁᤡ᤺",
  "ᤏᤧᤛ᤻ᤛᤧ",
  "᥀",
];

for (const input of codePointCases) {
  const codePoints = Array.from(input);

  assert.equal(
    codePoints.every(
      (char) =>
        Number.isInteger(char.codePointAt(0)) &&
        char.codePointAt(0) >= 0 &&
        char.codePointAt(0) <= 0x10ffff
    ),
    true,
    `Invalid Unicode code point detected in: ${input}`
  );

  console.log(`✅ Valid Unicode code points: ${input}`);
}

// ============================================================
// 7. Unicode normalization must not silently alter Limbu text
// ============================================================

const normalizationCases = [
  "ᤁ",
  "ᤁᤠ",
  "ᤁᤡ᤺",
  "ᤏᤧᤛ᤻ᤛᤧ",
  "᥀",
];

for (const input of normalizationCases) {
  assert.equal(
    input.normalize("NFC"),
    input,
    `NFC changed Limbu text: ${input}`
  );

  console.log(`✅ NFC stable: ${input}`);
}

// ============================================================
// 8. Mixed-script Unicode integrity
// ============================================================

const mixedCases = [
  "कᤁ",
  "नेᤏᤧ",
  "ᤏᤧस्ते",
  "᥀।",
  "ᤁ॥",
];

for (const input of mixedCases) {
  const output = devanagariToLimbu(input);

  assert.equal(
    output.includes("\uFFFD"),
    false,
    `Replacement character found in mixed-script output: ${input}`
  );

  assert.equal(
    /[\uD800-\uDFFF]/.test(output),
    false,
    `Surrogate corruption found in mixed-script output: ${input}`
  );

  console.log(`✅ Mixed-script Unicode integrity: ${input}`);
}

console.log("\n========================================");
console.log("✅ ALL UNICODE INTEGRITY TESTS PASSED");
console.log("========================================");