import { devanagariToLimbu, limbuToDevanagari } from "../src/index.js";

let passed = 0;
let failed = 0;

function unicodeSequence(text) {
  return [...text]
    .map(
      (char) =>
        `U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`,
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
// DENTAL / RETROFLEX FALLBACKS
// ============================================================

section("Dental / Retroflex Fallbacks");

// त / ट
test("त → ᤋ", devanagariToLimbu("त"), "ᤋ");

test("ट → ᤋ", devanagariToLimbu("ट"), "ᤋ");

// थ / ठ
test("थ → ᤌ", devanagariToLimbu("थ"), "ᤌ");

test("ठ → ᤌ", devanagariToLimbu("ठ"), "ᤌ");

// द / ड
test("द → ᤍ", devanagariToLimbu("द"), "ᤍ");

test("ड → ᤍ", devanagariToLimbu("ड"), "ᤍ");

// ध / ढ
test("ध → ᤎ", devanagariToLimbu("ध"), "ᤎ");

test("ढ → ᤎ", devanagariToLimbu("ढ"), "ᤎ");

// न / ण
test("न → ᤏ", devanagariToLimbu("न"), "ᤏ");

test("ण → ᤏ", devanagariToLimbu("ण"), "ᤏ");

// ============================================================
// REVERSE FALLBACKS
// ============================================================

section("Reverse Fallbacks");

test("ᤋ → त", limbuToDevanagari("ᤋ"), "त");

test("ᤌ → थ", limbuToDevanagari("ᤌ"), "थ");

test("ᤍ → द", limbuToDevanagari("ᤍ"), "द");

test("ᤎ → ध", limbuToDevanagari("ᤎ"), "ध");

test("ᤏ → न", limbuToDevanagari("ᤏ"), "न");

// ============================================================
// NORMALIZATION BEHAVIOR
// ============================================================

section("Fallback Normalization");

test(
  "ट normalizes through ᤋ to त",
  limbuToDevanagari(devanagariToLimbu("ट")),
  "त",
);

test(
  "ठ normalizes through ᤌ to थ",
  limbuToDevanagari(devanagariToLimbu("ठ")),
  "थ",
);

test(
  "ड normalizes through ᤍ to द",
  limbuToDevanagari(devanagariToLimbu("ड")),
  "द",
);

test(
  "ढ normalizes through ᤎ to ध",
  limbuToDevanagari(devanagariToLimbu("ढ")),
  "ध",
);

test(
  "ण normalizes through ᤏ to न",
  limbuToDevanagari(devanagariToLimbu("ण")),
  "न",
);

// ============================================================
// WORD-LEVEL FALLBACKS
// ============================================================

section("Fallbacks Inside Words");

test("टमाटर → ᤋᤔᤠᤋᤖ", devanagariToLimbu("टमाटर"), "ᤋᤔᤠᤋᤖ");

test("डमरु → ᤍᤔᤖᤢ", devanagariToLimbu("डमरु"), "ᤍᤔᤖᤢ");

test("ठूलो → ᤌᤢ᤺ᤗᤥ", devanagariToLimbu("ठूलो"), "ᤌᤢ᤺ᤗᤥ");

test("ढोका → ᤎᤥᤁᤠ", devanagariToLimbu("ढोका"), "ᤎᤥᤁᤠ");

test("ण → ᤏ", devanagariToLimbu("ण"), "ᤏ");

// ============================================================
// VOWEL COMBINATIONS
// ============================================================

section("Fallbacks With Vowels");

test("टा → ᤋᤠ", devanagariToLimbu("टा"), "ᤋᤠ");

test("ठि→ ᤌᤡ", devanagariToLimbu("ठि"), "ᤌᤡ");

test("ठी → ᤌᤡ", devanagariToLimbu("ठी"), "ᤌᤡ᤺");

test("डु → ᤍᤢ", devanagariToLimbu("डु"), "ᤍᤢ");

test("ढे → ᤎᤣ", devanagariToLimbu("ढे"), "ᤎᤣ");

test("णो → ᤏᤥ", devanagariToLimbu("णो"), "ᤏᤥ");

// ============================================================
// HALANTA / SMALL-LETTER FALLBACKS
// ============================================================

section("Fallbacks With Halanta");

// त् / ट्
test("त् → ᤳ", devanagariToLimbu("त्"), "ᤳ");

test("ट् falls back to त् → ᤳ", devanagariToLimbu("ट्"), "ᤳ");

// न् / ण्
test("न् → ᤴ", devanagariToLimbu("न्"), "ᤴ");

test("ण् falls back to न् → ᤴ", devanagariToLimbu("ण्"), "ᤴ");

// ============================================================
// UNICODE INTEGRITY
// ============================================================

section("Unicode Integrity");

test("ᤋ is U+190B", unicodeSequence("ᤋ"), "U+190B");

test("ᤌ is U+190C", unicodeSequence("ᤌ"), "U+190C");

test("ᤍ is U+190D", unicodeSequence("ᤍ"), "U+190D");

test("ᤎ is U+190E", unicodeSequence("ᤎ"), "U+190E");

test("ᤏ is U+190F", unicodeSequence("ᤏ"), "U+190F");

section("Sa-I Fallback for Missing Small Letters");

test("स् → ᤛ᤻", devanagariToLimbu("स्"), "ᤛ᤻");

test("ष् → ᤚ᤻", devanagariToLimbu("ष्"), "ᤚ᤻");

test("श् → ᤙ᤻", devanagariToLimbu("श्"), "ᤙ᤻");

test("ᤛ᤻ → स्", limbuToDevanagari("ᤛ᤻"), "स्");

test("ᤚ᤻ → ष्", limbuToDevanagari("ᤚ᤻"), "ष्");

test("ᤙ᤻ → श्", limbuToDevanagari("ᤙ᤻"), "श्");
// ============================================================
// RESULTS
// ============================================================

console.log("");
console.log(`Passed: ${passed} Failed: ${failed} Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
}
