// ============================================================
// Golden Test Fixtures
// ============================================================
// IMPORTANT:
// These expected values are manually defined.
// DO NOT generate expected values using the functions under test.
//
// Each fixture represents an explicitly verified conversion rule.
// ============================================================

export const goldenCases = {
  // ==========================================================
  // SCRIPT DETECTION
  // ==========================================================

  scriptDetection: [
    {
      name: "Limbu consonant",
      input: "ᤁ",
      expected: true,
    },
    {
      name: "Limbu vowel sign",
      input: "ᤠ",
      expected: true,
    },
    {
      name: "Limbu punctuation",
      input: "᥀",
      expected: true,
    },
    {
      name: "Devanagari",
      input: "क",
      expected: false,
    },
    {
      name: "Latin",
      input: "ka",
      expected: false,
    },
  ],

  // ==========================================================
  // NUMBERS
  // ==========================================================

  numbers: [
    {
      name: "zero",
      devanagari: "०",
      limbu: "᥆",
    },
    {
      name: "one",
      devanagari: "१",
      limbu: "᥇",
    },
    {
      name: "two",
      devanagari: "२",
      limbu: "᥈",
    },
    {
      name: "three",
      devanagari: "३",
      limbu: "᥉",
    },
    {
      name: "four",
      devanagari: "४",
      limbu: "᥊",
    },
    {
      name: "five",
      devanagari: "५",
      limbu: "᥋",
    },
    {
      name: "six",
      devanagari: "६",
      limbu: "᥌",
    },
    {
      name: "seven",
      devanagari: "७",
      limbu: "᥍",
    },
    {
      name: "eight",
      devanagari: "८",
      limbu: "᥎",
    },
    {
      name: "nine",
      devanagari: "९",
      limbu: "᥏",
    },
  ],

  // ==========================================================
  // CONSONANTS
  // ==========================================================

  consonants: [
    { devanagari: "क", limbu: "ᤁ" },
    { devanagari: "ख", limbu: "ᤂ" },
    { devanagari: "ग", limbu: "ᤃ" },
    { devanagari: "घ", limbu: "ᤄ" },
    { devanagari: "ङ", limbu: "ᤅ" },

    { devanagari: "च", limbu: "ᤆ" },
    { devanagari: "छ", limbu: "ᤇ" },
    { devanagari: "ज", limbu: "ᤈ" },
    { devanagari: "झ", limbu: "ᤉ" },
    { devanagari: "ञ", limbu: "ᤊ" },

    { devanagari: "ट", limbu: "ᤋ" },
    { devanagari: "ठ", limbu: "ᤌ" },
    { devanagari: "ड", limbu: "ᤍ" },
    { devanagari: "ढ", limbu: "ᤎ" },
    { devanagari: "ण", limbu: "ᤏ" },

    { devanagari: "त", limbu: "ᤋ" },
    { devanagari: "थ", limbu: "ᤌ" },
    { devanagari: "द", limbu: "ᤍ" },
    { devanagari: "ध", limbu: "ᤎ" },
    { devanagari: "न", limbu: "ᤏ" },

    { devanagari: "प", limbu: "ᤐ" },
    { devanagari: "फ", limbu: "ᤑ" },
    { devanagari: "ब", limbu: "ᤒ" },
    { devanagari: "भ", limbu: "ᤓ" },
    { devanagari: "म", limbu: "ᤔ" },

    { devanagari: "य", limbu: "ᤕ" },
    { devanagari: "र", limbu: "ᤖ" },
    { devanagari: "ल", limbu: "ᤗ" },
    { devanagari: "व", limbu: "ᤘ" },

    { devanagari: "श", limbu: "ᤙ" },
    { devanagari: "ष", limbu: "ᤚ" },
    { devanagari: "स", limbu: "ᤛ" },
    { devanagari: "ह", limbu: "ᤜ" },

    { devanagari: "त्र", limbu: "ᤞ" },
    { devanagari: "ज्ञ", limbu: "ᤝ" },
  ],

  // ==========================================================
  // VOWELS
  // ==========================================================

  vowels: [
    { devanagari: "ा", limbu: "ᤠ" },
    { devanagari: "ि", limbu: "ᤡ" },
    { devanagari: "ी", limbu: "ᤡ᤺" },
    { devanagari: "ु", limbu: "ᤢ" },
    { devanagari: "ू", limbu: "ᤢ᤺" },
    { devanagari: "े", limbu: "ᤣ" },
    { devanagari: "ै", limbu: "ᤤ" },
    { devanagari: "ो", limbu: "ᤥ" },
    { devanagari: "ौ", limbu: "ᤦ" },
  ],

  // ==========================================================
  // SUBJOINTS
  // ==========================================================

  subjoints: [
    {
      name: "प्य",
      devanagari: "प्य",
      limbu: "ᤐᤩ",
    },
    {
      name: "प्र",
      devanagari: "प्र",
      limbu: "ᤐᤪ",
    },
    {
      name: "प्व",
      devanagari: "प्व",
      limbu: "ᤐᤫ",
    },
    {
      name: "प्रो",
      devanagari: "प्रो",
      limbu: "ᤐᤪᤥ",
    },
    {
      name: "प्रयास",
      devanagari: "प्रयास",
      limbu: "ᤐᤪᤕᤠᤚ",
    },
    {
      name: "प्यारा",
      devanagari: "प्यारा",
      limbu: "ᤐᤩᤠᤖᤠ",
    },
  ],

  // ==========================================================
  // SMALL / FINAL LETTERS
  // ==========================================================

  smallLetters: [
    {
      name: "त्",
      devanagari: "त्",
      limbu: "ᤳ",
    },
    {
      name: "प्",
      devanagari: "प्",
      limbu: "ᤵ",
    },
    {
      name: "म्",
      devanagari: "म्",
      limbu: "ᤶ",
    },
    {
      name: "र्",
      devanagari: "र्",
      limbu: "ᤷ",
    },
    {
      name: "ल्",
      devanagari: "ल्",
      limbu: "ᤸ",
    },
  ],

  // ==========================================================
  // SA-I / FINAL CONSONANT
  // ==========================================================

  sai: [
    {
      name: "standalone halanta",
      devanagari: "्",
      limbu: "᤻",
    },
    {
      name: "स्",
      devanagari: "स्",
      limbu: "ᤛ᤻",
    },
    {
      name: "ष्",
      devanagari: "ष्",
      limbu: "ᤚ᤻",
    },
    {
      name: "श्",
      devanagari: "श्",
      limbu: "ᤙ᤻",
    },
    {
      name: "ह्",
      devanagari: "ह्",
      limbu: "ᤜ᤻",
    },
    {
      name: "य्",
      devanagari: "य्",
      limbu: "ᤕ᤻",
    },
    {
      name: "व्",
      devanagari: "व्",
      limbu: "ᤘ᤻",
    },
  ],

  // ==========================================================
  // KEMPHRENG
  // ==========================================================

  kemphreng: [
    {
      name: "का",
      devanagari: "का",
      limbu: "ᤁᤠ",
    },
    {
      name: "की",
      devanagari: "की",
      limbu: "ᤁᤡ᤺",
    },
    {
      name: "कू",
      devanagari: "कू",
      limbu: "ᤁᤢ᤺",
    },
    {
      name: "के",
      devanagari: "के",
      limbu: "ᤁᤣ",
    },
    {
      name: "कै",
      devanagari: "कै",
      limbu: "ᤁᤤ",
    },
    {
      name: "को",
      devanagari: "को",
      limbu: "ᤁᤥ",
    },
    {
      name: "कौ",
      devanagari: "कौ",
      limbu: "ᤁᤦ",
    },
    {
      name: "हा",
      devanagari: "हा",
      limbu: "ᤜᤠ",
    },
  ],

  // ==========================================================
  // Baarkhari (बारखरी) in Limbu
  // ==========================================================
  kemphreng: [
    {
      name: "क",
      devanagari: "क",
      limbu: "ᤁ",
    },
    {
      name: "का",
      devanagari: "का",
      limbu: "ᤁᤠ",
    },
    {
      name: "कि",
      devanagari: "कि",
      limbu: "ᤁᤡ",
    },
    {
      name: "की",
      devanagari: "की",
      limbu: "ᤁᤡ᤺",
    },
    {
      name: "कु",
      devanagari: "कु",
      limbu: "ᤁᤢ",
    },
    {
      name: "कू",
      devanagari: "कू",
      limbu: "ᤁᤢ᤺",
    },
    {
      name: "के",
      devanagari: "के",
      limbu: "ᤁᤣ",
    },
    {
      name: "कै",
      devanagari: "कै",
      limbu: "ᤁᤤ",
    },
    {
      name: "को",
      devanagari: "को",
      limbu: "ᤁᤥ",
    },
    {
      name: "कौ",
      devanagari: "कौ",
      limbu: "ᤁᤦ",
    },
    {
      name: "क‍ं",
      devanagari: "क‍ं",
      limbu: "ᤁᤱ",
    },
    {
      name: "केः",
      devanagari: "केः",
      limbu: "ᤁᤧ",
    },
  ],

  // ==========================================================
  // NASALIZATION
  // ==========================================================

  nasalization: [
    {
      name: "siribindu",
      devanagari: "ं",
      limbu: "ᤱ",
    },
    {
      name: "chandrabindu",
      devanagari: "ँ",
      limbu: "ᤱ",
    },
    {
      name: "कं",
      devanagari: "कं",
      limbu: "ᤁᤱ",
    },
    {
      name: "कँ",
      devanagari: "कँ",
      limbu: "ᤁᤱ",
    },
    {
      name: "कां",
      devanagari: "कां",
      limbu: "ᤁᤠᤱ",
    },
    {
      name: "किं",
      devanagari: "किं",
      limbu: "ᤁᤡᤱ",
    },
    {
      name: "कुं",
      devanagari: "कुं",
      limbu: "ᤁᤢᤱ",
    },
    {
      name: "कों",
      devanagari: "कों",
      limbu: "ᤁᤥᤱ",
    },
  ],

  // ==========================================================
  // PUNCTUATION
  // ==========================================================

  punctuation: [
    {
      name: "Danda",
      devanagari: "।",
      limbu: "।",
    },
    {
      name: "Double danda",
      devanagari: "॥",
      limbu: "॥",
    },
    {
      name: "Limbu Loo",
      devanagari: "लो! (punctuation mark)",
      limbu: "᥀",
    },
    {
      name: "Loo plain spelling",
      devanagari: "लो",
      limbu: "ᤗᤥ",
    },
    {
      name: "Loo exclamation spelling",
      devanagari: "लो!",
      limbu: "᥀",
    },
  ],

  // ==========================================================
  // SPECIAL UNICODE CHARACTERS
  // ==========================================================

  specialUnicode: [
    {
      name: "Mukphreng",
      character: "᤹",
      codePoint: "U+1939",
    },
    {
      name: "Kemphreng",
      character: "᤺",
      codePoint: "U+193A",
    },
    {
      name: "Sa-i",
      character: "᤻",
      codePoint: "U+193B",
    },
    {
      name: "Limbu Sign Loo",
      character: "᥀",
      codePoint: "U+1940",
    },
  ],

  // ==========================================================
  // WORD-LEVEL GOLDEN CASES
  // ==========================================================

  words: [
    {
      name: "नमस्ते",
      devanagari: "नमस्ते",
      limbu: "ᤏᤔᤛ᤻ᤋᤣ",
    },
    {
      name: "नेस्सै",
      devanagari: "नेस्सै",
      limbu: "ᤏᤧᤛ᤻ᤛᤧ",
    },
    {
      name: "प्रयास",
      devanagari: "प्रयास",
      limbu: "ᤐᤪᤕᤠᤚ",
    },
    {
      name: "प्यारा",
      devanagari: "प्यारा",
      limbu: "ᤐᤩᤠᤖᤠ",
    },
  ],

  // ==========================================================
  // NORMALIZATION / LOSSY CASES
  // ==========================================================

  normalized: [
    {
      name: "chandrabindu normalizes to Limbu nasalization",
      devanagari: "काँ",
      limbu: "ᤁᤠ᤺ᤱ",
      normalizedDevanagari: "कां",
    },
    {
      name: "anusvara",
      devanagari: "कां",
      limbu: "ᤁᤠᤱ",
      normalizedDevanagari: "कां",
    },
  ],

  // ==========================================================
  // FALLBACK / UNKNOWN CHARACTER CASES
  // ==========================================================

  fallbacks: [
    {
      name: "Latin text preserved",
      input: "hello",
      expected: "hello",
    },
    {
      name: "ASCII number preserved",
      input: "123",
      expected: "123",
    },
    {
      name: "unknown punctuation preserved",
      input: "@#$",
      expected: "@#$",
    },
  ],
};

export default goldenCases;
