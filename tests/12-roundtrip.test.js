import {
  devanagariToLimbu,
  limbuToDevanagari,
} from "../src/index.js";

function unicodeSequence(text) {
  return [...text]
    .map((char) => `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`)
    .join(" ");
}

function testRoundTrip(name, input, expected) {
  const limbu = devanagariToLimbu(input);
  const output = limbuToDevanagari(limbu);

  const passed = output === expected;

  console.log(
    `${passed ? "✅" : "❌"} ${name}`
  );

  console.log(`   Input    : ${input}`);
  console.log(`   Limbu    : ${limbu}`);
  console.log(`   Expected : ${expected}`);
  console.log(`   Actual   : ${output}`);
  console.log(`   Input Unicode    : ${unicodeSequence(input)}`);
  console.log(`   Limbu Unicode    : ${unicodeSequence(limbu)}`);
  console.log(`   Expected Unicode : ${unicodeSequence(expected)}`);
  console.log(`   Actual Unicode   : ${unicodeSequence(output)}`);
  console.log("");

  if (!passed) {
    throw new Error(`${name} failed`);
  }
}

function testLimbuRoundTrip(name, input, expected) {
  const devanagari = limbuToDevanagari(input);
  const output = devanagariToLimbu(devanagari);

  const passed = output === expected;

  console.log(
    `${passed ? "✅" : "❌"} ${name}`
  );

  console.log(`   Input    : ${input}`);
  console.log(`   Devanagari : ${devanagari}`);
  console.log(`   Expected : ${expected}`);
  console.log(`   Actual   : ${output}`);
  console.log(`   Input Unicode      : ${unicodeSequence(input)}`);
  console.log(`   Devanagari Unicode : ${unicodeSequence(devanagari)}`);
  console.log(`   Expected Unicode   : ${unicodeSequence(expected)}`);
  console.log(`   Actual Unicode     : ${unicodeSequence(output)}`);
  console.log("");

  if (!passed) {
    throw new Error(`${name} failed`);
  }
}


// ============================================================
// 1. LOSSLESS DEVANAGARI → LIMBU → DEVANAGARI
// ============================================================

console.log("\n=== Lossless Devanagari Round Trips ===");

testRoundTrip(
  "क",
  "क",
  "क"
);

testRoundTrip(
  "का",
  "का",
  "का"
);

testRoundTrip(
  "कि",
  "कि",
  "कि"
);

testRoundTrip(
  "की",
  "की",
  "की"
);

testRoundTrip(
  "कु",
  "कु",
  "कु"
);

testRoundTrip(
  "कू",
  "कू",
  "कू"
);

testRoundTrip(
  "कं",
  "कं",
  "कं"
);

testRoundTrip(
  "प्य",
  "प्य",
  "प्य"
);

testRoundTrip(
  "प्र",
  "प्र",
  "प्र"
);

testRoundTrip(
  "प्व",
  "प्व",
  "प्व"
);

testRoundTrip(
  "प्रो",
  "प्रो",
  "प्रो"
);


// ============================================================
// 2. FINAL-CONSONANT / SA-I ROUND TRIPS
// ============================================================

console.log("\n=== Sa-I / Final-Consonant Round Trips ===");

testRoundTrip(
  "स्",
  "स्",
  "स्"
);

testRoundTrip(
  "ष्",
  "ष्",
  "ष्"
);

testRoundTrip(
  "श्",
  "श्",
  "श्"
);

testRoundTrip(
  "ह्",
  "ह्",
  "ह्"
);

testRoundTrip(
  "य्",
  "य्",
  "य्"
);

testRoundTrip(
  "व्",
  "व्",
  "व्"
);




// ============================================================
// 3. WORD-LEVEL ROUND TRIPS
// ============================================================

console.log("\n=== Word-Level Round Trips ===");

testRoundTrip(
  "नमस्ते",
  "नमस्ते",
  "नमस्ते"
);

testRoundTrip(
  "नेपाल",
  "नेपाल",
  "नेपाल"
);

testRoundTrip(
  "कुमार",
  "कुमार",
  "कुमार"
);

testRoundTrip(
  "प्रकाश",
  "प्रकाश",
  "प्रकाश"
);

testRoundTrip(
  "प्यारा",
  "प्यारा",
  "प्यारा"
);


// ============================================================
// 4. LIMBU → DEVANAGARI → LIMBU
// ============================================================

console.log("\n=== Limbu Round Trips ===");

testLimbuRoundTrip(
  "ᤁ",
  "ᤁ",
  "ᤁ"
);

testLimbuRoundTrip(
  "ᤁᤠ",
  "ᤁᤠ",
  "ᤁᤠ"
);

testLimbuRoundTrip(
  "ᤐᤩ",
  "ᤐᤩ",
  "ᤐᤩ"
);

testLimbuRoundTrip(
  "ᤐᤪ",
  "ᤐᤪ",
  "ᤐᤪ"
);

testLimbuRoundTrip(
  "ᤐᤫ",
  "ᤐᤫ",
  "ᤐᤫ"
);

testLimbuRoundTrip(
  "ᤛ᤻",
  "ᤛ᤻",
  "ᤛ᤻"
);

testLimbuRoundTrip(
  "ᤚ᤻",
  "ᤚ᤻",
  "ᤚ᤻"
);

testLimbuRoundTrip(
  "ᤙ᤻",
  "ᤙ᤻",
  "ᤙ᤻"
);


// ============================================================
// 5. SPECIAL SIGNS
// ============================================================

console.log("\n=== Special Sign Round Trips ===");

// Sa-i
testLimbuRoundTrip(
  "᤻",
  "᤻",
  "᤻"
);

// Loo is intentionally normalized to the special semantic form.
testLimbuRoundTrip(
  "᥀",
  "᥀",
  "᥀"
);


// ============================================================
// 6. PUNCTUATION
// ============================================================

console.log("\n=== Punctuation Round Trips ===");

testRoundTrip(
  "।",
  "।",
  "।"
);

testRoundTrip(
  "॥",
  "॥",
  "॥"
);

testRoundTrip(
  "!",
  "!",
  "!"
);

testRoundTrip(
  "?",
  "?",
  "?"
);

testRoundTrip(
  "नमस्ते।",
  "नमस्ते।",
  "नमस्ते।"
);

testRoundTrip(
  "नमस्ते!",
  "नमस्ते!",
  "नमस्ते!"
);


// ============================================================
// 7. MIXED TEXT
// ============================================================

console.log("\n=== Mixed Text Round Trips ===");

testRoundTrip(
  "नमस्ते, नेपाल!",
  "नमस्ते, नेपाल!",
  "नमस्ते, नेपाल!"
);

testRoundTrip(
  "प्रकाश।",
  "प्रकाश।",
  "प्रकाश।"
);

testRoundTrip(
  "कुमार!",
  "कुमार!",
  "कुमार!"
);


// ============================================================
// 8. NORMALIZATION CASES
// ============================================================

console.log("\n=== Normalization Cases ===");

// Devanagari chandrabindu and anusvara currently normalize
// to the Limbu nasalization sign and therefore return as anusvara.
testRoundTrip(
  "कँ",
  "कँ",
  "कं"
);

// Limbu Sa-i and Mukphreng can normalize to the same
// Devanagari halanta representation in reverse conversion.
testLimbuRoundTrip(
  "᤻",
  "᤻",
  "᤻"
);

testLimbuRoundTrip(
  "᤹",
  "᤹",
  "᤹"
);

testRoundTrip(
  "काँ → कां normalization",
  "काँ",
  "कां"
);

console.log("=== 12-roundtrip.test.js PASSED ===\n");