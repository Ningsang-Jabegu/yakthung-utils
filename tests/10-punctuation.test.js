import {
  devanagariToLimbu,
  limbuToDevanagari
} from "../src/index.js";

let passed = 0;
let failed = 0;

function unicodeSequence(text) {
  return [...text]
    .map(
      char =>
        `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
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
// 1. DEVANAGARI DANDA
// ============================================================

section("Devanagari Danda");

test(
  "। → ।",
  devanagariToLimbu("।"),
  "।"
);

test(
  "॥ → ॥",
  limbuToDevanagari("॥"),
  "॥"
);

// ============================================================
// 2. EXCLAMATION MARK
// ============================================================

section("Exclamation Mark");

test(
  "! → ᥄",
  devanagariToLimbu("!"),
  "᥄"
);

test(
  "᥄ → !",
  limbuToDevanagari("᥄"),
  "!"
);

// ============================================================
// 3. QUESTION MARK
// ============================================================

section("Question Mark");

test(
  "? → ᥅",
  devanagariToLimbu("?"),
  "᥅"
);

test(
  "᥅ → ?",
  limbuToDevanagari("᥅"),
  "?"
);

// ============================================================
// 4. MUKPHRENG / HALANTA
// ============================================================

section("Mukphreng / Halanta");

test(
  "् → ᤻",
  devanagariToLimbu("्"),
  "᤻"
);

test(
  "᤻ → ्",
  limbuToDevanagari("᤻"),
  "्"
);

// ============================================================
// 5. KEMPHRENG / VISARGA
// ============================================================

section("Kemphreng / Visarga");

test(
  "ः → ᤺",
  devanagariToLimbu("ः"),
  "᤺"
);

test(
  "᤺ alone → empty",
  limbuToDevanagari("᤺"),
  ""
);

// ============================================================
// 6. OTHER LIMBU SIGNS
// ============================================================

section("Other Limbu Signs");

test(
  "᤻ → ᤻",
  devanagariToLimbu("᤻"),
  "᤻"
);

test(
  "᤻ → ्",
  limbuToDevanagari("᤻"),
  "्"
);

test(
  "् → ᤻",
  devanagariToLimbu("्"),
  "᤻"
);

test("᥀ → लो! (punctuation mark)", limbuToDevanagari("᥀"), "लो! (punctuation mark)");

test("लो → ᤗᤥ", devanagariToLimbu("लो"), "ᤗᤥ");

test("लो! → ᥀", devanagariToLimbu("लो!"), "᥀");

// ============================================================
// 7. PUNCTUATION INSIDE TEXT
// ============================================================

section("Punctuation Inside Text");

test(
  "नमस्ते। → ᤏᤔᤛ᤻ᤋᤣ।",
  devanagariToLimbu("नमस्ते।"),
  "ᤏᤔᤛ᤻ᤋᤣ।"
);
test(
  "नमस्ते॥ → ᤏᤔᤛ᤻ᤋᤣ॥",
  devanagariToLimbu("नमस्ते॥"),
  "ᤏᤔᤛ᤻ᤋᤣ॥"
);

test(
  "नमस्ते! → ᤏᤔᤛ᤻ᤋᤣ᥄",
  devanagariToLimbu("नमस्ते!"),
  "ᤏᤔᤛ᤻ᤋᤣ᥄"
);

test(
  "नमस्ते? → ᤏᤔᤛ᤻ᤋᤣ᥅",
  devanagariToLimbu("नमस्ते?"),
  "ᤏᤔᤛ᤻ᤋᤣ᥅"
);

// ============================================================
// 8. MULTIPLE PUNCTUATION
// ============================================================

section("Multiple Punctuation");

test(
  "।!?",
  devanagariToLimbu("।!?"),
  "।᥄᥅"
);

test(
  "॥᥄᥅ → ॥!?",
  limbuToDevanagari("॥᥄᥅"),
  "॥!?"
);

// ============================================================
// 9. PUNCTUATION PRESERVATION
// ============================================================

section("Punctuation Preservation");

test(
  "English punctuation is preserved",
  devanagariToLimbu("Hello, world!"),
  "Hello, world᥄"
);

test(
  "ASCII punctuation is preserved",
  devanagariToLimbu("Hello: world;"),
  "Hello: world;"
);

test(
  "Parentheses are preserved",
  devanagariToLimbu("(नमस्ते)"),
  "(ᤏᤔᤛ᤻ᤋᤣ)"
);

test(
  "Quotation marks are preserved",
  devanagariToLimbu('"नमस्ते"'),
  '"ᤏᤔᤛ᤻ᤋᤣ"'
);

// ============================================================
// 10. WHITESPACE PRESERVATION
// ============================================================

section("Whitespace Preservation");

test(
  "Space is preserved",
  devanagariToLimbu("नमस्ते दुनिया"),
  "ᤏᤔᤛ᤻ᤋᤣ ᤍᤢᤏᤡᤕᤠ"
);

test(
  "Multiple spaces are preserved",
  devanagariToLimbu("नमस्ते  दुनिया"),
  "ᤏᤔᤛ᤻ᤋᤣ  ᤍᤢᤏᤡᤕᤠ"
);

test(
  "Newline is preserved",
  devanagariToLimbu("नमस्ते\nदुनिया"),
  "ᤏᤔᤛ᤻ᤋᤣ\nᤍᤢᤏᤡᤕᤠ"
);

// ============================================================
// 11. MIXED PUNCTUATION AND TEXT
// ============================================================

section("Mixed Punctuation");

test(
  "Mixed punctuation",
  devanagariToLimbu("नमस्ते, दुनिया!"),
  "ᤏᤔᤛ᤻ᤋᤣ, ᤍᤢᤏᤡᤕᤠ᥄"
);

test(
  "के हो?!",
  devanagariToLimbu("के हो?!"),
  "ᤁᤣ ᤜᤥ᥅᥄"
);

// ============================================================
// 12. UNICODE INTEGRITY
// ============================================================

section("Unicode Integrity");

test(
  "॥ is U+0965",
  unicodeSequence("॥"),
  "U+0965"
);

test(
  "᥄ is U+1944",
  unicodeSequence("᥄"),
  "U+1944"
);

test(
  "᥅ is U+1945",
  unicodeSequence("᥅"),
  "U+1945"
);

test(
  "᤹ is U+1939",
  unicodeSequence("᤹"),
  "U+1939"
);

test(
  "᤺ is U+193A",
  unicodeSequence("᤺"),
  "U+193A"
);

test(
  "᤻ is U+193B",
  unicodeSequence("᤻"),
  "U+193B"
);

test(
  "᥀ is U+1940",
  unicodeSequence("᥀"),
  "U+1940"
);

// ============================================================
// RESULTS
// ============================================================

console.log("");
console.log(`Passed: ${passed} Failed: ${failed} Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
}