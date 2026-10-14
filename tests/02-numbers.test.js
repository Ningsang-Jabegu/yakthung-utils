// tests/02-numbers.test.js

import { convertToLimbuDigits } from "../src/index.js";

// ============================================================================
// TEST HELPERS
// ============================================================================

let passed = 0;
let failed = 0;

function codePoint(char) {
  if (typeof char !== "string" || char.length === 0) return "N/A";

  return [...char]
    .map(
      c =>
        `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
    )
    .join(" ");
}

function assertEqual(testName, input, expected) {
  const actual = convertToLimbuDigits(input);

  if (actual === expected) {
    console.log(`✅ ${testName}`);
    passed++;
  } else {
    console.error(`❌ ${testName}`);
    console.error(`   Input    : ${JSON.stringify(input)}`);
    console.error(`   Expected : ${JSON.stringify(expected)}`);
    console.error(`   Actual   : ${JSON.stringify(actual)}`);
    console.error(`   Expected Unicode: ${codePoint(expected)}`);
    console.error(`   Actual Unicode  : ${codePoint(actual)}`);
    failed++;
  }
}

function section(title) {
  console.log("\n" + "=".repeat(80));
  console.log(title);
  console.log("=".repeat(80));
}

// ============================================================================
// EXPECTED NUMBER MAP
// ============================================================================

const NUMBER_MAP = {
   "0": "᥆",
  "1": "᥇",
  "2": "᥈",
  "3": "᥉",
  "4": "᥊",
  "5": "᥋",
  "6": "᥌",
  "7": "᥍",
  "8": "᥎",
  "9": "᥏",

  "०": "᥆",
  "१": "᥇",
  "२": "᥈",
  "३": "᥉",
  "४": "᥊",
  "५": "᥋",
  "६": "᥌",
  "७": "᥍",
  "८": "᥎",
  "९": "᥏",
};

// ============================================================================
// 1. INDIVIDUAL DIGITS
// ============================================================================

section("1. INDIVIDUAL DIGITS");

for (const [devanagariDigit, limbuDigit] of Object.entries(NUMBER_MAP)) {
  assertEqual(
    `Devanagari digit ${devanagariDigit} → Limbu digit`,
    devanagariDigit,
    limbuDigit
  );
}

// ============================================================================
// 2. UNICODE INTEGRITY OF EACH DIGIT
// ============================================================================

section("2. UNICODE INTEGRITY");

const expectedCodePoints = {
  "᥆": "U+1946",
  "᥇": "U+1947",
  "᥈": "U+1948",
  "᥉": "U+1949",
  "᥊": "U+194A",
  "᥋": "U+194B",
  "᥌": "U+194C",
  "᥍": "U+194D",
  "᥎": "U+194E",
  "᥏": "U+194F",
};

for (const [digit, expectedUnicode] of Object.entries(expectedCodePoints)) {
  const actualUnicode = codePoint(digit);

  if (actualUnicode === expectedUnicode) {
    console.log(`✅ ${digit} is ${expectedUnicode}`);
    passed++;
  } else {
    console.error(`❌ ${digit} Unicode mismatch`);
    console.error(`   Expected: ${expectedUnicode}`);
    console.error(`   Actual  : ${actualUnicode}`);
    failed++;
  }
}

// ============================================================================
// 3. ALL TEN DIGITS TOGETHER
// ============================================================================

section("3. ALL DIGITS TOGETHER");

assertEqual(
  "0123456789 → Limbu digits",
  "0123456789",
  "᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏"
);

// Reverse-order test

assertEqual(
  "9876543210 → Limbu digits",
  "9876543210",
  "᥏᥎᥍᥌᥋᥊᥉᥈᥇᥆"
);

// ============================================================================
// 4. REPEATED DIGITS
// ============================================================================

section("4. REPEATED DIGITS");

assertEqual("00000", "00000", "᥆᥆᥆᥆᥆");
assertEqual("11111", "11111", "᥇᥇᥇᥇᥇");
assertEqual("22222", "22222", "᥈᥈᥈᥈᥈");
assertEqual("33333", "33333", "᥉᥉᥉᥉᥉");
assertEqual("44444", "44444", "᥊᥊᥊᥊᥊");
assertEqual("55555", "55555", "᥋᥋᥋᥋᥋");
assertEqual("66666", "66666", "᥌᥌᥌᥌᥌");
assertEqual("77777", "77777", "᥍᥍᥍᥍᥍");
assertEqual("88888", "88888", "᥎᥎᥎᥎᥎");
assertEqual("99999", "99999", "᥏᥏᥏᥏᥏");

// ============================================================================
// 5. COMMON NUMBERS
// ============================================================================

section("5. COMMON NUMBERS");

assertEqual("10", "10", "᥇᥆");
assertEqual("11", "11", "᥇᥇");
assertEqual("12", "12", "᥇᥈");
assertEqual("20", "20", "᥈᥆");
assertEqual("21", "21", "᥈᥇");
assertEqual("25", "25", "᥈᥋");
assertEqual("50", "50", "᥋᥆");
assertEqual("99", "99", "᥏᥏");
assertEqual("100", "100", "᥇᥆᥆");
assertEqual("101", "101", "᥇᥆᥇");
assertEqual("202", "202", "᥈᥆᥈");
assertEqual("500", "500", "᥋᥆᥆");
assertEqual("999", "999", "᥏᥏᥏");

// ============================================================================
// 6. LARGE NUMBERS
// ============================================================================

section("6. LARGE NUMBERS");

assertEqual(
  "2026",
  "2026",
  "᥈᥆᥈᥌"
);

assertEqual(
  "2025",
  "2025",
  "᥈᥆᥈᥋"
);

assertEqual(
  "2082",
  "2082",
  "᥈᥆᥎᥈"
);

assertEqual(
  "2083",
  "2083",
  "᥈᥆᥎᥉"
);

assertEqual(
  "1234567890",
  "1234567890",
  "᥇᥈᥉᥊᥋᥌᥍᥎᥏᥆"
);

// ============================================================================
// 7. NUMBERS INSIDE TEXT
// ============================================================================

section("7. NUMBERS INSIDE TEXT");

// assertEqual(
//   "English text + digits",
//   "Year 2026",
//   "Year ᥈᥆᥈᥌"
// );

// assertEqual(
//   "Devanagari text + digits",
//   "सन् २०२६",
//   "सन् ᥈᥆᥈᥌"
// );

// assertEqual(
//   "Mixed text and digits",
//   "ABC123XYZ",
//   "ABC᥇᥈᥉XYZ"
// );

// assertEqual(
//   "Digits separated by spaces",
//   "1 2 3 4 5",
//   "᥇ ᥈ ᥉ ᥊ ᥋"
// );

// assertEqual(
//   "Digits with punctuation",
//   "1,2,3,4,5",
//   "᥇,᥈,᥉,᥊,᥋"
// );

assertEqual(
  "Devanagari text + ASCII digits",
  "सन् 2026",
  "सन् ᥈᥆᥈᥌"
);

// ============================================================================
// 8. NUMBERS WITH COMMON PUNCTUATION
// ============================================================================

section("8. NUMBERS + PUNCTUATION");

assertEqual("Decimal-like value", "123.45", "᥇᥈᥉.᥊᥋");

assertEqual(
  "Date",
  "2026-09-28",
  "᥈᥆᥈᥌-᥆᥏-᥈᥎"
);

assertEqual(
  "Time",
  "18:30",
  "᥇᥎:᥉᥆"
);

assertEqual(
  "Phone-like number",
  "9841234567",
  "᥏᥎᥊᥇᥈᥉᥊᥋᥌᥍"
);

// ============================================================================
// 9. NUMBERS WITH LIMBU TEXT
// ============================================================================

section("9. LIMBU TEXT + NUMBERS");

assertEqual(
  "Limbu text with digits",
  "ᤀ 2026",
  "ᤀ ᥈᥆᥈᥌"
);

assertEqual(
  "Limbu digits remain unchanged",
  "ᤀ᥇᥈᥉",
  "ᤀ᥇᥈᥉"
);

// ============================================================================
// 10. EXISTING LIMBU DIGITS MUST NOT CHANGE
// ============================================================================

section("10. EXISTING LIMBU DIGITS");

for (const limbuDigit of Object.values(NUMBER_MAP)) {
  assertEqual(
    `${limbuDigit} remains unchanged`,
    limbuDigit,
    limbuDigit
  );
}

assertEqual(
  "All Limbu digits remain unchanged",
  "᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏",
  "᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏"
);

// ============================================================================
// 11. NON-NUMERIC CHARACTERS MUST REMAIN UNCHANGED
// ============================================================================

section("11. NON-NUMERIC CHARACTERS");

assertEqual("Latin letters", "ABCxyz", "ABCxyz");

assertEqual(
  "Devanagari letters",
  "किरिति",
  "किरिति"
);

assertEqual(
  "Punctuation",
  ".,!?;:-_",
  ".,!?;:-_"
);

assertEqual(
  "Whitespace",
  "   ",
  "   "
);

// ============================================================================
// 12. EMPTY STRING
// ============================================================================

section("12. EMPTY STRING");

assertEqual("Empty string", "", "");

// ============================================================================
// 13. ZERO-PADDING
// ============================================================================

section("13. ZERO-PADDING");

assertEqual("001", "001", "᥆᥆᥇");
assertEqual("007", "007", "᥆᥆᥍");
assertEqual("010", "010", "᥆᥇᥆");
assertEqual("020", "020", "᥆᥈᥆");
assertEqual("0010", "0010", "᥆᥆᥇᥆");
assertEqual("0002026", "0002026", "᥆᥆᥆᥈᥆᥈᥌");

// ============================================================================
// 14. LONG NUMERIC STRINGS
// ============================================================================

section("14. LONG NUMERIC STRINGS");

assertEqual(
  "Long repeated numeric sequence",
  "12345678901234567890",
  "᥇᥈᥉᥊᥋᥌᥍᥎᥏᥆᥇᥈᥉᥊᥋᥌᥍᥎᥏᥆"
);

assertEqual(
  "1000000000",
  "1000000000",
  "᥇᥆᥆᥆᥆᥆᥆᥆᥆᥆"
);

// ============================================================================
// 15. TYPE SAFETY
// ============================================================================

section("15. TYPE SAFETY");

// These tests verify the current function's behavior for non-string input.
// Do NOT assume the result unless the implementation defines it.
// The expected values below should be changed if the API contract changes.

assertEqual(
  "null is converted to string",
  null,
  "null"
);

assertEqual(
  "undefined is converted to string",
  undefined,
  "undefined"
);

assertEqual(
  "number input is converted and digits localized",
  2026,
  "᥈᥆᥈᥌"
);

assertEqual(
  "boolean input is converted to string",
  true,
  "true"
);

assertEqual(
  "object input is converted to string",
  {},
  "[object Object]"
);

assertEqual(
  "array input is converted to string",
  [],
  ""
);

// ============================================================================
// FINAL SUMMARY
// ============================================================================

console.log("\n" + "=".repeat(80));
console.log("TEST SUMMARY");
console.log("=".repeat(80));

console.log(`Total tests : ${passed + failed}`);
console.log(`Passed      : ${passed}`);
console.log(`Failed      : ${failed}`);

if (failed === 0) {
  console.log("\n✅ NUMBER CONVERSION TEST PASSED");
} else {
  console.log("\n❌ NUMBER CONVERSION TEST FAILED");
  process.exitCode = 1;
}